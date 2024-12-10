// import { useEffect, useRef } from "react";
import { Editor } from "@monaco-editor/react";

interface CodeEditorProps {
  fileName: string;
  content: string;
  onContentChange: (newContent: string) => void;
}

export function CodeEditor({
  // fileName,
  content,
  onContentChange,
}: CodeEditorProps) {
  // const editorRef = useRef(null);

  return (
    <div className="w-full h-full">
      <Editor
        height="100%"
        defaultLanguage="typescript"
        theme="vs-dark"
        value={content}
        onChange={(value) => onContentChange(value || "")}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: "on",
          roundedSelection: false,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
}
