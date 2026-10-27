import React from "react";
import { cn } from "../../lib/utils";

const Input = React.forwardRef(({ className, type = "text", error, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-11 w-full rounded-lg border bg-white px-3.5 py-2 text-sm text-slate-900 transition-all duration-200 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/25 focus-visible:border-indigo-600 disabled:cursor-not-allowed disabled:opacity-50 shadow-xs",
        error
          ? "border-red-400 focus-visible:ring-red-400/25 focus-visible:border-red-500 bg-red-50/30"
          : "border-slate-200 hover:border-slate-300",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
