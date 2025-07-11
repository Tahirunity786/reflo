"use client";

export default function SummaryCard({ title, value, icon: Icon, color }) {
  return (
    <div className={`flex items-center p-5 rounded-lg shadow bg-white border-l-4 ${color}`}>
      <div className="mr-4">
        <Icon className="w-6 h-6 text-gray-600" />
      </div>
      <div>
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <p className="text-xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
}
