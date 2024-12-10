"use client";

import { useState } from "react";
import { ChevronRight, File, Folder, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

type FileNode = {
  name: string;
  type: "file" | "folder";
  children?: FileNode[];
};

interface FileTreeProps {
  onFileOpen: (fileName: string) => void;
}

export function FileTree({ onFileOpen }: FileTreeProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    new Set()
  );

  const initialFiles: FileNode[] = [
    {
      name: "src",
      type: "folder",
      children: [
        { name: "index.ts", type: "file" },
        { name: "app.ts", type: "file" },
      ],
    },
    {
      name: "public",
      type: "folder",
      children: [
        { name: "index.html", type: "file" },
        { name: "styles.css", type: "file" },
      ],
    },
    { name: "package.json", type: "file" },
    { name: "tsconfig.json", type: "file" },
  ];

  return (
    <div className="h-full flex flex-col bg-muted">
      <div className="p-2 border-b">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            className="pl-8"
            placeholder="Search files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="flex-1 overflow-auto p-2">
        <div className="font-medium text-sm mb-2">Explorer</div>
        <div className="space-y-1">
          {initialFiles.map((node, index) => (
            <FileTreeNode
              key={index}
              node={node}
              level={0}
              onFileOpen={onFileOpen}
              searchTerm={searchTerm}
              expandedFolders={expandedFolders}
              setExpandedFolders={setExpandedFolders}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function FileTreeNode({
  node,
  level,
  onFileOpen,
  searchTerm,
  expandedFolders,
  setExpandedFolders,
}: {
  node: FileNode;
  level: number;
  onFileOpen: (fileName: string) => void;
  searchTerm: string;
  expandedFolders: Set<string>;
  setExpandedFolders: React.Dispatch<React.SetStateAction<Set<string>>>;
}) {
  const isExpanded = expandedFolders.has(node.name);
  const matchesSearch = node.name
    .toLowerCase()
    .includes(searchTerm.toLowerCase());

  const toggleFolder = () => {
    setExpandedFolders((prev) => {
      const next = new Set(prev);
      if (next.has(node.name)) {
        next.delete(node.name);
      } else {
        next.add(node.name);
      }
      return next;
    });
  };

  if (!matchesSearch && !isExpanded) return null;

  return (
    <div>
      <div
        className={cn(
          "flex items-center gap-2 px-2 py-1 rounded-sm cursor-pointer hover:bg-accent group",
          level === 0 && "ml-0"
        )}
        style={{ paddingLeft: `${level * 12 + 8}px` }}
        onClick={() =>
          node.type === "folder" ? toggleFolder() : onFileOpen(node.name)
        }
      >
        {node.type === "folder" && (
          <ChevronRight
            className={cn(
              "w-4 h-4 transition-transform",
              isExpanded && "rotate-90"
            )}
          />
        )}
        {node.type === "file" && <File className="w-4 h-4" />}
        {node.type === "folder" && <Folder className="w-4 h-4" />}
        <span className="text-sm truncate">{node.name}</span>
      </div>
      {node.type === "folder" && isExpanded && node.children && (
        <div>
          {node.children.map((child, index) => (
            <FileTreeNode
              key={index}
              node={child}
              level={level + 1}
              onFileOpen={onFileOpen}
              searchTerm={searchTerm}
              expandedFolders={expandedFolders}
              setExpandedFolders={setExpandedFolders}
            />
          ))}
        </div>
      )}
    </div>
  );
}
