import { useState, useEffect, useCallback } from 'react';
import { GameItem, games } from '@/data/gameData';

export interface InventoryItem {
  itemId: string;
  gameId: string;
  quantity: number;
  addedAt: string;
}

const STORAGE_KEY = 'roblox_values_inventory';

export const useInventory = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);

  // Load inventory from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setInventory(JSON.parse(stored));
      } catch {
        setInventory([]);
      }
    }
  }, []);

  // Save inventory to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(inventory));
  }, [inventory]);

  const addItem = useCallback((itemId: string, gameId: string, quantity: number = 1) => {
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
  }, []);

  const removeItem = useCallback((itemId: string, gameId: string, quantity: number = 1) => {
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
  }, []);

  const clearInventory = useCallback(() => {
    setInventory([]);
  }, []);

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
