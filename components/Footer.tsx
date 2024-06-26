import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="py-6 md:px-8 md:py-0 border-b border-border/40  backdrop-blur h-[15vh]">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built by{" "}
          <Link
            href=""
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            collinz 
          </Link>
          . The source code is available on{" "}
          <Link
            href="https://github.com/colline-kooza/attendence"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            GitHub
          </Link>
          .
        </p>
      </div>
    </footer>
  )
}