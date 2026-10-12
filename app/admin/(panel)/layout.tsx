import Link from 'next/link';
import { redirect } from 'next/navigation';
import { destroyAdminSession, requireAdmin } from '@/lib/auth';

export const metadata = { title: 'Luuw Admin', robots: { index: false } };

async function logout() {
  'use server';
  await destroyAdminSession();
  redirect('/admin/login');
}

const nav = [
  ['/admin', 'Übersicht'],
  ['/admin/sessions', 'Termine'],
  ['/admin/bookings', 'Buchungen'],
  ['/admin/products', 'Produkte'],
  ['/admin/orders', 'Bestellungen'],
];

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  return (
    <div className="min-h-screen grid md:grid-cols-[220px_1fr] bg-cream">
      <aside className="bg-sageDeep text-white p-6 flex md:flex-col gap-6 md:gap-8 flex-wrap">
        <p className="display text-2xl">luuw. <span className="eyebrow !text-[9px] block text-[#c6cfbc]">admin</span></p>
        <nav className="flex md:flex-col gap-4 text-sm flex-wrap" aria-label="Admin">
          {nav.map(([href, label]) => (
            <Link key={href} href={href} className="hover:text-blush">{label}</Link>
          ))}
        </nav>
        <form action={logout} className="md:mt-auto"><button className="text-xs underline">Abmelden</button></form>
      </aside>
      <main className="p-6 md:p-10 min-w-0">{children}</main>
    </div>
  );
}
