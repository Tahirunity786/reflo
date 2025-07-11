"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const salesData = [
  { date: 'Mon', sales: 120 },
  { date: 'Tue', sales: 190 },
  { date: 'Wed', sales: 150 },
  { date: 'Thu', sales: 220 },
  { date: 'Fri', sales: 180 },
  { date: 'Sat', sales: 240 },
  { date: 'Sun', sales: 200 },
];

export default function SalesChart() {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">Sales Overview (Last 7 Days)</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={salesData}>
          <CartesianGrid stroke="#e5e7eb" strokeDasharray="5 5" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}