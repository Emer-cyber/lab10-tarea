import React from "react";
import { cn } from "../../lib/utils";

const categoryStyles = {
  Bebidas: "bg-gradient-to-r from-sky-50 to-blue-50 text-blue-700 border-blue-200/90 shadow-xs shadow-blue-500/10",
  Snacks: "bg-gradient-to-r from-amber-50 to-orange-50 text-amber-800 border-amber-200/90 shadow-xs shadow-amber-500/10",
  Lácteos: "bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-800 border-emerald-200/90 shadow-xs shadow-emerald-500/10",
  Abarrotes: "bg-gradient-to-r from-indigo-50 to-violet-50 text-indigo-700 border-indigo-200/90 shadow-xs shadow-indigo-500/10",
  Limpieza: "bg-gradient-to-r from-purple-50 to-fuchsia-50 text-purple-700 border-purple-200/90 shadow-xs shadow-purple-500/10",
  Otros: "bg-slate-100 text-slate-700 border-slate-200 shadow-xs",
};

const dotColors = {
  Bebidas: "bg-blue-500",
  Snacks: "bg-amber-500",
  Lácteos: "bg-emerald-500",
  Abarrotes: "bg-indigo-500",
  Limpieza: "bg-purple-500",
  Otros: "bg-slate-400",
};

export function Badge({ children, className }) {
  const chosenStyle = categoryStyles[children] || categoryStyles.Otros;
  const chosenDot = dotColors[children] || dotColors.Otros;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition-all duration-200 hover:scale-105 select-none",
        chosenStyle,
        className
      )}
    >
      <span className={cn("h-2 w-2 rounded-full animate-pulse", chosenDot)} />
      {children}
    </span>
  );
}
