"use client";

import Link from "next/link";
import { Wallet } from "lucide-react";
import { NavigationMenuData } from "./navigation-menu-data";
import { ModeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

export function HeaderHome() {
  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 dark:bg-blue-500">
                <Wallet className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white md:block hidden">
                ExpenseTracker
              </span>
            </Link>
          </div>
          <div className="md:flex items-center space-x-2 hidden">
            <NavigationMenuData />
            <ModeToggle />
            <Link href="/login">
              <Button variant="outline" className="text-blue-600 dark:text-blue-400">
                Login
              </Button>
            </Link>
          </div>
          <div className="md:hidden flex items-center space-x-2">
            <ModeToggle />
            <Link href="/login">
              <Button variant="outline" className="text-blue-600 dark:text-blue-400">
                Login
              </Button>
            </Link>
            <NavigationMenuData />
          </div>
        </div>
      </nav>
    </header>
  );
}
