import Link from "next/link";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, BookUser, Briefcase } from "lucide-react";

export default function OnboardingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl font-bold">Let's Get Started</h1>
        <p className="text-muted-foreground text-lg mt-2">
          First, tell us a bit about yourself to personalize your experience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        <Link href="/onboarding/student">
          <Card className="group hover:border-primary transition-all duration-300 hover:shadow-xl">
            <CardHeader className="flex flex-col items-center text-center gap-4 p-8">
              <div className="bg-primary text-primary-foreground rounded-full p-4 group-hover:scale-110 transition-transform">
                <BookUser className="h-10 w-10" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-2xl font-headline">I am a Student</CardTitle>
                <CardDescription className="mt-2 text-base">
                  Create skill-based or academic CVs perfect for internships and first jobs.
                </CardDescription>
              </div>
              <ArrowRight className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
            </CardHeader>
          </Card>
        </Link>
        <Link href="/onboarding/job-seeker">
          <Card className="group hover:border-primary transition-all duration-300 hover:shadow-xl">
            <CardHeader className="flex flex-col items-center text-center gap-4 p-8">
              <div className="bg-primary text-primary-foreground rounded-full p-4 group-hover:scale-110 transition-transform">
                <Briefcase className="h-10 w-10" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-2xl font-headline">I am a Job Seeker</CardTitle>
                <CardDescription className="mt-2 text-base">
                  Build professional, ATS-friendly CVs to advance your career.
                </CardDescription>
              </div>
              <ArrowRight className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
            </CardHeader>
          </Card>
        </Link>
      </div>
    </div>
  );
}
