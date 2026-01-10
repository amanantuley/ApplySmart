import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
       <Card>
        <CardHeader>
            <CardTitle>Settings</CardTitle>
            <CardDescription>Manage your account settings, preferences, and subscription.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm p-12">
                <div className="flex flex-col items-center gap-4 text-center">
                    <Settings className="h-16 w-16 text-muted-foreground" />
                    <h3 className="text-2xl font-bold tracking-tight font-headline">Under Construction</h3>
                    <p className="text-sm text-muted-foreground max-w-md">
                        We're working on bringing you a comprehensive settings page to manage your profile, preferences, and more.
                    </p>
                </div>
            </div>
        </CardContent>
       </Card>
    </div>
  );
}
