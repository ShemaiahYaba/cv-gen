import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AnimatedShapes } from '@/components/landing/AnimatedShapes';
import { VitaeForgeLogo } from '@/components/icons';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="relative flex flex-col min-h-screen w-full overflow-hidden">
      <header className="absolute top-0 left-0 w-full p-4 sm:p-6 z-10">
        <div className="flex items-center gap-2">
          <VitaeForgeLogo className="h-8 w-8 text-primary" />
          <span className="font-headline text-xl font-bold">Vitae Forge</span>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center text-center p-4 z-10">
        <div className="flex flex-col items-center gap-6 max-w-2xl">
          <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            Forge Your Future, One Perfect CV at a Time.
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-xl">
            Vitae Forge helps you create stunning, professional CVs tailored for students and job seekers. Stand out from the crowd and land your dream job.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Button asChild size="lg" className="font-semibold">
              <Link href="/auth/sign-up">
                Start Building for Free
                <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="font-semibold">
              <Link href="/auth/sign-in">
                Sign In
              </Link>
            </Button>
          </div>
        </div>
      </main>

      <AnimatedShapes />

      <footer className="w-full p-4 sm:p-6 text-center text-sm text-muted-foreground z-10">
        © {new Date().getFullYear()} Vitae Forge. All rights reserved.
      </footer>
    </div>
  );
}
