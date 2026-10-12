import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { dateTime, eur } from '@/lib/format';

export const dynamic = 'force-dynamic';

async function createSession(formData: FormData) {
  'use server';
  await requireAdmin();
  const workshopId = String(formData.get('workshopId'));
  const startsAt = new Date(String(formData.get('startsAt')));
  const minutes = Number(formData.get('minutes'));
  const capacity = Number(formData.get('capacity'));
  const priceCents = Math.round(Number(formData.get('price')) * 100);
  if (!workshopId || isNaN(startsAt.getTime()) || !(minutes > 0) || !(capacity > 0) || !(priceCents >= 0)) return;
  await prisma.session.create({
    data: { workshopId, startsAt, endsAt: new Date(startsAt.getTime() + minutes * 60_000), capacity, priceCents },
  });
  revalidatePath('/admin/sessions');
}

async function cancelSession(formData: FormData) {
  'use server';
  await requireAdmin();
  const id = String(formData.get('id'));
  await prisma.session.update({ where: { id }, data: { status: 'CANCELLED' } });
  revalidatePath('/admin/sessions');
}

const input = 'border border-line px-3 py-2 text-sm bg-white outline-none focus:border-sageDeep';

export default async function Sessions() {
  await requireAdmin();
  const [workshops, sessions] = await Promise.all([
    prisma.workshop.findMany({ orderBy: { title: 'asc' } }),
    prisma.session.findMany({
      orderBy: { startsAt: 'asc' },
      include: { workshop: true, bookings: { where: { status: 'PAID' } } },
    }),
  ]);

  return (
    <>
      <h1 className="display text-4xl mb-8">Termine</h1>
      <form action={createSession} className="bg-white p-6 shadow-soft grid sm:grid-cols-2 xl:grid-cols-6 gap-3 items-end mb-10">
        <label className="text-xs grid gap-1">Workshop
          <select name="workshopId" required className={input}>
            {workshops.map((w) => <option key={w.id} value={w.id}>{w.title}</option>)}
          </select>
        </label>
        <label className="text-xs grid gap-1">Beginn
          <input type="datetime-local" name="startsAt" required className={input} />
        </label>
        <label className="text-xs grid gap-1">Dauer (Min.)
          <input type="number" name="minutes" min={15} defaultValue={180} required className={input} />
        </label>
        <label className="text-xs grid gap-1">Plätze
          <input type="number" name="capacity" min={1} defaultValue={8} required className={input} />
        </label>
        <label className="text-xs grid gap-1">Preis (€)
          <input type="number" name="price" min={0} step="0.01" defaultValue={65} required className={input} />
        </label>
        <button className="button-fill !py-3">Termin anlegen</button>
      </form>

      <div className="bg-white shadow-soft overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-muted uppercase tracking-wider">
            <tr><th className="p-4">Workshop</th><th>Datum</th><th>Plätze</th><th>Preis</th><th>Status</th><th /></tr>
          </thead>
          <tbody className="divide-y divide-line">
            {sessions.map((s) => {
              const taken = s.bookings.reduce((n, b) => n + b.seats, 0);
              return (
                <tr key={s.id} className={s.status === 'CANCELLED' ? 'opacity-50' : ''}>
                  <td className="p-4 font-semibold">{s.workshop.title}</td>
                  <td>{dateTime(s.startsAt)}</td>
                  <td>{taken}/{s.capacity}</td>
                  <td>{eur(s.priceCents)}</td>
                  <td>{s.status === 'OPEN' ? 'Offen' : 'Abgesagt'}</td>
                  <td className="pr-4 text-right">
                    {s.status === 'OPEN' && (
                      <form action={cancelSession}><input type="hidden" name="id" value={s.id} /><button className="text-terra underline text-xs">Absagen</button></form>
                    )}
                  </td>
                </tr>
              );
            })}
            {sessions.length === 0 && <tr><td className="p-6 text-muted" colSpan={6}>Noch keine Termine.</td></tr>}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-muted mt-3">Absagen markiert den Termin nur als abgesagt. Rückerstattungen über Stripe folgen mit der Zahlungsanbindung.</p>
    </>
  );
}
