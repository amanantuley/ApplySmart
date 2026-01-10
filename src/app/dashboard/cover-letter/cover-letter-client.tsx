"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { generateCoverLetter, type GenerateCoverLetterInput } from "@/ai/flows/generate-cover-letter";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { Bot, Clipboard, Download, Loader2 } from "lucide-react";

const formSchema = z.object({
  jobRole: z.string().min(2, { message: "Job role must be at least 2 characters." }),
  companyName: z.string().min(2, { message: "Company name must be at least 2 characters." }),
  jobDescription: z.string().min(50, { message: "Job description must be at least 50 characters." }),
  tone: z.enum(["Formal", "Conversational", "Technical"]),
});

export function CoverLetterClient() {
  const [generatedLetter, setGeneratedLetter] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobRole: "",
      companyName: "",
      jobDescription: "",
      tone: "Formal",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setGeneratedLetter("");
    try {
      const result = await generateCoverLetter(values as GenerateCoverLetterInput);
      setGeneratedLetter(result.coverLetter);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error Generating Letter",
        description: "There was an issue generating your cover letter. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }
  
  const handleCopy = () => {
    navigator.clipboard.writeText(generatedLetter);
    toast({ title: "Copied to clipboard!" });
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 h-full">
      <Card>
        <CardHeader>
          <CardTitle>Cover Letter Details</CardTitle>
          <CardDescription>Provide the details for your application.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="jobRole"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Role</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Senior Product Manager" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Google" {...field} />
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
                    <FormLabel>Job Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Paste the job description here..." className="min-h-[150px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tone of Voice</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a tone" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Formal">Formal</SelectItem>
                        <SelectItem value="Conversational">Conversational</SelectItem>
                        <SelectItem value="Technical">Technical</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</>
                ) : (
                  <><Bot className="mr-2 h-4 w-4" /> Generate with AI</>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <Card className="flex flex-col">
        <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
                <CardTitle>Generated Cover Letter</CardTitle>
                <CardDescription>Review, edit, and copy your AI-generated letter.</CardDescription>
            </div>
            {generatedLetter && (
                <div className="ml-auto flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={handleCopy}>
                        <Clipboard className="h-4 w-4" />
                        <span className="sr-only">Copy</span>
                    </Button>
                    <Button variant="outline" size="icon">
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Download</span>
                    </Button>
                </div>
            )}
        </CardHeader>
        <CardContent className="flex-1">
          <ScrollArea className="h-full">
            <Textarea
              className="w-full h-full min-h-[500px] bg-background"
              placeholder="Your generated cover letter will appear here..."
              value={generatedLetter}
              onChange={(e) => setGeneratedLetter(e.target.value)}
              readOnly={!generatedLetter}
            />
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
