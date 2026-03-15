export default function Footer() {
  return (
    <footer className="mt-auto py-6 text-center text-xs text-muted-foreground border-t border-border">
      © {new Date().getFullYear()} Rob Leggett
    </footer>
  );
}
