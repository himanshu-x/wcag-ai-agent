// ---------------------------------
// SIDEBAR ITEM
// ---------------------------------

export function SidebarItem({
  icon,
  label,
  active,
}: any) {
  return (
    <button
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition ${
        active
          ? "bg-blue-500/20 text-blue-300"
          : "hover:bg-white/5 text-gray-300"
      }`}
    >
      {icon}

      <span className="text-sm font-medium">
        {label}
      </span>
    </button>
  );
}
