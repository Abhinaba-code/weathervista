'use server';

/**
 * @fileOverview Processes weather alerts for a given location and summarizes them.
 *
 * - processWeatherAlerts - A function that processes weather alerts and returns a summary.
 * - ProcessWeatherAlertsInput - The input type for the processWeatherAlerts function.
 * - ProcessWeatherAlertsOutput - The return type for the processWeatherAlerts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProcessWeatherAlertsInputSchema = z.object({
  location: z.string().describe('The location to fetch weather alerts for.'),
  alerts: z.array(z.any()).describe('An array of weather alerts for the location.'),
});
export type ProcessWeatherAlertsInput = z.infer<typeof ProcessWeatherAlertsInputSchema>;

const ProcessWeatherAlertsOutputSchema = z.object({
  summary: z.string().describe('A clear and concise summary of the weather alerts.'),
});
export type ProcessWeatherAlertsOutput = z.infer<typeof ProcessWeatherAlertsOutputSchema>;

export async function processWeatherAlerts(
  input: ProcessWeatherAlertsInput
): Promise<ProcessWeatherAlertsOutput> {
  return processWeatherAlertsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'processWeatherAlertsPrompt',
  input: {schema: ProcessWeatherAlertsInputSchema},
  output: {schema: ProcessWeatherAlertsOutputSchema},
  prompt: `You are a weather expert. You will receive weather alerts for a specific location. Your task is to summarize these alerts in a clear and concise manner, so that users can quickly understand any potential risks.

Location: {{{location}}}

Weather Alerts:
{{#each alerts}}
  - {{{this}}}
{{/each}}

Summary:`,
});

const processWeatherAlertsFlow = ai.defineFlow(
  {
    name: 'processWeatherAlertsFlow',
    inputSchema: ProcessWeatherAlertsInputSchema,
    outputSchema: ProcessWeatherAlertsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
