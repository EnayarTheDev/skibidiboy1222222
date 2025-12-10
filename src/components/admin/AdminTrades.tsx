import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Loader2, Trash2, ArrowRightLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

interface Trade {
  id: string;
  user_id: string;
  game_id: string;
  your_items: any;
  their_items: any;
  created_at: string;
  votes?: { win: number; fair: number; loss: number };
}

const AdminTrades = () => {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchTrades = async () => {
    const { data: tradeData, error } = await supabase
      .from('wfl_trades')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching trades:', error);
      setLoading(false);
      return;
    }

    // Fetch votes for each trade
    const tradesWithVotes = await Promise.all(
      (tradeData || []).map(async (trade) => {
        const { data: votes } = await supabase
          .from('wfl_votes')
          .select('vote')
          .eq('trade_id', trade.id);

        const voteCounts = {
          win: votes?.filter(v => v.vote === 'win').length || 0,
          fair: votes?.filter(v => v.vote === 'fair').length || 0,
          loss: votes?.filter(v => v.vote === 'loss').length || 0,
        };

        return { ...trade, votes: voteCounts };
      })
    );

    setTrades(tradesWithVotes);
    setLoading(false);
  };

  useEffect(() => {
    fetchTrades();
  }, []);

  const handleDelete = async (tradeId: string) => {
    const { error } = await supabase
      .from('wfl_trades')
      .delete()
      .eq('id', tradeId);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete trade',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Success',
      description: 'Trade deleted successfully',
    });

    fetchTrades();
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
          <ArrowRightLeft className="h-5 w-5" />
          W/F/L Trades ({trades.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Game</TableHead>
                <TableHead>Your Items</TableHead>
                <TableHead>Their Items</TableHead>
                <TableHead>Votes</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trades.map(trade => (
                <TableRow key={trade.id}>
                  <TableCell className="capitalize font-medium">
                    {trade.game_id}
                  </TableCell>
                  <TableCell className="max-w-[150px] truncate">
                    {Array.isArray(trade.your_items) 
                      ? trade.your_items.map((i: any) => i.name).join(', ')
                      : 'N/A'}
                  </TableCell>
                  <TableCell className="max-w-[150px] truncate">
                    {Array.isArray(trade.their_items)
                      ? trade.their_items.map((i: any) => i.name).join(', ')
                      : 'N/A'}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2 text-sm">
                      <span className="text-green-500">W:{trade.votes?.win || 0}</span>
                      <span className="text-yellow-500">F:{trade.votes?.fair || 0}</span>
                      <span className="text-red-500">L:{trade.votes?.loss || 0}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {format(new Date(trade.created_at), 'MMM d, yyyy')}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(trade.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {trades.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No trades found
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminTrades;
