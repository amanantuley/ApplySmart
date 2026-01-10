import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

export default function ResumeBuilderPage() {
  return (
    <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
      <div className="flex flex-col items-center gap-4 text-center">
        <FileText className="h-16 w-16 text-muted-foreground" />
        <h3 className="text-2xl font-bold tracking-tight font-headline">Resume Builder</h3>
        <p className="text-sm text-muted-foreground max-w-md">
          This is where the magic happens. A step-by-step wizard will guide you through creating a professional, ATS-friendly resume. Coming soon!
        </p>
        <Button className="mt-4">Start Building</Button>
      </div>
    </div>
  );
}
