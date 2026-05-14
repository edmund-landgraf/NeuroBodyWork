import * as React from "react";

type SlotProps = React.HTMLAttributes<HTMLElement> & {
  children?: React.ReactElement<Record<string, unknown>>;
};

export const Slot = React.forwardRef<HTMLElement, SlotProps>(({ children, ...props }, ref) => {
  if (!React.isValidElement(children)) {
    return null;
  }

  return React.cloneElement(children, {
    ...(props as Record<string, unknown>),
    ...(children.props as Record<string, unknown>),
    ref,
    className: [props.className, children.props.className].filter(Boolean).join(" "),
  });
});

Slot.displayName = "Slot";
