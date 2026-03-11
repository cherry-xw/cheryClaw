import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const configContent = `export default {
  openai: {
    apiKey: "your-api-key-here",
    baseUrl: "https://api.openai.com/v1", // 可替换为其他兼容接口
    model: "gpt-3.5-turbo",
  },
};
`;

const configPath = join(__dirname, "config.ts");
writeFileSync(configPath, configContent);
