import React from 'react';
import Image from 'next/image';

// ![alt](url) or ![alt](url "title") on its own line, as inserted by the admin blog editor
const IMAGE_LINE = /^!\[(.*?)\]\((\S+?)(?:\s+"(.*?)")?\)$/;

// Headings are already bold, so **bold** markers inside them are dropped instead of shown
function headingText(line: string, prefix: string) {
  return line.replace(prefix, '').replace(/\*\*(.*?)\*\*/g, '$1');
}

// Renders a blog article body (### headings, * bullets, 1. lists, **bold**) with editorial typography.
// Shared by the public blog page and the admin editor preview so both look the same.
export default function BlogContent({ content }: { content: string }) {
  const lines = content.trim().split('\n');
  // The first ## / ### heading of the article gets no divider line above it
  const firstHeadingIdx = lines.findIndex((line) => /^#{2,3} /.test(line.trim()));

  const blocks = lines.map((line, idx) => {
    const trimmed = line.trim();
    if (!trimmed) return null;

    const image = trimmed.match(IMAGE_LINE);
    if (image) {
      const [, alt, src] = image;
      return (
        <figure key={idx} className="my-6">
          <Image
            src={src}
            alt={alt || 'Ghar Shagna Da wedding outfit'}
            width={1200}
            height={800}
            sizes="(max-width: 1024px) 100vw, 750px"
            className="w-full h-auto rounded-2xl border border-stone-100 shadow-sm"
          />
        </figure>
      );
    }

    if (trimmed.startsWith('#### ')) {
      return (
        <div key={idx} className="mt-6 mb-2 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#8b1828]" />
          <h4 className="font-serif-luxury text-base sm:text-lg font-bold text-stone-900 tracking-tight">
            {headingText(trimmed, '#### ')}
          </h4>
        </div>
      );
    }
    if (trimmed.startsWith('### ')) {
      const isFirst = idx === firstHeadingIdx;
      return (
        <div key={idx} className={isFirst ? "mb-3" : "mt-8 mb-3 pt-3 border-t border-[#f0eae1]"}>
          <h3 className="font-serif-luxury text-lg sm:text-2xl font-bold text-[#8b1828] tracking-tight leading-snug">
            {headingText(trimmed, '### ')}
          </h3>
        </div>
      );
    }
    if (trimmed.startsWith('## ')) {
      return (
        <h2 key={idx} className="font-serif-luxury text-xl sm:text-2xl font-bold text-stone-900 mt-6 mb-3 tracking-tight leading-tight">
          {headingText(trimmed, '## ')}
        </h2>
      );
    }
    if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
      return (
        <div key={idx} className="flex items-start gap-3 my-2.5 pl-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#8b1828] mt-2.5 shrink-0" />
          <p className="text-stone-700 text-sm sm:text-[15px] leading-relaxed flex-1">
            <span
              dangerouslySetInnerHTML={{
                __html: trimmed
                  .substring(2)
                  .replace(/\*\*(.*?)\*\*/g, '<strong class="text-stone-950 font-bold">$1</strong>'),
              }}
            />
          </p>
        </div>
      );
    }
    if (/^\d+\.\s/.test(trimmed)) {
      const numMatch = trimmed.match(/^(\d+)\.\s/);
      const num = numMatch ? numMatch[1] : '1';
      return (
        <div key={idx} className="flex items-start gap-3 my-3 pl-2">
          <span className="w-6 h-6 rounded-full bg-rose-50 border border-rose-200 text-[#8b1828] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
            {num}
          </span>
          <p className="text-stone-700 text-sm sm:text-[15px] leading-relaxed flex-1">
            <span
              dangerouslySetInnerHTML={{
                __html: trimmed
                  .replace(/^\d+\.\s/, '')
                  .replace(/\*\*(.*?)\*\*/g, '<strong class="text-stone-950 font-bold">$1</strong>'),
              }}
            />
          </p>
        </div>
      );
    }

    return (
      <p
        key={idx}
        className="text-stone-700 text-sm sm:text-[15.5px] leading-relaxed mb-4 font-normal"
        dangerouslySetInnerHTML={{
          __html: trimmed.replace(/\*\*(.*?)\*\*/g, '<strong class="text-stone-950 font-bold">$1</strong>'),
        }}
      />
    );
  });

  return <>{blocks}</>;
}
