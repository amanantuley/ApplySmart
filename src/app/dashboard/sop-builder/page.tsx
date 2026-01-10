import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookMarked } from "lucide-react";

export default function SopBuilderPage() {
  return (
    <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
      <div className="flex flex-col items-center gap-4 text-center">
        <BookMarked className="h-16 w-16 text-muted-foreground" />
        <h3 className="text-2xl font-bold tracking-tight font-headline">Statement of Purpose Builder</h3>
        <p className="text-sm text-muted-foreground max-w-md">
          Craft a compelling Statement of Purpose with our guided builder. Sections, word count control, and suggestions are on the way.
        </p>
        <Button className="mt-4">Start Writing</Button>
      </div>
    </div>
  );
}
