import { NativeAPIHandler } from "../types";
import * as fs from "fs";
import * as path from "path";
import { app } from "electron";

const saveSettings: NativeAPIHandler = (_e, partial: { geminiApiKey?: string }) => {
    const userDataDir = app.getPath("userData");
    const settingsPath = path.join(userDataDir, "settings.json");
    try { fs.mkdirSync(userDataDir, { recursive: true }); } catch { }
    let current: any = {};
    try {
        current = JSON.parse(fs.readFileSync(settingsPath, "utf-8"));
    } catch { }
    const newSettings = { ...current, ...partial };
    fs.writeFileSync(settingsPath, JSON.stringify(newSettings, null, 2));
    return newSettings;
};

export default saveSettings;
