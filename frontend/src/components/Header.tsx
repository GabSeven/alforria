import { Link, useLocation } from "react-router"
import { cn } from "@/lib/utils"
import { ModeToggle } from "@/components/Mode-Toogle"
import Logo from "@/assets/alforria.svg?react"

const links = [
  { to: "/disciplinas", label: "Disciplinas" },
  { to: "/grupos", label: "Grupos" },
  { to: "/turmas", label: "Turmas" },
  { to: "/professores", label: "Professores" },
]

export default function Header() {
  const { pathname } = useLocation()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-6">
        <Link to="/" className="mr-6 text-sm font-semibold">
          <Logo className="h-6 w-6 text-foreground" />
        </Link>

        {/* Links de navegação */}
        <nav className="flex items-center gap-4 text-sm">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname.startsWith(link.to)
                  ? "font-medium text-foreground"
                  : "text-foreground/60"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Lado direito — toggle de tema */}
        <div className="ml-auto flex items-center gap-2">
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
