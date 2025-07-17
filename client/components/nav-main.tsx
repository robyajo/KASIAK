"use client";

import { ChevronRight, Home, type LucideIcon } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export function NavMain() {
  const pathname = usePathname();
  const router = useRouter();
  const isActive = (href: string) => pathname === href;
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
      <SidebarMenuItem>
        <SidebarMenuButton
          onClick={() => router.push("/dashboard")}
          className={cn(
            "text-primary-foreground/70",
            isActive("/dashboard") && "bg-primary text-primary-foreground"
          )}
        >
          <Home className=" text-primary-foreground" />
          <span>Dashboard</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarGroup>
  );
}
