import React from "react";
import { cn } from "../../lib/utils";

const Label = React.forwardRef(({ className, children, required, ...props }, ref) => {
  return (
    <label
      ref={ref}
      className={cn(
        "text-xs font-semibold uppercase tracking-wider text-slate-700 select-none flex items-center gap-1",
        className
      )}
      {...props}
    >
      {children}
      {required && <span className="text-red-500 font-bold">*</span>}
    </label>
  );
});
Label.displayName = "Label";

export { Label };
