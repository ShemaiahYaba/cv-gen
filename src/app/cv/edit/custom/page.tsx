import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { VitaeForgeLogo } from "@/components/icons";

export default function CustomCvEditorPage() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center text-center p-4">
        <VitaeForgeLogo className="h-16 w-16 mb-4 text-primary" />
        <h1 className="font-headline text-4xl font-bold mb-2">Custom CV Editor</h1>
        <p className="text-muted-foreground text-lg mb-8">This feature is coming soon!</p>
        <Button asChild>
            <Link href="/dashboard">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
            </Link>
        </Button>
    </div>
  );
}
