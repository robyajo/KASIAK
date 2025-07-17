"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

const components = [
  {
    title: "Month",
    href: "/month",
    description: "View monthly expenses",
  },
  {
    title: "Day",
    href: "/day",
    description: "View daily expenses",
  },
  {
    title: "Year",
    href: "/year",
    description: "View yearly expenses",
  },
];

export function NavigationMenuData() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  // Close mobile menu when a link is clicked
  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  const isActive = (href: string) => pathname === href;

  // Desktop Navigation
  const desktopNav = (
    <NavigationMenu viewport={false}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link
              href="/"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary-600 dark:hover:text-primary-400",
                isActive("/") && "border-b-2 border-primary "
              )}
            >
              Home
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Simple</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-4">
              <li>
                <NavigationMenuLink asChild>
                  <Link
                    href="/month"
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary-600 dark:hover:text-primary-400",
                      isActive("/month") && "border-b-2 border-primary"
                    )}
                  >
                    Month
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link
                    href="/day"
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary-600 dark:hover:text-primary-400",
                      isActive("/day") && "border-b-2 border-primary"
                    )}
                  >
                    Day
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link
                    href="/year"
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary-600 dark:hover:text-primary-400",
                      isActive("/year") && "border-b-2 border-primary"
                    )}
                  >
                    Year
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link
              href="/blog"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary-600 dark:hover:text-primary-400",
                isActive("/blog") && "border-b-2 border-primary"
              )}
            >
              Blog
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link
              href="/about"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary-600 dark:hover:text-primary-400",
                isActive("/about") && "border-b-2 border-primary"
              )}
            >
              About
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );

  // Mobile Navigation
  const mobileNav = (
    <div className="md:hidden">
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[280px] sm:w-[350px] p-4">
          <SheetHeader className="mb-2">
            <SheetTitle className="text-lg">Menu</SheetTitle>
            <SheetDescription className="text-xs">
              Select an option below
            </SheetDescription>
          </SheetHeader>
          <nav className="flex flex-col space-y-1">
            <Link
              href="/"
              onClick={closeMobileMenu}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                isActive("/")
                  ? "bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              )}
            >
              Home
            </Link>

            <div className="px-4 py-2">
              <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                Features
              </h3>
              <div className="space-y-0.5 pl-2">
                {components.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMobileMenu}
                    className={cn(
                      "block px-4 py-2 text-sm rounded-md transition-colors",
                      isActive(item.href)
                        ? "bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800"
                    )}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/blog"
              onClick={closeMobileMenu}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                isActive("/blog")
                  ? "bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              )}
            >
              Blog
            </Link>

            <Link
              href="/about"
              onClick={closeMobileMenu}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                isActive("/about")
                  ? "bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              )}
            >
              About
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );

  return (
    <>
      <div className="hidden md:block">{desktopNav}</div>
      {mobileNav}
    </>
  );
}

function ListItem({
  title,
  children,
  href,
  className,
  ...props
}: {
  href: string;
  title: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <li className="p-2">
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 dark:hover:bg-gray-800",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
