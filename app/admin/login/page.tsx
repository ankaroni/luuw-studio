import { redirect } from 'next/navigation';
import { createAdminSession, isAdmin, passwordMatches } from '@/lib/auth';

export const metadata = { title: 'Admin Login' };

async function login(formData: FormData) {
  'use server';
  if (!passwordMatches(String(formData.get('password') ?? ''))) redirect('/admin/login?error=1');
  await createAdminSession();
  redirect('/admin');
}

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  if (await isAdmin()) redirect('/admin');
  const { error } = await searchParams;
  return (
    <main className="min-h-screen grid place-items-center p-6 bg-cream">
      <form action={login} className="bg-white p-10 w-full max-w-sm shadow-soft">
        <p className="eyebrow text-terra mb-3">Luuw Admin</p>
        <h1 className="display text-4xl mb-6">Anmelden</h1>
        <label htmlFor="password" className="sr-only">Passwort</label>
        <input id="password" name="password" type="password" required autoFocus placeholder="Passwort" className="w-full border border-line px-4 py-3 text-sm outline-none focus:border-sageDeep" />
        {error && <p role="alert" className="text-terra text-sm mt-3">Falsches Passwort.</p>}
        <button className="button-fill w-full mt-6">Einloggen</button>
      </form>
    </main>
  );
}
