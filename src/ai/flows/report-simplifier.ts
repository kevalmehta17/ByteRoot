"use server";

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SimplifyReportInputSchema = z.object({
    reportText: z
        .string()
        .describe('The complete text of the medical report to simplify.'),
    language: z
        .string()
        .optional()
        .default('English')
        .describe('The language to translate the report to.'),
});
export type SimplifyReportInput = z.infer<typeof SimplifyReportInputSchema>;

const SimplifyReportOutputSchema = z.object({
    summary: z.string().describe('A simplified summary of the medical report.'),
    translation: z
        .string()
        .optional()
        .describe('The translated summary of the medical report.'),
});
export type SimplifyReportOutput = z.infer<typeof SimplifyReportOutputSchema>;

export async function simplifyReport(input: SimplifyReportInput): Promise<SimplifyReportOutput> {
    return simplifyReportFlow(input);
}

const simplifyReportPrompt = ai.definePrompt({
    name: 'simplifyReportPrompt',
    input: { schema: SimplifyReportInputSchema },
    output: { schema: SimplifyReportOutputSchema },
    prompt: `You are a medical expert who can simplify complex medical reports for patients to easily understand. Explain in simple terms with suggestions.

  Please provide a simplified brief of the following medical report.  Then, translate it to {{language}}.

  Medical Report:
  {{reportText}}`,
});

const simplifyReportFlow = ai.defineFlow(
    {
        name: 'simplifyReportFlow',
        inputSchema: SimplifyReportInputSchema,
        outputSchema: SimplifyReportOutputSchema,
    },
    async input => {
        const { output } = await simplifyReportPrompt(input);
        return output!;
    }
);
