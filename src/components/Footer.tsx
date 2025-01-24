import { ThemeToggle } from './Theme'

export default function Footer() {
  return (
    <footer className="flex items-center justify-between py-4 px-8 border-t h-16">
      <p className="text-xs text-muted-foreground">&copy; 2025 Knowhow</p>
      <ThemeToggle />
    </footer>
  )
}
