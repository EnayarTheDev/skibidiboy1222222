import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { usePriceAlerts } from '@/hooks/usePriceAlerts';
import { useAuth } from '@/hooks/useAuth';
import { Bell, Trash2, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import { formatValue } from '@/data/gameData';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { Switch } from '@/components/ui/switch';

const AlertsPage = () => {
  const { user, loading: authLoading } = useAuth();
  const { alerts, loading, deleteAlert, toggleAlert } = usePriceAlerts();

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-16 text-center">
          <Bell className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="font-display text-3xl font-bold text-foreground mb-4">Price Alerts</h1>
          <p className="text-muted-foreground mb-8">Log in to create and manage price alerts</p>
          <Button asChild>
            <Link to="/auth">Log In</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Bell className="h-10 w-10 text-primary" />
            <h1 className="font-display text-4xl font-bold text-foreground">Price Alerts</h1>
          </div>
          <p className="text-muted-foreground">Get notified when items reach your target price</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          </div>
        ) : alerts.length === 0 ? (
          <div className="text-center py-16">
            <AlertCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="font-display text-xl font-bold text-foreground mb-2">No Alerts Yet</h2>
            <p className="text-muted-foreground mb-6">Click on any item and set a price alert to get started</p>
            <Button asChild>
              <Link to="/values">Browse Items</Link>
            </Button>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto space-y-4">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={cn(
                  "bg-card rounded-xl border border-border p-4 flex items-center gap-4",
                  !alert.is_active && "opacity-60"
                )}
              >
                <div className={cn(
                  "w-12 h-12 rounded-lg flex items-center justify-center",
                  alert.condition === 'above' ? "bg-green/20" : "bg-red/20"
                )}>
                  {alert.condition === 'above' ? (
                    <TrendingUp className="h-6 w-6 text-green" />
                  ) : (
                    <TrendingDown className="h-6 w-6 text-red" />
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="font-display font-bold text-foreground">{alert.item_name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Alert when price goes {alert.condition}{' '}
                    <span className="text-primary font-medium">{formatValue(alert.target_value)}</span>
                  </p>
                </div>

                <Switch
                  checked={alert.is_active}
                  onCheckedChange={(checked) => toggleAlert(alert.id, checked)}
                />

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteAlert(alert.id)}
                  className="text-destructive hover:text-destructive/80"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default AlertsPage;
