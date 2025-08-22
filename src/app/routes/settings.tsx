import { createFileRoute } from "@tanstack/react-router";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { useEffect, useState } from "react";
import {
  NATIVE_API_READ_SETTINGS,
  NATIVE_API_SAVE_SETTINGS,
} from "@/native/constants";

export const Route = createFileRoute("/settings")({
  component: Settings,
});

function Settings() {
  const [apiKey, setApiKey] = useState("");
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showKey, setShowKey] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const s = await nativeAPI.invokeNativeAPI(NATIVE_API_READ_SETTINGS);
        setApiKey(s?.geminiApiKey ?? "");
      } catch {
        /* ignore */
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const masked = apiKey ? apiKey.replace(/.(?=.{4})/g, "•") : "";

  return (
    <div className="p-4 md:p-8 mx-auto max-w-3xl space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground text-sm md:text-base max-w-prose">
          Provide your Gemini API key so the app can generate prompts. The key
          is stored locally only.
        </p>
      </header>

      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="apiKey" className="font-semibold">
            Gemini API Key
          </Label>
          <div className="flex gap-2">
            <Input
              id="apiKey"
              type={showKey ? "text" : "password"}
              placeholder={loading ? "Loading..." : "Paste your Gemini API key"}
              disabled={loading}
              value={showKey ? apiKey : masked}
              onChange={(e) => {
                setSaved(false);
                const raw = showKey ? e.target.value : e.target.value; // both same
                setApiKey(raw);
              }}
              autoComplete="off"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowKey((s) => !s)}
            >
              {showKey ? "Hide" : "Show"}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Stored at user data path. Not synced or sent elsewhere.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            type="button"
            disabled={!apiKey || loading}
            onClick={async () => {
              await nativeAPI.invokeNativeAPI(NATIVE_API_SAVE_SETTINGS, {
                geminiApiKey: apiKey,
              });
              setSaved(true);
            }}
          >
            Save
          </Button>
          {saved && <span className="text-xs text-green-600">Saved ✓</span>}
        </div>
      </div>
    </div>
  );
}

export default Settings;
