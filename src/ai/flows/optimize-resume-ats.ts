'use server';

/**
 * @fileOverview This file defines a Genkit flow for optimizing a resume for Applicant Tracking Systems (ATS).
 *
 * It provides functionalities to analyze job descriptions, identify missing keywords,
 * suggest skill improvements, and evaluate ATS compliance.
 *
 * - optimizeResumeATS - A function that handles the resume optimization process.
 * - OptimizeResumeATSInput - The input type for the optimizeResumeATS function.
 * - OptimizeResumeATSOutput - The return type for the optimizeResumeATS function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define the input schema for the OptimizeResumeATS flow
const OptimizeResumeATSInputSchema = z.object({
  resumeText: z
    .string()
    .describe('The text content of the resume to be optimized.'),
  jobDescription: z
    .string()
    .describe('The job description for which the resume is being optimized.'),
});
export type OptimizeResumeATSInput = z.infer<typeof OptimizeResumeATSInputSchema>;

// Define the output schema for the OptimizeResumeATS flow
const OptimizeResumeATSOutputSchema = z.object({
  missingKeywords: z
    .array(z.string())
    .describe('Keywords from the job description that are missing in the resume.'),
  suggestedSkills: z
    .array(z.string())
    .describe('Skills suggested to improve the resume based on the job description.'),
  atsComplianceScore: z
    .number()
    .describe('A score from 0-100 indicating the resume ATS compliance.'),
  suggestions: z
    .string()
    .describe('Overall suggestions on how to improve the resume for ATS.'),
});
export type OptimizeResumeATSOutput = z.infer<typeof OptimizeResumeATSOutputSchema>;

// Exported function to initiate the resume optimization process
export async function optimizeResumeATS(
  input: OptimizeResumeATSInput
): Promise<OptimizeResumeATSOutput> {
  return optimizeResumeATSFlow(input);
}

// Define the prompt for the LLM
const optimizeResumeATSPrompt = ai.definePrompt({
  name: 'optimizeResumeATSPrompt',
  input: {schema: OptimizeResumeATSInputSchema},
  output: {schema: OptimizeResumeATSOutputSchema},
  prompt: `You are an expert in Applicant Tracking Systems (ATS) and resume optimization.

  Analyze the provided resume and job description to identify areas for improvement.
  Specifically, identify missing keywords from the job description that are not present in the resume.
  Suggest skills that could be added to the resume to better match the job description.
  Evaluate the resume's ATS compliance based on factors like font safety, section order, and keyword density, and provide a score from 0-100.
  Also generate a list of overall suggestions to improve the resume for ATS.

  Resume:
  {{resumeText}}

  Job Description:
  {{jobDescription}}`,
});

// Define the Genkit flow for optimizing the resume
const optimizeResumeATSFlow = ai.defineFlow(
  {
    name: 'optimizeResumeATSFlow',
    inputSchema: OptimizeResumeATSInputSchema,
    outputSchema: OptimizeResumeATSOutputSchema,
  },
  async input => {
    const {output} = await optimizeResumeATSPrompt(input);
    return output!;
  }
);
