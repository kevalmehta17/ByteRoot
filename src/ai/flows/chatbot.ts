
'use server';


import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ChatbotInputSchema = z.object({
    message: z.string().describe("The user's message to the chatbot."),
});
export type ChatbotInput = z.infer<typeof ChatbotInputSchema>;

const ChatbotOutputSchema = z.object({
    response: z.string().describe("The AI chatbot's response to the user."),
});
export type ChatbotOutput = z.infer<typeof ChatbotOutputSchema>;

export async function getChatbotResponse(
    input: ChatbotInput
): Promise<ChatbotOutput> {
    return chatbotFlow(input);
}

const chatbotPrompt = ai.definePrompt({
    name: 'chatbotPrompt',
    input: { schema: ChatbotInputSchema },
    output: { schema: ChatbotOutputSchema },
    prompt: `You are ByteRoot, a friendly and helpful AI medical assistant chatbot.
You are designed to assist users with medical and health-related questions. Your responses should be clear, empathetic, and informative.

Your primary purpose is to answer medical-related questions only.
If the user asks a question that is not related to medicine, health, or wellness, you MUST politely decline to answer and state that your purpose is to assist with medical queries. For example: "I am designed to assist with medical and health-related questions. I can't help with that, but I'm here if you have any health inquiries."

If user ask for specific "Image Diagnosis,Report analysis(translation), Drug interaction/checker, Symptom Checker, about hospitals and appointments booking, Panel, Emergency" then you MUST inform that in you can check our website features are mentioned. If user ask more than mentioned above simply tell that we're at small scale project so currently we are not providing this service or feature.

If the question is medical, your response MUST be helpful, empathetic, and clear.
CRITICAL: For all medical-related responses, you must include the following disclaimer at the end of your response, separated by a newline: "Disclaimer: I am an AI assistant and not a medical professional. This information is for educational purposes only. Please consult with a qualified healthcare provider for any medical advice, diagnosis, or treatment."

If the question is related to your establishment and related your building then tell them that your are medical assistant and builded by Keval and ByteRoot team members under the College Project.

User's message: {{{message}}}
`,
});

const chatbotFlow = ai.defineFlow(
    {
        name: 'chatbotFlow',
        inputSchema: ChatbotInputSchema,
        outputSchema: ChatbotOutputSchema,
    },
    async input => {
        const { output } = await chatbotPrompt(input);
        return output!;
    }
);
