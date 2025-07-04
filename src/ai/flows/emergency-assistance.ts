
'use server';
/**
 * @fileOverview A Genkit flow to provide preliminary, non-diagnostic advice based on an emergency description and/or image.
 *
 * - getEmergencyAssistance - A function that takes an emergency description and/or image data URI and returns very basic, preliminary advice.
 * - EmergencyAssistanceInput - The input type for the getEmergencyAssistance function.
 * - EmergencyAssistanceOutput - The return type for the getEmergencyAssistance function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const EmergencyAssistanceInputSchema = z.object({
    emergencyDescription: z.string().optional().describe('A textual description of the emergency situation.'),
    imageDataUri: z.string().optional().describe(
        "An optional image of the emergency situation, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type EmergencyAssistanceInput = z.infer<typeof EmergencyAssistanceInputSchema>;

const EmergencyAssistanceOutputSchema = z.object({
    preliminaryAdvice: z
        .string()
        .describe('Very basic, non-diagnostic, preliminary advice or observations based on the provided information. This advice must strongly emphasize that it is not a substitute for professional medical help and that immediate professional assistance should be awaited/contacted.'),
});
export type EmergencyAssistanceOutput = z.infer<typeof EmergencyAssistanceOutputSchema>;

export async function getEmergencyAssistance(
    input: EmergencyAssistanceInput
): Promise<EmergencyAssistanceOutput> {
    return emergencyAssistanceFlow(input);
}

const emergencyAssistancePrompt = ai.definePrompt({
    name: 'emergencyAssistancePrompt',
    input: { schema: EmergencyAssistanceInputSchema },
    output: { schema: EmergencyAssistanceOutputSchema },
    prompt: `You are an AI assistant providing very basic, preliminary, non-diagnostic information in a potential emergency. Your response MUST NOT be a medical diagnosis or specific treatment instruction.

  First, you MUST determine if the user's input is a genuine medical emergency.
  - If the user's 'emergencyDescription' is clearly NOT a medical emergency (e.g., asking for homework help, telling a joke, general conversation), your response for 'preliminaryAdvice' MUST be: "This service is intended for medical emergencies only. Please do not use it for non-medical questions. If you are facing a medical emergency, please provide relevant details."
  - If the input appears to be a genuine medical emergency, then you MUST follow the instructions below.

  Your primary goal is to offer simple, cautious observations or general safety reminders while emphasizing that professional medical help is critical and must be awaited or contacted immediately.

  Analyze the following information:
  {{#if emergencyDescription}}Description: {{{emergencyDescription}}}{{/if}}
  {{#if imageDataUri}}Image: {{media url=imageDataUri}}{{/if}}

  Based on this, provide brief, general, preliminary advice.
  Examples of appropriate advice:
  - If bleeding is described or visible: "If there is active bleeding, try to apply firm, direct pressure to the area using a clean cloth or dressing if available. Keep the person calm. Professional medical help should be contacted or is on its way."
  - If breathing difficulty is described: "Try to ensure the person is in a comfortable position, often sitting upright can help. Ensure their airway is clear. Remain calm. Professional medical help should be contacted or is on its way."
  - If a fall is described: "Try to keep the person still and comfortable, avoiding unnecessary movement, especially if there's pain in the neck or back. Reassure them. Professional medical help should be contacted or is on its way."
  - If no specific details are actionable: "The most important thing is to ensure the person is as safe as possible until professional help arrives. Try to stay calm and monitor the person. Professional medical help should be contacted or is on its way."

  If the query was medical, your response MUST end with: "This is NOT a medical diagnosis or treatment plan. Await immediate professional medical assistance or ensure they have been contacted."
  Do not offer any specific medical treatments, drug suggestions, or definitive diagnoses. Keep your advice extremely general and focused on immediate safety and the need for professional help.
  `,
    config: {
        safetySettings: [
            {
                category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
                threshold: 'BLOCK_ONLY_HIGH', // Allow some discussion of potentially dangerous situations for advice.
            },
            {
                category: 'HARM_CATEGORY_HARASSMENT',
                threshold: 'BLOCK_MEDIUM_AND_ABOVE',
            },
            {
                category: 'HARM_CATEGORY_HATE_SPEECH',
                threshold: 'BLOCK_MEDIUM_AND_ABOVE',
            },
            {
                category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
                threshold: 'BLOCK_MEDIUM_AND_ABOVE',
            },
        ]
    }
});

const emergencyAssistanceFlow = ai.defineFlow(
    {
        name: 'emergencyAssistanceFlow',
        inputSchema: EmergencyAssistanceInputSchema,
        outputSchema: EmergencyAssistanceOutputSchema,
    },
    async input => {
        if (!input.emergencyDescription && !input.imageDataUri) {
            return { preliminaryAdvice: "No specific details provided. Ensure the person is safe and await professional medical assistance or ensure they have been contacted. This is NOT a medical diagnosis or treatment plan." };
        }
        const { output } = await emergencyAssistancePrompt(input);
        return output!;
    }
);
