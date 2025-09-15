import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import path from "node:path";
function makeSafeEnv(env) {
    return Object.fromEntries(Object.entries(env).filter(([_, v]) => typeof v === "string"));
}
function printTextContent(label, result, max = 800) {
    console.log(`→ ${label}:`);
    if (result &&
        typeof result === "object" &&
        "content" in result &&
        Array.isArray(result.content)) {
        for (const c of result.content) {
            if (c && typeof c === "object" && c.type === "text" && typeof c.text === "string") {
                console.log(c.text.slice(0, max));
            }
        }
    }
    else {
        console.log(JSON.stringify(result, null, 2));
    }
}
async function main() {
    const projectRoot = process.cwd();
    const serverEntryJs = path.join(projectRoot, "build", "index.js");
    const transport = new StdioClientTransport({
        command: process.execPath,
        args: [serverEntryJs],
        cwd: projectRoot,
        env: makeSafeEnv(process.env),
    });
    const client = new Client({ name: "test-client", version: "0.1.0" });
    await client.connect(transport);
    console.log("initialize OK");
    const list = await client.listTools();
    console.log("tools/list:", list.tools.map(t => t.name));
    try {
        const alerts = await client.callTool({
            name: "get_alerts",
            arguments: { state: "NY" },
        });
        console.log("ALERTAS NO ESTADO DE NOVA YORK: ");
        printTextContent("get_alerts(Nova York)", alerts);
    }
    catch (e) {
        console.error("get_alerts error:", e);
    }
    try {
        const forecast = await client.callTool({
            name: "get_forecast",
            arguments: { latitude: 40.7128, longitude: -74.0060 }
        });
        console.log("CLIMA NA CIDADE DE NOVA YORK:");
        printTextContent("get_forecast(Cidade de Nova York)", forecast);
    }
    catch (e) {
        console.error("get_forecast error:", e);
    }
    for (const tool of list.tools) {
        console.log("─────────────────────────────");
        console.log("Nome:", tool.name);
        console.log("Descrição:", tool.description);
        console.log("Schema:", JSON.stringify(tool.inputSchema, null, 2));
    }
    const listTools = await client.listTools();
    console.log("tools/list (RAW):", JSON.stringify(listTools, null, 2));
    await client.close();
}
main().catch(err => {
    console.error("test client failed:", err);
    process.exit(1);
});
