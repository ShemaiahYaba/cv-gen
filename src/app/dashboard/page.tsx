// src/app/dashboard/page.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircle, LayoutGrid, Loader2 } from "lucide-react";
import { useUserCvs } from "@/hooks/use-cv";
import { CvCard } from "@/components/dashboard/cv-card";

export default function DashboardPage() {
  const { data: cvs, isLoading, error } = useUserCvs("updated_at");

  if (isLoading) {
    return (
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="font-headline text-3xl font-bold">Welcome back</h1>
            <p className="text-muted-foreground">Here are your recent CVs.</p>
          </div>
        </div>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="font-headline text-3xl font-bold">Welcome back</h1>
            <p className="text-muted-foreground">Here are your recent CVs.</p>
          </div>
        </div>
        <div className="text-center py-12">
          <p className="text-destructive">
            Failed to load CVs. Please try again.
          </p>
        </div>
      </div>
    );
  }

  const hasCvs = cvs && cvs.length > 0;

  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="font-headline text-3xl font-bold">Welcome back</h1>
            <p className="text-muted-foreground">Here are your recent CVs.</p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <Button variant="outline" asChild className="w-full sm:w-auto">
              <Link href="/templates">
                <LayoutGrid className="mr-2 h-4 w-4" /> Browse Templates
              </Link>
            </Button>
            <Button className="w-full sm:w-auto" asChild>
              <Link href="/onboarding" className="flex items-center">
                <PlusCircle className="mr-2 h-4 w-4" /> Create New CV
              </Link>
            </Button>
          </div>
        </div>

        {!hasCvs ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="bg-muted rounded-full p-6 mb-4">
              <LayoutGrid className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="font-headline text-xl font-semibold mb-2">
              No CVs yet
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              Create your first CV to get started building your professional
              resume.
            </p>
            <Button asChild>
              <Link href="/onboarding" className="flex items-center">
                <PlusCircle className="mr-2 h-4 w-4" /> Create Your First CV
              </Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {cvs.map((cv) => (
              <CvCard key={cv.id} cv={cv} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
