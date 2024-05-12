import "../app/globals.css"
import { Metadata, Viewport } from "next"
import { cn } from "@/lib/utils"
import { SiteHeader } from "@/components/SiteHeader"
import { ThemeSwitcher } from "@/components/ThemeSwitcher"
import { ThemeProvider } from "@/components/Providers"
import { Toaster } from "@/components/ui/toaster"
import { SiteFooter } from "@/components/Footer"
import AuthProvider from "@/context/page"
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";

export const metadata: Metadata = {
 creator: "Collinz Dev",
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
 
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased ",
          )}
        >
          <AuthProvider>
          <Toaster />
          <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />

          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div >
              <div className="relative flex min-h-screen flex-col bg-background">
                <SiteHeader />
                <main className="flex-1 bg2">{children}</main>
              </div>
            </div>
            {/* <ThemeSwitcher /> */}
          </ThemeProvider>
          <SiteFooter/>
          </AuthProvider>

        </body>
      </html>
    </>
  )
}