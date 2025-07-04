
import { config } from 'dotenv';
config();

import '@/ai/flows/image-based-diagnosis';
import '@/ai/flows/report-translator.ts';
import '@/ai/flows/report-simplifier.ts';
import '@/ai/flows/symptom-based-advice';
import '@/ai/flows/emergency-assistance';
import '@/ai/flows/drug-interaction-checker.ts'; // Added new flow

