import { Photo } from './Photo';

export function ProductImage({ src, alt, sizes }: { src: string | null; alt: string; sizes: string }) {
  return <Photo src={src ?? '/assets/studio.svg'} fallback="/assets/studio.svg" alt={alt} sizes={sizes} />;
}
