import { Play, StepForward, StepBack, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Debugger() {
  return (
    <div className="w-64 border-l border-border bg-muted p-4">
      <h2 className="text-lg font-semibold mb-4">Debugger</h2>
      <div className="flex space-x-2 mb-4">
        <Button size="sm" variant="outline">
          <Play className="w-4 h-4" />
        </Button>
        <Button size="sm" variant="outline">
          <Pause className="w-4 h-4" />
        </Button>
        <Button size="sm" variant="outline">
          <StepForward className="w-4 h-4" />
        </Button>
        <Button size="sm" variant="outline">
          <StepBack className="w-4 h-4" />
        </Button>
      </div>
      <div className="space-y-2">
        <div className="text-sm">
          <span className="font-semibold">Line:</span> 3
        </div>
        <div className="text-sm">
          <span className="font-semibold">Variable:</span> count = 0
        </div>
      </div>
    </div>
  );
}
