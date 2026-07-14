const variants = {
  primary:
    "rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring font-medium",
  outline:
    "rounded-lg border border-input bg-background text-foreground hover:bg-muted focus-visible:ring-ring font-medium",
  inverted:
    "rounded-lg bg-background text-foreground hover:bg-background/90 focus-visible:ring-ring font-medium",
  ghost:
    "rounded-lg border border-current bg-transparent text-current font-mono text-xs font-medium uppercase tracking-[0.15em] hover:bg-foreground/5 focus-visible:ring-ring",
  "ghost-light":
    "rounded-lg border border-white/60 bg-transparent text-white font-mono text-xs font-medium uppercase tracking-[0.15em] hover:bg-white/10 focus-visible:ring-white",
};

export default function Button({
  href,
  variant = "primary",
  size = "default",
  className = "",
  children,
  ...props
}) {
  const sizes = {
    default: "h-10 px-5 text-base",
    lg: "h-12 px-7 text-base",
  };
  const sizeClass =
    variant.startsWith("ghost") ? (size === "lg" ? "h-12 px-7" : "h-10 px-5") : sizes[size];
  const classes = `inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${variants[variant]} ${sizeClass} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
