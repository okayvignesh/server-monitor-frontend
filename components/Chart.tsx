import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface ChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
      fill: boolean;
    }[];
  };
  title: string;
  currentValue: number;
  unit?: string;
  type?: 'cpu' | 'memory' | 'storage' | 'containers';
}

const Chart: React.FC<ChartProps> = ({ 
  data, 
  title, 
  currentValue, 
  unit = '%',
  type = 'cpu'
}) => {
  // Transform data for Recharts format
  const chartData = data.labels.map((label, index) => ({
    name: label,
    [data.datasets[0].label]: data.datasets[0].data[index]
  }));

  // Define gradient colors based on type
  const getGradientColors = () => {
    switch (type) {
      case 'cpu':
        return {
          fill: 'url(#cpuGradient)',
          stroke: '#3B82F6' // blue-500
        };
      case 'memory':
        return {
          fill: 'url(#memoryGradient)',
          stroke: '#8B5CF6' // purple-500
        };
      case 'storage':
        return {
          fill: 'url(#storageGradient)',
          stroke: '#10B981' // green-500
        };
      case 'containers':
        return {
          fill: 'url(#containersGradient)',
          stroke: '#6366F1' // indigo-500
        };
      default:
        return {
          fill: 'url(#cpuGradient)',
          stroke: '#3B82F6'
        };
    }
  };

  const colors = getGradientColors();

  return (
    <div className="backdrop-blur-xl bg-black/20 p-6 rounded-xl shadow-lg border border-white/20 hover:border-white/10 transition-all duration-500">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-white">
          {title}
        </h3>
        <div className="text-2xl font-bold text-white">
          {currentValue}{unit}
        </div>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart 
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <defs>
              <linearGradient id="cpuGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="memoryGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="storageGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="containersGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
              </linearGradient>
            </defs>

            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="rgba(255, 255, 255, 0.1)"
              vertical={false}
            />
            
            <XAxis 
              dataKey="name" 
              stroke="rgba(255, 255, 255, 0.7)"
              tick={{ 
                fill: 'rgba(255, 255, 255, 0.7)',
                fontSize: 12,
                fontFamily: 'Inter, sans-serif'
              }}
              axisLine={{ stroke: 'rgba(255, 255, 255, 0.3)' }}
              tickLine={{ stroke: 'rgba(255, 255, 255, 0.3)' }}
              padding={{ left: 20, right: 20 }}
            />
            
            <YAxis 
              stroke="rgba(255, 255, 255, 0.7)"
              tick={{ 
                fill: 'rgba(255, 255, 255, 0.7)',
                fontSize: 12,
                fontFamily: 'Inter, sans-serif'
              }}
              axisLine={{ stroke: 'rgba(255, 255, 255, 0.3)' }}
              tickLine={{ stroke: 'rgba(255, 255, 255, 0.3)' }}
              domain={[0, 100]}
              tickCount={6}
            />
            
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                fontSize: '12px',
                fontFamily: 'Inter, sans-serif'
              }}
              labelStyle={{ 
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: '12px',
                fontFamily: 'Inter, sans-serif'
              }}
              itemStyle={{ 
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '12px',
                fontFamily: 'Inter, sans-serif'
              }}
            />
            
            <Legend 
              wrapperStyle={{ 
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '12px',
                fontFamily: 'Inter, sans-serif',
                paddingTop: '10px'
              }}
            />
            
            <Area
              type="monotone"
              dataKey={data.datasets[0].label}
              stroke={colors.stroke}
              fill={colors.fill}
              strokeWidth={2}
              dot={{ 
                r: 3,
                strokeWidth: 2,
                fill: colors.stroke
              }}
              activeDot={{ 
                r: 5,
                strokeWidth: 2,
                fill: colors.stroke
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Chart;
