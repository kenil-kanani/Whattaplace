interface HeroSectionProps {
  title: string;
  description: string;
}

export default function HeroSection({ title, description }: HeroSectionProps) {
  return (
    <div className="text-center mb-20">
      <h1 className="text-7xl font-bold text-black mb-8 tracking-tight">
        {title}
      </h1>
      <p className="text-gray-400 text-lg leading-relaxed max-w-5xl mx-auto">
        {description}
      </p>
    </div>
  );
}
