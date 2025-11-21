"use client"
import Link from "next/link"
import {
  User,
  LogOut,
} from "lucide-react"

import { VitaeForgeLogo } from "@/components/icons"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <div className="flex flex-col min-h-screen">
            <header className="flex h-16 items-center justify-between gap-4 border-b bg-card px-6">
                <Link href="/dashboard" className="flex items-center gap-2">
                    <VitaeForgeLogo className="size-7 text-primary" />
                    <span className="font-headline text-lg font-semibold">Vitae Forge</span>
                </Link>
                <div className="flex items-center gap-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <div className="flex items-center gap-3 cursor-pointer">
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                <AvatarFallback>U</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <span className="font-semibold text-sm">User</span>
                                <span className="text-xs text-muted-foreground">user@email.com</span>
                            </div>
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <User className="mr-2 h-4 w-4" />
                          <span>Edit Profile</span>
                        </DropdownMenuItem>
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
