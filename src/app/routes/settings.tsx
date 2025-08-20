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

  useEffect(() => {
    (async () => {
      try {
        const s = await nativeAPI.invokeNativeAPI(NATIVE_API_READ_SETTINGS);
        setApiKey(s?.geminiApiKey ?? "");
      } catch {}
    })();
  }, []);

  return (
    <div className="p-2">
      <h1 className="text-2xl font-bold">Settings</h1>
      <div className="mt-4">
        <Label htmlFor="apiKey">Gemini API Key</Label>
        <Input
          id="apiKey"
          type="password"
          placeholder="Paste your Gemini API key"
          value={apiKey}
          onChange={(e) => {
            setSaved(false);
            setApiKey(e.target.value);
          }}
        />
      </div>
      <div className="mt-4">
        <Button
          disabled={!apiKey}
          onClick={async () => {
            await nativeAPI.invokeNativeAPI(NATIVE_API_SAVE_SETTINGS, {
              geminiApiKey: apiKey,
            });
            setSaved(true);
          }}
        >
          Save
        </Button>
        {saved ? (
          <span className="ml-2 text-green-700 text-sm">Saved</span>
        ) : null}
      </div>
    </div>
  );
}

export default Settings;
