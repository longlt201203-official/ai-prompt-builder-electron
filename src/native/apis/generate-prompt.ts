import { NativeAPIHandler } from "../types";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import readSettings from "./read-settings";
import { NATIVE_API_GENERATE_PROMPT } from "../constants";

const systemInstruction = `You are an AI prompt engineering expert specializing in creating comprehensive, detailed prompts. Your task is to create thorough prompts based on user inputs.

The user will provide three key pieces of information:
1. Task/Purpose - What they want the AI to do
2. AI Role - The expertise or perspective the AI should adopt
3. Target Users - Who will be using the AI's output

Your response should be:
- A detailed, comprehensive prompt in plain text format
- Structured with clear sections addressing context, requirements, and expectations
- Include specific instructions on tone, format, and level of detail expected
- Incorporate relevant constraints or parameters that would help the AI generate better responses
- Provide examples of desired output format when appropriate
- Include follow-up questions or clarification requests if needed
- At least 250-350 words in length to ensure sufficient detail

Focus on creating prompts that are thorough enough to guide an AI to produce exactly what the user needs. Do not include explanations, introductions, or any text other than the prompt itself.`;

const userInstruction = ({ purpose, aiRole, users }: any) => `
Here are the details for creating a comprehensive prompt:
- Task/Purpose: ${purpose}
- AI Role: ${aiRole}
- Target Users: ${users}

Please generate a detailed, thorough prompt that will help the AI deliver exactly what's needed.
`;

const generatePrompt: NativeAPIHandler = async (e, purpose, aiRole, users) => {
    try {
        const settings = readSettings(e);
        if (!settings?.geminiApiKey) {
            e.sender.send(NATIVE_API_GENERATE_PROMPT, "error", "Missing Gemini API key. Please set it in Settings.");
            return;
        }

        const model = new ChatGoogleGenerativeAI({
            model: "gemini-2.0-flash",
            apiKey: settings.geminiApiKey,
        });

        const messages = [
            new SystemMessage(systemInstruction),
            new HumanMessage(userInstruction({ purpose, aiRole, users })),
        ];

        e.sender.send(NATIVE_API_GENERATE_PROMPT, "begin");
        const stream = await model.stream(messages);

        for await (const chunk of stream) {
            const anyChunk: any = chunk as any;
            // Try multiple shapes to extract text safely
            const text = anyChunk?.text ?? (typeof anyChunk?.content === "string" ? anyChunk.content : Array.isArray(anyChunk?.content) ? anyChunk.content.map((c: any) => (typeof c?.text === "string" ? c.text : "")).join("") : "");
            if (text) e.sender.send(NATIVE_API_GENERATE_PROMPT, "chunk", text);
        }
        e.sender.send(NATIVE_API_GENERATE_PROMPT, "complete");
    } catch (err) {
        e.sender.send(NATIVE_API_GENERATE_PROMPT, "error", err.toString());
    }
}

export default generatePrompt;