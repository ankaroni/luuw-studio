'use client';

import Image from 'next/image';
import { useState } from 'react';

type Props = {
  src: string;
  fallback: string;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
};

/** Fills its (relative, sized) parent; swaps to a local SVG if the remote photo fails. */
export function Photo({ src, fallback, alt, sizes, className = 'object-cover', priority }: Props) {
  const [current, setCurrent] = useState(src);
  return (
    <Image
      src={current}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={className}
      onError={() => current !== fallback && setCurrent(fallback)}
    />
  );
}
