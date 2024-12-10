import { useState, useRef, useEffect } from "react";
import { ChevronRight } from "lucide-react";

export function Terminal() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOutput([...output, `$ ${input}`, "Command not recognized"]);
    setInput("");
  };

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="h-full flex flex-col bg-black text-green-400 font-mono text-sm">
      <div ref={outputRef} className="flex-1 overflow-auto p-4">
        {output.map((line, index) => (
          <div key={index}>{line}</div>
        ))}
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex items-center p-4 border-t border-green-900"
      >
        <ChevronRight className="w-4 h-4 mr-2" />
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent focus:outline-none"
          placeholder="Enter command..."
        />
      </form>
    </div>
  );
}
