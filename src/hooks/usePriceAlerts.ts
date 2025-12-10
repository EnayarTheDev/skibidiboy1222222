import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

export interface PriceAlert {
  id: string;
  item_id: string;
  game_id: string;
  item_name: string;
  target_value: number;
  condition: 'above' | 'below';
  is_active: boolean;
  triggered_at: string | null;
  created_at: string;
}

export const usePriceAlerts = () => {
  const { user } = useAuth();
  const [alerts, setAlerts] = useState<PriceAlert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchAlerts();
    } else {
      setAlerts([]);
      setLoading(false);
    }
  }, [user]);

  const fetchAlerts = async () => {
    if (!user) return;
    
    setLoading(true);
    const { data, error } = await (supabase
      .from('price_alerts' as any)
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false }) as any);

    if (error) {
      console.error('Error fetching alerts:', error);
      toast({ title: 'Error', description: 'Failed to load alerts', variant: 'destructive' });
    } else {
      setAlerts((data || []) as PriceAlert[]);
    }
    setLoading(false);
  };

  const createAlert = async (
    itemId: string,
    gameId: string,
    itemName: string,
    targetValue: number,
    condition: 'above' | 'below'
  ) => {
    if (!user) {
      toast({ title: 'Error', description: 'Please log in to create alerts', variant: 'destructive' });
      return false;
    }

    const { error } = await (supabase.from('price_alerts' as any).insert({
      user_id: user.id,
      item_id: itemId,
      game_id: gameId,
      item_name: itemName,
      target_value: targetValue,
      condition
    }) as any);

    if (error) {
      console.error('Error creating alert:', error);
      toast({ title: 'Error', description: 'Failed to create alert', variant: 'destructive' });
      return false;
    }

    toast({ title: 'Alert Created', description: `You'll be notified when ${itemName} goes ${condition} ${targetValue}` });
    fetchAlerts();
    return true;
  };

  const deleteAlert = async (alertId: string) => {
    const { error } = await (supabase
      .from('price_alerts' as any)
      .delete()
      .eq('id', alertId) as any);

    if (error) {
      console.error('Error deleting alert:', error);
      toast({ title: 'Error', description: 'Failed to delete alert', variant: 'destructive' });
      return false;
    }

    setAlerts(alerts.filter(a => a.id !== alertId));
    toast({ title: 'Alert Deleted' });
    return true;
  };

  const toggleAlert = async (alertId: string, isActive: boolean) => {
    const { error } = await (supabase
      .from('price_alerts' as any)
      .update({ is_active: isActive })
      .eq('id', alertId) as any);

    if (error) {
      console.error('Error updating alert:', error);
      return false;
    }

    setAlerts(alerts.map(a => a.id === alertId ? { ...a, is_active: isActive } : a));
    return true;
  };

  return { alerts, loading, createAlert, deleteAlert, toggleAlert, refetch: fetchAlerts };
};
