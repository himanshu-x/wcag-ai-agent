export function SummaryCard({
  title,
  value,
  icon,
  subtitle,
}: any) {
  return (
    <div className="bg-[#111827] border border-white/10 rounded-2xl px-5 py-4 flex items-center justify-between min-h-[120px]">

      {/* LEFT */}

      <div>
        <p className="text-gray-400 text-sm mb-2">
          {title}
        </p>

        <h2 className="text-4xl font-bold leading-none">
          {value}
        </h2>

        <p className="text-gray-500 text-sm mt-3">
          {subtitle}
        </p>
      </div>

      {/* RIGHT ICON */}

      <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center">
        {icon}
      </div>
    </div>
  );
}