import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { games, formatValue } from '@/data/gameData';

export const usePriceAlertNotifications = () => {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    // Check for triggered alerts on load and periodically
    const checkAlerts = async () => {
      try {
        const { data: alerts } = await supabase
          .from('price_alerts')
          .select('*')
          .eq('user_id', user.id)
          .eq('is_active', true) as any;

        if (!alerts) return;

        for (const alert of alerts) {
          // Find the current item value
          const game = games.find(g => g.id === alert.game_id);
          if (!game) continue;

          const item = game.items.find(i => i.id === alert.item_id);
          if (!item) continue;

          const shouldTrigger = alert.condition === 'above' 
            ? item.value >= alert.target_value
            : item.value <= alert.target_value;

          if (shouldTrigger && !alert.triggered_at) {
            // Mark as triggered
            await supabase
              .from('price_alerts')
              .update({ triggered_at: new Date().toISOString() })
              .eq('id', alert.id) as any;

            // Show notification
            toast({
              title: "🔔 Price Alert Triggered!",
              description: `${alert.item_name} is now ${alert.condition === 'above' ? 'above' : 'below'} ${formatValue(alert.target_value)} (Current: ${formatValue(item.value)})`,
            });
          }
        }
      } catch (error) {
        console.error('Error checking price alerts:', error);
      }
    };

    // Check immediately
    checkAlerts();

    // Check every 30 seconds
    const interval = setInterval(checkAlerts, 30000);

    // Subscribe to real-time changes on price_alerts table
    const channel = supabase
      .channel('price-alerts-notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'price_alerts',
          filter: `user_id=eq.${user.id}`,
        },
        (payload: any) => {
          toast({
            title: "Price Alert Created",
            description: `Alert set for ${payload.new.item_name}`,
          });
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'price_alerts',
          filter: `user_id=eq.${user.id}`,
        },
        (payload: any) => {
          if (payload.new.triggered_at && !payload.old?.triggered_at) {
            // This alert was just triggered
            toast({
              title: "🔔 Price Alert Triggered!",
              description: `${payload.new.item_name} reached your target of ${formatValue(payload.new.target_value)}`,
            });
          }
        }
      )
      .subscribe();

    return () => {
      clearInterval(interval);
      supabase.removeChannel(channel);
    };
  }, [user]);
};
