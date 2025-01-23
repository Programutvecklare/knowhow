import { ThemeToggle } from './Theme'

export default function Footer() {
  return (
    <footer className="flex items-center justify-between py-4 px-8 border-t mt-auto">
      <p className="text-xs text-muted-foreground">&copy; 2025 Knowhow</p>
      <ThemeToggle />
    </footer>
  )
}
