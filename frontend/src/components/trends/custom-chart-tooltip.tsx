interface TooltipEntry {
  name?: string;
  value?: number | string;
  color?: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipEntry[];
  label?: string;
}

export function CustomChartTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-3 shadow-lg text-xs">
      <p className="font-semibold text-[#0F172A] mb-2">{label}</p>
      {payload.map((entry, index) => (
        <div key={`${entry.name}-${index}`} className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full" style={{ background: entry.color }} />
          <span className="text-[#64748B]">{entry.name}:</span>
          <span className="font-semibold text-[#0F172A]">{entry.value}</span>
        </div>
      ))}
    </div>
  );
}
