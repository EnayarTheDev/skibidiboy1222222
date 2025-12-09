import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GameItem, formatValue } from '@/data/gameData';
import { Bell, TrendingUp, TrendingDown } from 'lucide-react';
import { usePriceAlerts } from '@/hooks/usePriceAlerts';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

interface PriceAlertModalProps {
  item: GameItem | null;
  gameId: string;
  gameName: string;
  open: boolean;
  onClose: () => void;
}

const PriceAlertModal = ({ item, gameId, gameName, open, onClose }: PriceAlertModalProps) => {
  const { user } = useAuth();
  const { createAlert } = usePriceAlerts();
  const [targetValue, setTargetValue] = useState('');
  const [condition, setCondition] = useState<'above' | 'below'>('above');
  const [loading, setLoading] = useState(false);

  if (!item) return null;

  const handleSubmit = async () => {
    const value = parseInt(targetValue);
    if (isNaN(value) || value <= 0) return;

    setLoading(true);
    const success = await createAlert(item.id, gameId, item.name, value, condition);
    setLoading(false);

    if (success) {
      setTargetValue('');
      onClose();
    }
  };

  if (!user) {
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Price Alert
            </DialogTitle>
          </DialogHeader>
          <div className="text-center py-6">
            <p className="text-muted-foreground mb-4">Please log in to create price alerts</p>
            <Button asChild>
              <a href="/auth">Log In</a>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-card border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            Create Price Alert
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Item Info */}
          <div className="flex items-center gap-3 p-3 bg-secondary rounded-lg">
            <span className="text-3xl">{item.imageUrl}</span>
            <div>
              <p className="font-medium text-foreground">{item.name}</p>
              <p className="text-sm text-muted-foreground">{gameName}</p>
              <p className="text-sm text-primary">Current: {formatValue(item.value)}</p>
            </div>
          </div>

          {/* Condition */}
          <div className="space-y-2">
            <Label>Alert me when price goes</Label>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                className={cn("flex-1", condition === 'above' && "border-green text-green bg-green/10")}
                onClick={() => setCondition('above')}
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Above
              </Button>
              <Button
                type="button"
                variant="outline"
                className={cn("flex-1", condition === 'below' && "border-red text-red bg-red/10")}
                onClick={() => setCondition('below')}
              >
                <TrendingDown className="h-4 w-4 mr-2" />
                Below
              </Button>
            </div>
          </div>

          {/* Target Value */}
          <div className="space-y-2">
            <Label htmlFor="targetValue">Target Value</Label>
            <Input
              id="targetValue"
              type="number"
              placeholder="Enter target value..."
              value={targetValue}
              onChange={(e) => setTargetValue(e.target.value)}
              className="bg-secondary border-border"
            />
          </div>

          <Button 
            className="w-full" 
            onClick={handleSubmit}
            disabled={loading || !targetValue}
          >
            <Bell className="h-4 w-4 mr-2" />
            {loading ? 'Creating...' : 'Create Alert'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PriceAlertModal;
