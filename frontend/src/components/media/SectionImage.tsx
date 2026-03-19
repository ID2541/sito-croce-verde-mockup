import Image from "next/image";

type SectionImageProps = {
  src: string;
  alt: string;
  priority?: boolean;
  ratioClassName?: string;
  className?: string;
  caption?: string;
};

export function SectionImage({
  src,
  alt,
  priority = false,
  ratioClassName = "aspect-[16/10]",
  className,
  caption,
}: SectionImageProps) {
  return (
    <figure className={`media-frame overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm ${className ?? ""}`}>
      <div className={`relative ${ratioClassName}`}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 70vw, 560px"
          className="object-cover transition-transform duration-700 ease-out"
        />
      </div>
      {caption ? <figcaption className="px-4 py-3 text-xs text-site-muted">{caption}</figcaption> : null}
    </figure>
  );
}
