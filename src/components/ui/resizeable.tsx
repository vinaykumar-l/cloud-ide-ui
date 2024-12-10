import type { ComponentProps } from "react";
import * as React from "react";
import { GripVertical } from "lucide-react";
import * as ResizablePrimitive from "react-resizable-panels";
import { cn } from "@/lib/utils";

const ResizablePanelGroup = React.forwardRef<
  ResizablePrimitive.ImperativePanelGroupHandle,
  ComponentProps<typeof ResizablePrimitive.PanelGroup>
>(({ className, ...props }, ref) => {
  React.useEffect(() => {
    const handleError = (e: ErrorEvent) => {
      if (e.message.includes("ResizeObserver")) {
        e.stopImmediatePropagation();
      }
    };
    window.addEventListener("error", handleError);
    return () => window.removeEventListener("error", handleError);
  }, []);

  return (
    <ResizablePrimitive.PanelGroup
      ref={ref}
      className={cn(
        "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
        className
      )}
      {...props}
    />
  );
});
ResizablePanelGroup.displayName = "ResizablePanelGroup";

const ResizablePanel = React.forwardRef<
  ResizablePrimitive.ImperativePanelHandle,
  ComponentProps<typeof ResizablePrimitive.Panel>
>(({ className, ...props }, ref) => (
  <ResizablePrimitive.Panel
    ref={ref}
    className={cn(
      "relative flex h-full w-full flex-col overflow-hidden",
      className
    )}
    {...props}
  />
));
ResizablePanel.displayName = "ResizablePanel";

const ResizableHandle = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof ResizablePrimitive.PanelResizeHandle>
>((props, ref) => {
  const { className, ...rest } = props;
  return (
    <ResizablePrimitive.PanelResizeHandle
      {...rest}
      className={cn(
        "group relative flex w-1 bg-border hover:bg-ring cursor-col-resize data-[panel-group-direction=vertical]:h-1 data-[panel-group-direction=vertical]:w-full",
        className
      )}
    >
      <div
        ref={ref}
        className="absolute inset-0 flex items-center justify-center"
      >
        <GripVertical className="h-4 w-4 text-gray-500" />
      </div>
    </ResizablePrimitive.PanelResizeHandle>
  );
});

ResizableHandle.displayName = "ResizableHandle";
export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
