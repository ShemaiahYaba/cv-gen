"use client"
import Link from "next/link"
import {
  User,
  LogOut,
} from "lucide-react"

import { Form2CVLogo } from "@/components/icons"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <div className="flex flex-col min-h-screen">
            <header className="flex h-16 items-center justify-between gap-4 border-b bg-card px-6">
                <Link href="/dashboard" className="flex items-center gap-2">
                    <Form2CVLogo className="size-7 text-primary" />
                    <span className="font-headline text-lg font-semibold">Form2CV</span>
                </Link>
                <div className="flex items-center gap-4">
                    <Button variant="ghost" asChild>
                        <Link href="/auth/sign-in">
                            <LogOut className="mr-2 h-4 w-4" />
                            Log out
                        </Link>
                    </Button>
                </div>
            </header>
            <main className="flex-1 flex-col bg-background p-4 md:p-8">
                {children}
            </main>
      </div>
  )
}
