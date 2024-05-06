import * as React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Icons } from "../Icons";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
interface User {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string; 
  id?: string | null; 
}
export function DashBoardLinks({ components }: any) {
  const { data: session, status } = useSession();
  const user = session?.user;

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {components.map((comp: any) => {
          return (
            <NavigationMenuItem key={comp.href}>
              <Link href={comp.href} legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {comp.title}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          );
        })}

        {/* {user?.role === "ADMIN" && (
          <NavigationMenuItem>
            <Link href={`/dashboard/over-view/${user.id}`}>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                View-list
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        )} */}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
