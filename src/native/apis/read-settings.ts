import { NativeAPIHandler } from "../types";
import * as fs from "fs";
import * as path from "path";
import { app } from "electron";

const initSettingValues = {
    geminiApiKey: ''
};

const readSettings: NativeAPIHandler = () => {
    const userDataDir = app.getPath("userData");
    const settingsPath = path.join(userDataDir, "settings.json");
    if (!fs.existsSync(settingsPath)) {
        // ensure directory exists (it should, but be safe)
        try { fs.mkdirSync(userDataDir, { recursive: true }); } catch { }
        fs.writeFileSync(settingsPath, JSON.stringify(initSettingValues, null, 2));
        return initSettingValues;
    }
    try {
        const settings = JSON.parse(fs.readFileSync(settingsPath, "utf-8"));
        return { ...initSettingValues, ...settings };
    } catch {
        // If file is corrupted, reset to defaults
        fs.writeFileSync(settingsPath, JSON.stringify(initSettingValues, null, 2));
        return initSettingValues;
    }
}

export default readSettings;