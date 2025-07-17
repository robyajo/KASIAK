"use client";

import Link from "next/link";
import { NavigationMenuData } from "./navigation-menu-data";
import { ModeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Image from "next/image";

export function HeaderHome() {
  const { data: session } = useSession();
  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg">
                <Image
                  src="/assets/logo.png"
                  alt="Logo"
                  width={32}
                  height={32}
                />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white md:block hidden">
                {process.env.NEXT_PUBLIC_APP_NAME}
              </span>
            </Link>
          </div>
          <div className="md:flex items-center space-x-2 hidden">
            <NavigationMenuData />
            <ModeToggle />
            {session ? (
              <Link href="/dashboard">
                <Button variant="outline" className="">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <Link href="/login">
                <Button variant="outline" className="">
                  Login
                </Button>
              </Link>
            )}
          </div>
          <div className="md:hidden flex items-center space-x-2">
            <ModeToggle />
            {session ? (
              <Link href="/dashboard">
                <Button variant="outline" className="">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <Link href="/login">
                <Button variant="outline" className="">
                  Login
                </Button>
              </Link>
            )}
            <NavigationMenuData />
          </div>
        </div>
      </nav>
    </header>
  );
}
