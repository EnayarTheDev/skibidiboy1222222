import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, Trash2, Bell } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { formatValue } from '@/data/gameData';

interface Alert {
  id: string;
  user_id: string;
  game_id: string;
  item_id: string;
  item_name: string;
  condition: string;
  target_value: number;
  is_active: boolean;
  triggered_at: string | null;
  created_at: string;
}

const AdminAlerts = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchAlerts = async () => {
    const { data, error } = await supabase
      .from('price_alerts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching alerts:', error);
    } else {
      setAlerts((data as Alert[]) || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  const handleDelete = async (alertId: string) => {
    const { error } = await supabase
      .from('price_alerts')
      .delete()
      .eq('id', alertId);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete alert',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Success',
      description: 'Alert deleted successfully',
    });

    fetchAlerts();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Price Alerts ({alerts.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Game</TableHead>
                <TableHead>Condition</TableHead>
                <TableHead>Target Value</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {alerts.map(alert => (
                <TableRow key={alert.id}>
                  <TableCell className="font-medium">
                    {alert.item_name}
                  </TableCell>
                  <TableCell className="capitalize">
                    {alert.game_id}
                  </TableCell>
                  <TableCell>
                    {alert.condition === 'above' ? '≥' : '≤'}
                  </TableCell>
                  <TableCell>
                    {formatValue(alert.target_value)}
                  </TableCell>
                  <TableCell>
                    <Badge variant={alert.is_active ? 'default' : 'secondary'}>
                      {alert.is_active ? 'Active' : 'Triggered'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {format(new Date(alert.created_at), 'MMM d, yyyy')}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(alert.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {alerts.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No alerts found
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminAlerts;
