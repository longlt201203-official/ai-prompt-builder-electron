import { NATIVE_API_GENERATE_PROMPT } from "@/native/constants";
import { createFileRoute } from "@tanstack/react-router";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { useCallback, useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  // Form state
  const [purpose, setPurpose] = useState("");
  const [aiRole, setAiRole] = useState("");
  const [users, setUsers] = useState("");
  // Generation state
  const [output, setOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const liveRef = useRef<HTMLDivElement | null>(null);

  const canGenerate =
    purpose.trim() && aiRole.trim() && users.trim() && !isGenerating;

  const handleGenerate = useCallback(() => {
    if (!canGenerate) return;
    nativeAPI.invokeNativeAPI(
      NATIVE_API_GENERATE_PROMPT,
      purpose.trim(),
      aiRole.trim(),
      users.trim()
    );
  }, [canGenerate, purpose, aiRole, users]);

  // IPC stream listener
  useEffect(() => {
    const cb = (
      _event: Electron.IpcRendererEvent,
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

  // Auto-scroll output
  useEffect(() => {
    if (liveRef.current) {
      liveRef.current.scrollTop = liveRef.current.scrollHeight;
    }
  }, [output]);

  return (
    <div className="p-4 md:p-8 mx-auto max-w-5xl space-y-8">
      <header className="space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight">
          AI Prompt Builder
        </h1>
        <p className="text-muted-foreground text-sm md:text-base max-w-2xl">
          Provide concise details below. A structured, detailed prompt will be
          generated live.
        </p>
      </header>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleGenerate();
        }}
        className="space-y-6"
      >
        <div className="grid gap-6 md:grid-cols-3">
          <div className="flex flex-col gap-2">
            <Label htmlFor="purposeInput" className="font-semibold">
              Purpose
            </Label>
            <Input
              id="purposeInput"
              placeholder="E.g. generate blog post ideas"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              autoComplete="off"
            />
            <p className="text-xs text-muted-foreground leading-snug">
              Primary task or objective.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="aiRoleInput" className="font-semibold">
              AI Role
            </Label>
            <Input
              id="aiRoleInput"
              placeholder="E.g. senior copywriter"
              value={aiRole}
              onChange={(e) => setAiRole(e.target.value)}
              autoComplete="off"
            />
            <p className="text-xs text-muted-foreground leading-snug">
              Expertise / perspective to adopt.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="usersInput" className="font-semibold">
              Target Users
            </Label>
            <Input
              id="usersInput"
              placeholder="E.g. content marketers"
              value={users}
              onChange={(e) => setUsers(e.target.value)}
              autoComplete="off"
            />
            <p className="text-xs text-muted-foreground leading-snug">
              Who benefits from the output.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 items-center">
          <Button type="submit" disabled={!canGenerate}>
            {isGenerating ? "Generating…" : "Create Prompt"}
          </Button>
          <Button
            type="button"
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
            type="button"
            variant="outline"
            disabled={!output || isGenerating}
            onClick={() => setOutput("")}
          >
            Clear
          </Button>
          {isGenerating && (
            <span className="text-xs text-muted-foreground animate-pulse">
              Streaming response…
            </span>
          )}
          {output && !isGenerating && (
            <span className="text-xs text-muted-foreground">
              {output.trim().split(/\s+/).filter(Boolean).length} words
            </span>
          )}
        </div>
      </form>

      {error && (
        <div className="rounded-md border border-destructive/40 bg-destructive/10 px-4 py-2 text-sm text-destructive-foreground">
          {error}
        </div>
      )}

      <section className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="font-semibold">Generated Prompt</Label>
          {output && (
            <Button
              size="sm"
              variant="ghost"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(output);
                } catch {}
              }}
            >
              Copy
            </Button>
          )}
        </div>
        <div
          ref={liveRef}
          aria-live="polite"
          aria-label="Generated prompt"
          className="rounded-lg border bg-card/50 backdrop-blur-sm p-4 min-h-[240px] max-h-[55vh] overflow-auto font-mono text-sm whitespace-pre-wrap leading-relaxed shadow-inner"
        >
          {output ||
            (isGenerating ? (
              "…"
            ) : (
              <span className="text-muted-foreground">
                Result will appear here
              </span>
            ))}
        </div>
      </section>
    </div>
  );
}
