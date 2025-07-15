"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

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
]

export function NavigationMenuData() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = React.useState(false)

  // Close mobile menu when a link is clicked
  const closeMobileMenu = () => {
    setMobileOpen(false)
  }

  const isActive = (href: string) => pathname === href

  // Desktop Navigation
  const desktopNav = (
    <NavigationMenu viewport={false}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link 
              href="/" 
              className={cn(
                "text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400",
                isActive("/") && "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 pb-1"
              )}
            >
              Home
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
       
        <NavigationMenuItem>
          <NavigationMenuTrigger>Features</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-2 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                  className={cn(
                    "hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded",
                    isActive(component.href) && "text-blue-600 dark:text-blue-400"
                  )}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link 
              href="/blog" 
              className={cn(
                "text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400",
                isActive("/blog") && "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 pb-1"
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
                "text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400",
                isActive("/about") && "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 pb-1"
              )}
            >
              About
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )

  // Mobile Navigation
  const mobileNav = (
    <div className="md:hidden">
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] sm:w-[400px]">
          <SheetHeader className="mb-6">
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col space-y-2">
            <Link
              href="/"
              onClick={closeMobileMenu}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                isActive("/")
                  ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              )}
            >
              Home
            </Link>

            <div className="px-4 py-2">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Features</h3>
              <div className="space-y-1 pl-2">
                {components.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMobileMenu}
                    className={cn(
                      "block px-4 py-2 text-sm rounded-md transition-colors",
                      isActive(item.href)
                        ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
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
                  ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
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
                  ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              )}
            >
              About
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  )

  return (
    <>
      <div className="hidden md:block">{desktopNav}</div>
      {mobileNav}
    </>
  )
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