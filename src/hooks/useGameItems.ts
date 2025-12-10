import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './use-toast';

export interface GameItem {
  id: string;
  game_id: string;
  name: string;
  value: number;
  demand: number;
  rarity: string;
  trend: string;
  category: string;
  image_url: string | null;
  last_change: number | null;
  created_at: string;
  updated_at: string;
}

export interface ValueHistory {
  id: string;
  item_id: string;
  value: number;
  recorded_at: string;
  changed_by: string | null;
}

export const useGameItems = (gameId?: string) => {
  const [items, setItems] = useState<GameItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchItems = async () => {
    let query = supabase.from('game_items').select('*');
    
    if (gameId) {
      query = query.eq('game_id', gameId);
    }

    const { data, error } = await query.order('value', { ascending: false });

    if (error) {
      console.error('Error fetching items:', error);
      toast({
        title: 'Error',
        description: 'Failed to load items',
        variant: 'destructive',
      });
    } else {
      setItems((data as GameItem[]) || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();

    // Subscribe to realtime updates
    const channel = supabase
      .channel('game_items_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'game_items',
        },
        () => {
          fetchItems();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [gameId]);

  const updateItem = async (itemId: string, updates: Partial<GameItem>) => {
    const { error } = await supabase
      .from('game_items')
      .update(updates as any)
      .eq('id', itemId);

    if (error) {
      console.error('Error updating item:', error);
      toast({
        title: 'Error',
        description: 'Failed to update item',
        variant: 'destructive',
      });
      return false;
    }

    toast({
      title: 'Success',
      description: 'Item updated successfully',
    });
    return true;
  };

  const getValueHistory = async (itemId: string): Promise<ValueHistory[]> => {
    const { data, error } = await supabase
      .from('item_value_history')
      .select('*')
      .eq('item_id', itemId)
      .order('recorded_at', { ascending: true });

    if (error) {
      console.error('Error fetching value history:', error);
      return [];
    }

    return (data as ValueHistory[]) || [];
  };

  return { items, loading, updateItem, getValueHistory, refetch: fetchItems };
};
