"use client"
import Link from "next/link"
import {
  LogOut,
  User,
} from "lucide-react"

import { Form2CVLogo } from "@/components/icons"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

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
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                                <Avatar>
                                    <AvatarImage src="https://picsum.photos/seed/1/40/40" alt="User avatar" />
                                    <AvatarFallback>U</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="end" forceMount>
                            <DropdownMenuLabel className="font-normal">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none">User</p>
                                    <p className="text-xs leading-none text-muted-foreground">
                                        user@email.com
                                    </p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                 <Link href="/auth/sign-in">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Log out</span>
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>
            <main className="flex-1 flex-col bg-background p-4 md:p-8">
                {children}
            </main>
      </div>
  )
}
