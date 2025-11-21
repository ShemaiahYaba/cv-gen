"use client"
import Link from "next/link"
import {
  Home,
  FileText,
  PlusCircle,
  Settings,
  User,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { VitaeForgeLogo } from "@/components/icons"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <div className="flex flex-col min-h-screen">
            <header className="flex h-16 items-center gap-4 border-b bg-card px-6">
                <Link href="/dashboard" className="flex items-center gap-2">
                    <VitaeForgeLogo className="size-7 text-primary" />
                    <span className="font-headline text-lg font-semibold">Vitae Forge</span>
                </Link>
                <nav className="flex-1 flex justify-center items-center gap-4">
                     <Button variant="ghost" asChild>
                        <Link href="/dashboard">
                            <Home className="mr-2"/> Dashboard
                        </Link>
                     </Button>
                      <Button variant="ghost" asChild>
                        <Link href="#">
                            <FileText className="mr-2"/> All CVs
                        </Link>
                     </Button>
                      <Button variant="ghost" asChild>
                        <Link href="/onboarding">
                            <PlusCircle className="mr-2"/> Create New
                        </Link>
                     </Button>
                      <Button variant="ghost" asChild>
                        <Link href="#">
                            <Settings className="mr-2"/> Settings
                        </Link>
                     </Button>
                </nav>
                <div className="flex items-center gap-3">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <span className="font-semibold text-sm">User</span>
                        <span className="text-xs text-muted-foreground">user@email.com</span>
                    </div>
                </div>
            </header>
            <main className="flex-1 flex-col bg-background p-4 md:p-8">
                {children}
            </main>
      </div>
  )
}
