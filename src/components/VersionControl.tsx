import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function VersionControl() {
  return (
    <div className="w-64 border-l border-border bg-muted p-4">
      <h2 className="text-lg font-semibold mb-4">Git</h2>
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold mb-2">Staged Changes</h3>
          <ul className="text-sm space-y-1">
            <li>index.ts</li>
            <li>app.ts</li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold mb-2">Commit Message</h3>
          <Input placeholder="Enter commit message" />
        </div>
        <Button className="w-full">Commit Changes</Button>
      </div>
    </div>
  );
}
