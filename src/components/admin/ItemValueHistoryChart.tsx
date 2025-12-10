import { useState, useEffect } from 'react';
import { useGameItems, ValueHistory } from '@/hooks/useGameItems';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Loader2 } from 'lucide-react';
import { formatValue } from '@/data/gameData';
import { format } from 'date-fns';

interface Props {
  itemId: string;
}

const ItemValueHistoryChart = ({ itemId }: Props) => {
  const { getValueHistory } = useGameItems();
  const [history, setHistory] = useState<ValueHistory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      const data = await getValueHistory(itemId);
      setHistory(data);
      setLoading(false);
    };
    fetchHistory();
  }, [itemId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        No value history recorded yet
      </div>
    );
  }

  const chartData = history.map(h => ({
    date: format(new Date(h.recorded_at), 'MMM d'),
    value: h.value,
  }));

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
          <XAxis 
            dataKey="date" 
            className="text-xs fill-muted-foreground"
          />
          <YAxis 
            tickFormatter={(v) => formatValue(v)}
            className="text-xs fill-muted-foreground"
          />
          <Tooltip 
            formatter={(value: number) => [formatValue(value), 'Value']}
            contentStyle={{
              backgroundColor: 'hsl(var(--popover))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
            }}
          />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="hsl(var(--primary))" 
            strokeWidth={2}
            dot={{ fill: 'hsl(var(--primary))' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ItemValueHistoryChart;
