export default function Footer() {
  return (
    <footer className="border-t border-border py-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
        <span className="font-display font-extrabold text-lg">Paul<span className="text-brand">codes</span><span className="text-brand">.</span></span>
        <p className="text-xs text-muted-foreground text-center">© {new Date().getFullYear()} Paulcodes. If you can imagine it. I can build it.</p>
        <div className="flex gap-4 text-xs text-muted-foreground">
          <a href="/blog" className="hover:text-foreground transition-colors">Blog</a>
          <a href="/#work" className="hover:text-foreground transition-colors">Work</a>
          <a href="/#contact" className="hover:text-foreground transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
}