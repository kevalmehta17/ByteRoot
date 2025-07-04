
'use server';
/**
 * @fileOverview AI-powered drug interaction checker.
 *
 * - checkDrugInteractions - A function that checks for interactions between a list of medicines.
 * - DrugInteractionInput - The input type for the checkDrugInteractions function.
 * - DrugInteractionOutput - The return type for the checkDrugInteractions function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const DrugInteractionInputSchema = z.object({
    medicines: z
        .array(z.string().min(1, { message: "Medicine name cannot be empty." }))
        .min(2, { message: "At least two medicines are required." })
        .max(3, { message: "Up to three medicines can be checked at a time." })
        .describe('A list of 2 to 3 medicine names to check for interactions.'),
});
export type DrugInteractionInput = z.infer<typeof DrugInteractionInputSchema>;

const DrugInteractionOutputSchema = z.object({
    interactionDetails: z
        .string()
        .describe(
            'A detailed description of potential interactions, mechanisms, risks, and advice. If no significant interactions are found, this should state so clearly.'
        ),
    isRisky: z
        .boolean()
        .describe(
            'True if any significant or potentially harmful interaction is detected, false otherwise.'
        ),
    summary: z
        .string()
        .describe('A short summary of the interaction findings.')
});
export type DrugInteractionOutput = z.infer<typeof DrugInteractionOutputSchema>;

export async function checkDrugInteractions(
    input: DrugInteractionInput
): Promise<DrugInteractionOutput> {
    return drugInteractionFlow(input);
}

const drugInteractionPrompt = ai.definePrompt({
    name: 'drugInteractionPrompt',
    input: { schema: DrugInteractionInputSchema },
    output: { schema: DrugInteractionOutputSchema },
    prompt: `You are an expert AI pharmacologist specializing in drug interactions.
  The user will provide a list of 2 to 3 medicine names. Your task is to:
  1. Identify potential interactions between these medicines.
  2. Determine if any interactions are risky (moderate to major severity). Set 'isRisky' to true if so, otherwise false.
  3. Provide a concise 'summary' of the findings (e.g., "Significant interaction found between Drug A and Drug B." or "No major interactions detected.").
  4. Provide 'interactionDetails':
     - If interactions are found: Explain the nature of each interaction (e.g., pharmacokinetic, pharmacodynamic), the potential risks or adverse effects, and general advice (e.g., "This combination may increase the risk of bleeding. Consult your doctor or pharmacist before using these medications together.").
     - If no significant interactions are found: State this clearly, for example, "Based on available information, no significant interactions were detected between the listed medications. However, always consult your healthcare provider for personalized advice."
  5. CRITICAL: Always include the following disclaimer at the end of the 'interactionDetails': "Disclaimer: This information is AI-generated and for informational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition or medications. Never disregard professional medical advice or delay in seeking it because of something you have read here."

  Medicines to check:
  {{#each medicines}}
  - {{{this}}}
  {{/each}}
  `,
    config: {
        safetySettings: [
            {
                category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
                threshold: 'BLOCK_ONLY_HIGH', // Allow discussion of drug risks for informational purposes
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

const drugInteractionFlow = ai.defineFlow(
    {
        name: 'drugInteractionFlow',
        inputSchema: DrugInteractionInputSchema,
        outputSchema: DrugInteractionOutputSchema,
    },
    async (input: DrugInteractionInput) => {
        // Filter out empty strings from medicines array, though Zod schema should catch this
        const validMedicines = input.medicines.filter(name => name.trim() !== '');
        if (validMedicines.length < 2) {
            return {
                interactionDetails: "At least two valid medicine names are required to check for interactions. Disclaimer: This information is AI-generated and for informational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition or medications. Never disregard professional medical advice or delay in seeking it because of something you have read here.",
                isRisky: false,
                summary: "Input error: Insufficient medicines provided."
            };
        }

        const { output } = await drugInteractionPrompt({ medicines: validMedicines });
        return output!;
    }
);
