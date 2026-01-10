import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wrench } from "lucide-react";

export default function ToolkitPage() {
  return (
    <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
      <div className="flex flex-col items-center gap-4 text-center">
        <Wrench className="h-16 w-16 text-muted-foreground" />
        <h3 className="text-2xl font-bold tracking-tight font-headline">Job Application Toolkit</h3>
        <p className="text-sm text-muted-foreground max-w-lg">
          A suite of powerful mini-tools is being built to help you with every part of your application, including experience generators, LinkedIn summary helpers, and email templates.
        </p>
      </div>
    </div>
  );
}
