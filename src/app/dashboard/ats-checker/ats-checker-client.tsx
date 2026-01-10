"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { optimizeResumeATS, type OptimizeResumeATSOutput } from "@/ai/flows/optimize-resume-ats";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Bot, Loader2 } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const formSchema = z.object({
  resumeText: z.string().min(100, { message: "Resume text must be at least 100 characters." }),
  jobDescription: z.string().min(50, { message: "Job description must be at least 50 characters." }),
});

export function AtsCheckerClient() {
  const [analysisResult, setAnalysisResult] = useState<OptimizeResumeATSOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      resumeText: "",
      jobDescription: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setAnalysisResult(null);
    try {
      const result = await optimizeResumeATS(values);
      setAnalysisResult(result);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error Analyzing Document",
        description: "There was an issue analyzing your document. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>ATS Optimization Engine</CardTitle>
          <CardDescription>Paste your resume and a job description to get an ATS-compliance score and optimization suggestions.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="resumeText"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Resume Text</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Paste the full text of your resume here..." className="min-h-[300px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="jobDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Target Job Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Paste the target job description here..." className="min-h-[300px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...</>
                ) : (
                  <><Bot className="mr-2 h-4 w-4" /> Analyze with AI</>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {analysisResult && (
        <Card>
          <CardHeader>
            <CardTitle>Analysis Results</CardTitle>
            <CardDescription>Here's how your resume stacks up against the job description.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold">ATS Compliance Score</h4>
                <span className="text-2xl font-bold text-primary">{analysisResult.atsComplianceScore}%</span>
              </div>
              <Progress value={analysisResult.atsComplianceScore} />
            </div>

            <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Overall Suggestions</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground">{analysisResult.suggestions}</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Missing Keywords ({analysisResult.missingKeywords.length})</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-wrap gap-2">
                    {analysisResult.missingKeywords.map(keyword => (
                      <Badge key={keyword} variant="destructive">{keyword}</Badge>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Suggested Skills ({analysisResult.suggestedSkills.length})</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-wrap gap-2">
                    {analysisResult.suggestedSkills.map(skill => (
                      <Badge key={skill} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
