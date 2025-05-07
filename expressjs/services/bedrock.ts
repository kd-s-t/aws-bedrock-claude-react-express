import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";

// Create the Bedrock client using V3 idiomatic style
export const bedrockClient = new BedrockRuntimeClient({
    region: process.env.AWS_REGION
});

// Helper to invoke the Claude model
export async function invokeClaude(prompt: string): Promise<string> {
    const payload = {
        prompt: `\n\nHuman: ${prompt}\n\nAssistant:`,
        max_tokens_to_sample: 200,
        temperature: 0.5
    };

    const input = {
        modelId: "anthropic.claude-3-opus-20240229-v1:0",
        contentType: "application/json",
        accept: "application/json",
        body: JSON.stringify(payload)
    };

    const command = new InvokeModelCommand(input);
    const response = await bedrockClient.send(command);
    const responseBody = JSON.parse(new TextDecoder().decode(response.body));

    return responseBody.completion;
}
