interface Props {
  id: string;
  title: string;
  subtitle?: string;
}

export default function SectionHeading({ id, title, subtitle }: Props) {
  return (
    <div className="mb-14 text-center" id={id}>
      <p className="mb-3 text-[10px] font-mono font-bold tracking-[0.3em] text-accent/70 uppercase">
        {title.replace(" ", "_")}
      </p>
      <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl font-mono">
        <span className="text-accent">&lt;</span>
        <span className="gradient-text">{title}</span>
        <span className="text-accent"> /&gt;</span>
      </h2>
      {subtitle && (
        <p className="mt-4 text-muted text-sm sm:text-base max-w-xl mx-auto font-mono opacity-80">
          <span className="text-accent-game">{"// "}</span> {subtitle}
        </p>
      )}
      <div className="mx-auto mt-8 flex items-center justify-center gap-2">
        <span className="h-[1px] w-12 bg-accent/20" />
        <span className="px-3 py-1 rounded bg-accent/5 text-[10px] font-mono text-accent border border-accent/20">CTRL + S</span>
        <span className="h-[1px] w-12 bg-accent/20" />
      </div>
    </div>
  );
}
