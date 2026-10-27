import React from "react";
import { cn } from "../../lib/utils";

const Button = React.forwardRef(
  ({ className, variant = "default", size = "default", type = "button", ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer active:scale-[0.98]";

    const variants = {
      default:
        "bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-md shadow-indigo-500/25 hover:shadow-lg hover:shadow-indigo-500/35 focus-visible:ring-indigo-600 border border-indigo-500/30",
      secondary:
        "bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-200/80 shadow-xs",
      outline:
        "border border-slate-300/90 bg-white hover:bg-slate-50 text-slate-700 shadow-xs hover:border-slate-400 focus-visible:ring-slate-400",
      ghost:
        "hover:bg-slate-100 text-slate-700",
      destructive:
        "bg-gradient-to-r from-red-600 to-rose-600 text-white hover:from-red-500 hover:to-rose-500 shadow-md shadow-red-500/20",
    };

    const sizes = {
      default: "h-11 px-5 py-2.5",
      sm: "h-9 rounded-md px-3 text-xs",
      lg: "h-12 rounded-lg px-8 text-base",
      icon: "h-10 w-10",
    };

    return (
      <button
        type={type}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
