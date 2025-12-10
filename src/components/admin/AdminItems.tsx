import { useState } from 'react';
import { useGameItems, GameItem } from '@/hooks/useGameItems';
import { games } from '@/data/gameData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Loader2, Pencil, TrendingUp, TrendingDown, Minus, History, Plus, Trash2 } from 'lucide-react';
import { formatValue } from '@/data/gameData';
import ItemValueHistoryChart from './ItemValueHistoryChart';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const AdminItems = () => {
  const [selectedGame, setSelectedGame] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingItem, setEditingItem] = useState<GameItem | null>(null);
  const [historyItem, setHistoryItem] = useState<GameItem | null>(null);
  const [newValue, setNewValue] = useState('');
  const [newDemand, setNewDemand] = useState('');
  const [newTrend, setNewTrend] = useState('');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const { toast } = useToast();
  
  // New item form state
  const [newItem, setNewItem] = useState({
    id: '',
    name: '',
    value: '',
    demand: '5',
    rarity: 'common',
    trend: 'stable',
    category: '',
    image_url: '',
    game_id: '',
  });
  
  const { items, loading, updateItem, refetch } = useGameItems(
    selectedGame === 'all' ? undefined : selectedGame
  );

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (item: GameItem) => {
    setEditingItem(item);
    setNewValue(item.value.toString());
    setNewDemand(item.demand.toString());
    setNewTrend(item.trend);
  };

  const handleSave = async () => {
    if (!editingItem) return;

    const success = await updateItem(editingItem.id, {
      value: parseInt(newValue),
      demand: parseInt(newDemand),
      trend: newTrend,
    });

    if (success) {
      setEditingItem(null);
    }
  };

  const handleAddItem = async () => {
    if (!newItem.name || !newItem.game_id || !newItem.value || !newItem.category) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    const itemId = `${newItem.game_id}-${Date.now()}`;
    
    const { error } = await supabase
      .from('game_items')
      .insert({
        id: itemId,
        game_id: newItem.game_id,
        name: newItem.name,
        value: parseInt(newItem.value),
        demand: parseInt(newItem.demand),
        rarity: newItem.rarity,
        trend: newItem.trend,
        category: newItem.category,
        image_url: newItem.image_url || '📦',
      } as any);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to add item',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Success',
      description: 'Item added successfully',
    });

    setShowAddDialog(false);
    setNewItem({
      id: '',
      name: '',
      value: '',
      demand: '5',
      rarity: 'common',
      trend: 'stable',
      category: '',
      image_url: '',
      game_id: '',
    });
    refetch();
  };

  const handleDeleteItem = async (itemId: string) => {
    const { error } = await supabase
      .from('game_items')
      .delete()
      .eq('id', itemId);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete item',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Success',
      description: 'Item deleted successfully',
    });
    refetch();
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'rising':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'falling':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getGameCategories = (gameId: string) => {
    const game = games.find(g => g.id === gameId);
    return game?.categories || [];
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
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Manage Item Values</CardTitle>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Item</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Game *</Label>
                <Select 
                  value={newItem.game_id} 
                  onValueChange={(v) => setNewItem({...newItem, game_id: v, category: ''})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select game" />
                  </SelectTrigger>
                  <SelectContent>
                    {games.map(game => (
                      <SelectItem key={game.id} value={game.id}>
                        {game.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Name *</Label>
                <Input
                  value={newItem.name}
                  onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                  placeholder="Item name"
                />
              </div>

              <div className="space-y-2">
                <Label>Value *</Label>
                <Input
                  type="number"
                  value={newItem.value}
                  onChange={(e) => setNewItem({...newItem, value: e.target.value})}
                  placeholder="Item value"
                />
              </div>

              <div className="space-y-2">
                <Label>Category *</Label>
                <Select 
                  value={newItem.category} 
                  onValueChange={(v) => setNewItem({...newItem, category: v})}
                  disabled={!newItem.game_id}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {getGameCategories(newItem.game_id).filter(c => c !== 'All').map(cat => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Demand (1-10)</Label>
                  <Input
                    type="number"
                    min="1"
                    max="10"
                    value={newItem.demand}
                    onChange={(e) => setNewItem({...newItem, demand: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Rarity</Label>
                  <Select value={newItem.rarity} onValueChange={(v) => setNewItem({...newItem, rarity: v})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="common">Common</SelectItem>
                      <SelectItem value="uncommon">Uncommon</SelectItem>
                      <SelectItem value="rare">Rare</SelectItem>
                      <SelectItem value="epic">Epic</SelectItem>
                      <SelectItem value="legendary">Legendary</SelectItem>
                      <SelectItem value="godly">Godly</SelectItem>
                      <SelectItem value="ancient">Ancient</SelectItem>
                      <SelectItem value="chroma">Chroma</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Trend</Label>
                <Select value={newItem.trend} onValueChange={(v) => setNewItem({...newItem, trend: v})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rising">Rising</SelectItem>
                    <SelectItem value="stable">Stable</SelectItem>
                    <SelectItem value="falling">Falling</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Image (emoji or URL)</Label>
                <Input
                  value={newItem.image_url}
                  onChange={(e) => setNewItem({...newItem, image_url: e.target.value})}
                  placeholder="🔫 or https://..."
                />
              </div>

              <Button onClick={handleAddItem} className="w-full">
                Add Item
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <Select value={selectedGame} onValueChange={setSelectedGame}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Select game" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Games</SelectItem>
              {games.map(game => (
                <SelectItem key={game.id} value={game.id}>
                  {game.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
        </div>

        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Game</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Change</TableHead>
                <TableHead>Demand</TableHead>
                <TableHead>Trend</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.map(item => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{item.image_url}</span>
                      {item.name}
                    </div>
                  </TableCell>
                  <TableCell className="capitalize">{item.game_id}</TableCell>
                  <TableCell>{formatValue(item.value)}</TableCell>
                  <TableCell>
                    <span className={
                      (item.last_change || 0) > 0 ? 'text-green-500' :
                      (item.last_change || 0) < 0 ? 'text-red-500' : 'text-muted-foreground'
                    }>
                      {(item.last_change || 0) > 0 ? '+' : ''}{formatValue(item.last_change || 0)}
                    </span>
                  </TableCell>
                  <TableCell>{item.demand}/10</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {getTrendIcon(item.trend)}
                      <span className="capitalize">{item.trend}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(item)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit {editingItem?.name}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <Label>Value</Label>
                              <Input
                                type="number"
                                value={newValue}
                                onChange={(e) => setNewValue(e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Demand (1-10)</Label>
                              <Input
                                type="number"
                                min="1"
                                max="10"
                                value={newDemand}
                                onChange={(e) => setNewDemand(e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Trend</Label>
                              <Select value={newTrend} onValueChange={setNewTrend}>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="rising">Rising</SelectItem>
                                  <SelectItem value="stable">Stable</SelectItem>
                                  <SelectItem value="falling">Falling</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <Button onClick={handleSave} className="w-full">
                              Save Changes
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setHistoryItem(item)}
                          >
                            <History className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>{historyItem?.name} - Value History</DialogTitle>
                          </DialogHeader>
                          {historyItem && (
                            <ItemValueHistoryChart itemId={historyItem.id} />
                          )}
                        </DialogContent>
                      </Dialog>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDeleteItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No items found
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminItems;
