import React, { useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./components/ui/resizeable";
import { CodeEditor } from "./components/CodeEditor";
import { Debugger } from "./components/Debugger";
import { FileTree } from "./components/FileTree";
import { StatusBar } from "./components/StatusBar";
import { TabBar } from "./components/TabBar";
import { Terminal } from "./components/Terminal";
import { TopBar } from "./components/TopBar";
import { VersionControl } from "./components/VersionControl";
import { ThemeProvider } from "./components/ThemeProvider";
import { Browser } from "./components/Browser";

type OpenFile = {
  name: string;
  content: string;
};

export default function CloudIDE() {
  const [openFiles, setOpenFiles] = useState<OpenFile[]>([
    {
      name: "index.ts",
      content: '// Welcome to Cloud IDE\n\nconsole.log("Hello, World!");',
    },
  ]);
  const [activeFile, setActiveFile] = useState<string>("index.ts");
  const [showDebugger, setShowDebugger] = useState(false);
  const [showVersionControl, setShowVersionControl] = useState(false);
  const [showBrowser, setShowBrowser] = useState(false);

  const handleFileOpen = (fileName: string) => {
    if (!openFiles.some((file) => file.name === fileName)) {
      setOpenFiles([
        ...openFiles,
        { name: fileName, content: `// ${fileName}\n\n` },
      ]);
    }
    setActiveFile(fileName);
  };

  const handleFileClose = (fileName: string) => {
    setOpenFiles(openFiles.filter((file) => file.name !== fileName));
    if (activeFile === fileName) {
      setActiveFile(openFiles[0]?.name || "");
    }
  };

  const handleCodeChange = (fileName: string, newContent: string) => {
    setOpenFiles(
      openFiles.map((file) =>
        file.name === fileName ? { ...file, content: newContent } : file
      )
    );
  };

  return (
    <ThemeProvider>
      <div className="flex flex-col h-screen overflow-hidden bg-background text-foreground">
        <TopBar
          onToggleDebugger={() => setShowDebugger(!showDebugger)}
          onToggleVersionControl={() =>
            setShowVersionControl(!showVersionControl)
          }
          onToggleBrowser={() => setShowBrowser(!showBrowser)}
        />
        <div className="flex-1 overflow-hidden">
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={20} minSize={10} maxSize={40}>
              <div className="h-full">
                <FileTree onFileOpen={handleFileOpen} />
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={60} minSize={30}>
              <ResizablePanelGroup direction="vertical">
                <ResizablePanel defaultSize={70} minSize={30}>
                  <div className="h-full flex flex-col">
                    <TabBar
                      openFiles={openFiles.map((f) => f.name)}
                      activeFile={activeFile}
                      onChangeTab={setActiveFile}
                      onCloseTab={handleFileClose}
                    />
                    <div className="flex-1 overflow-hidden">
                      <CodeEditor
                        fileName={activeFile}
                        content={
                          openFiles.find((f) => f.name === activeFile)
                            ?.content || ""
                        }
                        onContentChange={(newContent) =>
                          handleCodeChange(activeFile, newContent)
                        }
                      />
                    </div>
                  </div>
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={30} minSize={10}>
                  <Terminal />
                </ResizablePanel>
              </ResizablePanelGroup>
            </ResizablePanel>
            {showBrowser && (
              <>
                <ResizableHandle />
                <ResizablePanel defaultSize={20} minSize={10}>
                  <div className="h-full">
                    <Browser />
                  </div>
                </ResizablePanel>
              </>
            )}
          </ResizablePanelGroup>
        </div>
        <StatusBar />
      </div>
    </ThemeProvider>
  );
}
