import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { formatValue } from "@/data/gameData";

interface PricePoint {
  date: string;
  value: number;
}

interface ItemPriceChartProps {
  data: PricePoint[];
  color?: string;
}

const ItemPriceChart = ({ data, color = "hsl(var(--primary))" }: ItemPriceChartProps) => {
  const minValue = Math.min(...data.map(d => d.value)) * 0.9;
  const maxValue = Math.max(...data.map(d => d.value)) * 1.1;
  
  const isPositive = data.length > 1 && data[data.length - 1].value >= data[0].value;
  const chartColor = isPositive ? "hsl(var(--green))" : "hsl(var(--red))";

  return (
    <div className="h-32 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={chartColor} stopOpacity={0.3} />
              <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" hide />
          <YAxis domain={[minValue, maxValue]} hide />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
              color: "hsl(var(--foreground))",
            }}
            formatter={(value: number) => [formatValue(value), "Value"]}
            labelStyle={{ color: "hsl(var(--muted-foreground))" }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke={chartColor}
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorValue)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ItemPriceChart;
