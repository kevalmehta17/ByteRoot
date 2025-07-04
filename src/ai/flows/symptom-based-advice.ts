'use server';


import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SymptomBasedAdviceInputSchema = z.object({
    symptoms: z
        .string()
        .describe('A detailed description of the symptoms experienced by the user.'),
});
export type SymptomBasedAdviceInput = z.infer<typeof SymptomBasedAdviceInputSchema>;

const SymptomBasedAdviceOutputSchema = z.object({
    safetyMeasures: z
        .string()
        .describe('AI-generated suggestions for basic safety measures to take.'),
    nextSteps: z
        .string()
        .describe('AI-generated suggestions for the next steps the user should take, such as seeking medical attention.'),
});
export type SymptomBasedAdviceOutput = z.infer<typeof SymptomBasedAdviceOutputSchema>;

export async function getSymptomBasedAdvice(
    input: SymptomBasedAdviceInput
): Promise<SymptomBasedAdviceOutput> {
    return symptomBasedAdviceFlow(input);
}

const symptomBasedAdvicePrompt = ai.definePrompt({
    name: 'symptomBasedAdvicePrompt',
    input: { schema: SymptomBasedAdviceInputSchema },
    output: { schema: SymptomBasedAdviceOutputSchema },
    prompt: `You are an AI health assistant. Given a user's symptoms, follow these steps:

1. Try to match the symptoms to one or more **possible illnesses** based on known conditions (e.g., malaria, dengue, flu, food poisoning). Mention the **most likely condition**, but state clearly that it is only a suggestion and not a diagnosis.
2. Then suggest safety measures the user can take.
3. Then list next steps (e.g., visit doctor, emergency care).
4. End with this disclaimer:

"Disclaimer: This is AI-generated advice for informational purposes only. It is not a substitute for professional medical diagnosis. Always consult a healthcare provider."

Symptoms provided:
{{{symptoms}}}
`,
});

const symptomBasedAdviceFlow = ai.defineFlow(
    {
        name: 'symptomBasedAdviceFlow',
        inputSchema: SymptomBasedAdviceInputSchema,
        outputSchema: SymptomBasedAdviceOutputSchema,
    },
    async (input) => {
        const { output } = await symptomBasedAdvicePrompt(input);
        return output!;
    }
);
