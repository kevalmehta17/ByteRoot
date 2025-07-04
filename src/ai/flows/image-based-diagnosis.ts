
'use server';



import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ImageBasedDiagnosisInputSchema = z.object({
    fileDataUri: z
        .string()
        .describe(
            'A medical image or PDF document, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.'
        ),
});
export type ImageBasedDiagnosisInput = z.infer<typeof ImageBasedDiagnosisInputSchema>;

const ImageBasedDiagnosisOutputSchema = z.object({
    diagnosis: z.string().describe('A preliminary diagnosis or interpretation based on the file content.'),
    recommendations: z
        .string()
        .describe('Recommendations for next steps or solutions based on the analysis.'),
});
export type ImageBasedDiagnosisOutput = z.infer<typeof ImageBasedDiagnosisOutputSchema>;

export async function imageBasedDiagnosis(
    input: ImageBasedDiagnosisInput
): Promise<ImageBasedDiagnosisOutput> {
    return imageBasedDiagnosisFlow(input);
}

const imageBasedDiagnosisPrompt = ai.definePrompt({
    name: 'imageBasedDiagnosisPrompt',
    input: { schema: ImageBasedDiagnosisInputSchema },
    output: { schema: ImageBasedDiagnosisOutputSchema },
    prompt: `You are a medical AI assistant. Your task is to analyze the provided medical file, which could be an image (like an X-ray, CT scan) or a text-based document (like a PDF lab report).

  Based on the content of the file:
  1. Identify the type of file if possible (e.g., X-ray, lab report from PDF).
  2. If it's an image, analyze the visual information.
  3. If it's a document (like a PDF), extract and analyze the textual information. Focus on identifying key medical data, abnormal values, and overall findings.
  4. Provide a detailed preliminary diagnosis (if an image) or a clear interpretation of the findings (if a document/report). Explain any identified problems in simple terms.
  5. Offer comprehensive recommendations for next steps, potential solutions, lifestyle advice if relevant, or specific questions the user might ask their doctor.

  File: {{media url=fileDataUri}}
  `,
});

const imageBasedDiagnosisFlow = ai.defineFlow(
    {
        name: 'imageBasedDiagnosisFlow',
        inputSchema: ImageBasedDiagnosisInputSchema,
        outputSchema: ImageBasedDiagnosisOutputSchema,
    },
    async input => {
        const { output } = await imageBasedDiagnosisPrompt(input);
        return output!;
    }
);
