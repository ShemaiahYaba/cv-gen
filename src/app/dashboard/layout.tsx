"use client";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/providers/auth-provider";
import { authService } from "@/services/auth.service";
import { Form2CVLogo } from "@/components/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

// Helper function to generate avatar URL from seed
const getAvatarUrl = (seed: string) => {
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
    seed
  )}`;
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuthContext();
  const router = useRouter();
  const avatarSeed = user?.user_metadata?.avatarSeed || user?.email || "user";

  const handleLogout = async () => {
    try {
      await authService.signOut();
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex h-16 items-center justify-between gap-4 border-b bg-card px-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Form2CVLogo className="size-7 text-primary" />
          <span className="font-headline text-lg font-semibold">Form2CV</span>
        </Link>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-col items-end">
            <p className="text-sm font-medium leading-none">
              {user?.user_metadata?.full_name ||
                user?.email?.split("@")[0] ||
                "User"}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email || ""}
            </p>
          </div>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Avatar>
              <AvatarImage
                src={getAvatarUrl(avatarSeed)}
                alt="User avatar"
                data-ai-hint="person face"
              />
              <AvatarFallback>
                {user?.email?.[0]?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            <span>Log out</span>
          </Button>
        </div>
      </header>
      <main className="flex-1 flex-col bg-background p-4 md:p-8">
        {children}
      </main>
    </div>
  );
}
