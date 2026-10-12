import { randomUUID } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const TYPES: Record<string, string> = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp' };
export const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

/**
 * Saves an uploaded image and returns its public URL, or null if the file is missing/invalid.
 * Dev storage is public/uploads; swap this function for Vercel Blob / S3 before deploying to
 * Vercel (its filesystem is read-only).
 */
export async function saveImage(file: FormDataEntryValue | null): Promise<string | null> {
  if (!(file instanceof File) || file.size === 0 || file.size > MAX_IMAGE_BYTES) return null;
  const ext = TYPES[file.type];
  if (!ext) return null;
  const dir = path.join(process.cwd(), 'public', 'uploads');
  await mkdir(dir, { recursive: true });
  const name = `${randomUUID()}.${ext}`;
  await writeFile(path.join(dir, name), Buffer.from(await file.arrayBuffer()));
  return `/uploads/${name}`;
}
