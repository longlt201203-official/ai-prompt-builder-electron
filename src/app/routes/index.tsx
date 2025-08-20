import { NATIVE_API_GENERATE_PROMPT } from "@/native/constants";
import { createFileRoute } from "@tanstack/react-router";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [purpose, setPurpose] = useState("");
  const [aiRole, setAiRole] = useState("");
  const [users, setUsers] = useState("");
  const [output, setOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cb = (
      event: Electron.IpcRendererEvent,
      type: string,
      ...args: any[]
    ) => {
      if (type === "begin") {
        setIsGenerating(true);
        setError(null);
        setOutput("");
      } else if (type === "chunk") {
        const text = args?.[0] ?? "";
        setOutput((prev) => prev + text);
      } else if (type === "complete") {
        setIsGenerating(false);
      } else if (type === "error") {
        setIsGenerating(false);
        setError(String(args?.[0] ?? "Unknown error"));
      }
    };

    nativeAPI.nativeAPICallback(NATIVE_API_GENERATE_PROMPT, cb);
  }, []);

  return (
    <div className="p-2">
      <h1 className="text-4xl font-extrabold tracking-tight text-balance">
        AI Prompt builder
      </h1>
      <div>
        <Label htmlFor="purposeInput">What do you want to do?</Label>
        <Input
          id="purposeInput"
          placeholder="Example: suggest post content"
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="aiRoleInput">What is the role of AI?</Label>
        <Input
          id="aiRoleInput"
          placeholder="Example: writing expert"
          value={aiRole}
          onChange={(e) => setAiRole(e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="usersInput">Who are the users?</Label>
        <Input
          id="usersInput"
          placeholder="Example: blog writer"
          value={users}
          onChange={(e) => setUsers(e.target.value)}
        />
      </div>

      <div className="mt-4 flex gap-2">
        <Button
          disabled={isGenerating || !purpose || !aiRole || !users}
          onClick={() => {
            nativeAPI.invokeNativeAPI(
              NATIVE_API_GENERATE_PROMPT,
              purpose,
              aiRole,
              users
            );
          }}
        >
          {isGenerating ? "Generating…" : "Create Prompt"}
        </Button>
        <Button
          variant="secondary"
          disabled={!output}
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(output);
            } catch {}
          }}
        >
          Copy
        </Button>
        <Button
          variant="outline"
          disabled={!output || isGenerating}
          onClick={() => setOutput("")}
        >
          Clear
        </Button>
      </div>

      {error ? <div className="mt-4 text-red-600 text-sm">{error}</div> : null}

      <div className="mt-4">
        <Label>Generated Prompt</Label>
        <pre className="mt-2 whitespace-pre-wrap rounded border p-3 min-h-[200px] max-h-[50vh] overflow-auto text-sm bg-white/50">
          {output || (isGenerating ? "…" : "")}
        </pre>
      </div>
    </div>
  );
}
