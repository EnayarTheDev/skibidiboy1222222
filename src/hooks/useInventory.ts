import { useState, useEffect, useCallback } from 'react';
import { GameItem, games } from '@/data/gameData';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export interface InventoryItem {
  itemId: string;
  gameId: string;
  quantity: number;
  addedAt: string;
}

const STORAGE_KEY = 'roblox_values_inventory';

export const useInventory = () => {
  const { user } = useAuth();
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch inventory from database when user is logged in
  const fetchInventory = useCallback(async () => {
    if (!user) {
      // Fall back to localStorage for non-authenticated users
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          setInventory(JSON.parse(stored));
        } catch {
          setInventory([]);
        }
      }
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('user_inventory')
        .select('*')
        .eq('user_id', user.id) as any;

      if (error) throw error;

      const items: InventoryItem[] = (data || []).map((item: any) => ({
        itemId: item.item_id,
        gameId: item.game_id,
        quantity: item.quantity,
        addedAt: item.created_at,
      }));

      setInventory(items);
    } catch (error) {
      console.error('Error fetching inventory:', error);
      toast({
        title: "Error",
        description: "Failed to load inventory",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Initial fetch
  useEffect(() => {
    fetchInventory();
  }, [fetchInventory]);

  // Save to localStorage for non-authenticated users
  useEffect(() => {
    if (!user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(inventory));
    }
  }, [inventory, user]);

  // Set up real-time subscription for inventory changes
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel('user-inventory-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_inventory',
          filter: `user_id=eq.${user.id}`,
        },
        () => {
          fetchInventory();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, fetchInventory]);

  const addItem = useCallback(async (itemId: string, gameId: string, quantity: number = 1) => {
    if (!user) {
      // Local storage fallback
      setInventory(prev => {
        const existing = prev.find(i => i.itemId === itemId && i.gameId === gameId);
        if (existing) {
          return prev.map(i => 
            i.itemId === itemId && i.gameId === gameId 
              ? { ...i, quantity: i.quantity + quantity }
              : i
          );
        }
        return [...prev, { itemId, gameId, quantity, addedAt: new Date().toISOString() }];
      });
      return;
    }

    try {
      // Check if item already exists
      const { data: existing } = await supabase
        .from('user_inventory')
        .select('*')
        .eq('user_id', user.id)
        .eq('item_id', itemId)
        .eq('game_id', gameId)
        .maybeSingle() as any;

      if (existing) {
        await supabase
          .from('user_inventory')
          .update({ quantity: existing.quantity + quantity })
          .eq('id', existing.id) as any;
      } else {
        await supabase
          .from('user_inventory')
          .insert({
            user_id: user.id,
            item_id: itemId,
            game_id: gameId,
            quantity,
          }) as any;
      }
    } catch (error) {
      console.error('Error adding item:', error);
      toast({
        title: "Error",
        description: "Failed to add item to inventory",
        variant: "destructive",
      });
    }
  }, [user]);

  const removeItem = useCallback(async (itemId: string, gameId: string, quantity: number = 1) => {
    if (!user) {
      // Local storage fallback
      setInventory(prev => {
        const existing = prev.find(i => i.itemId === itemId && i.gameId === gameId);
        if (!existing) return prev;
        
        if (existing.quantity <= quantity) {
          return prev.filter(i => !(i.itemId === itemId && i.gameId === gameId));
        }
        
        return prev.map(i => 
          i.itemId === itemId && i.gameId === gameId 
            ? { ...i, quantity: i.quantity - quantity }
            : i
        );
      });
      return;
    }

    try {
      const { data: existing } = await supabase
        .from('user_inventory')
        .select('*')
        .eq('user_id', user.id)
        .eq('item_id', itemId)
        .eq('game_id', gameId)
        .maybeSingle() as any;

      if (!existing) return;

      if (existing.quantity <= quantity) {
        await supabase
          .from('user_inventory')
          .delete()
          .eq('id', existing.id) as any;
      } else {
        await supabase
          .from('user_inventory')
          .update({ quantity: existing.quantity - quantity })
          .eq('id', existing.id) as any;
      }
    } catch (error) {
      console.error('Error removing item:', error);
      toast({
        title: "Error",
        description: "Failed to remove item from inventory",
        variant: "destructive",
      });
    }
  }, [user]);

  const clearInventory = useCallback(async () => {
    if (!user) {
      setInventory([]);
      return;
    }

    try {
      await supabase
        .from('user_inventory')
        .delete()
        .eq('user_id', user.id) as any;
      
      setInventory([]);
    } catch (error) {
      console.error('Error clearing inventory:', error);
      toast({
        title: "Error",
        description: "Failed to clear inventory",
        variant: "destructive",
      });
    }
  }, [user]);

  const getItemDetails = useCallback((invItem: InventoryItem): (GameItem & { gameName: string }) | null => {
    const game = games.find(g => g.id === invItem.gameId);
    if (!game) return null;
    const item = game.items.find(i => i.id === invItem.itemId);
    if (!item) return null;
    return { ...item, gameName: game.name };
  }, []);

  const getTotalValue = useCallback((): number => {
    return inventory.reduce((total, invItem) => {
      const details = getItemDetails(invItem);
      if (!details) return total;
      return total + (details.value * invItem.quantity);
    }, 0);
  }, [inventory, getItemDetails]);

  const getItemCount = useCallback((): number => {
    return inventory.reduce((total, item) => total + item.quantity, 0);
  }, [inventory]);

  const isInInventory = useCallback((itemId: string, gameId: string): boolean => {
    return inventory.some(i => i.itemId === itemId && i.gameId === gameId);
  }, [inventory]);

  const getQuantity = useCallback((itemId: string, gameId: string): number => {
    const item = inventory.find(i => i.itemId === itemId && i.gameId === gameId);
    return item?.quantity || 0;
  }, [inventory]);

  return {
    inventory,
    loading,
    addItem,
    removeItem,
    clearInventory,
    getItemDetails,
    getTotalValue,
    getItemCount,
    isInInventory,
    getQuantity,
  };
};
