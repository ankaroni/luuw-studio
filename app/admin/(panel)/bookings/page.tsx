import { requireAdmin } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { dateTime } from '@/lib/format';

export const dynamic = 'force-dynamic';

const label = { PENDING: 'Ausstehend', PAID: 'Bezahlt', CANCELLED: 'Storniert', REFUNDED: 'Erstattet' } as const;

export default async function Bookings() {
  await requireAdmin();
  const bookings = await prisma.booking.findMany({
    orderBy: { createdAt: 'desc' },
    take: 200,
    include: { session: { include: { workshop: true } } },
  });
  return (
    <>
      <h1 className="display text-4xl mb-8">Buchungen</h1>
      <div className="bg-white shadow-soft overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-muted uppercase tracking-wider">
            <tr><th className="p-4">Name</th><th>E-Mail</th><th>Workshop</th><th>Termin</th><th>Plätze</th><th>Status</th></tr>
          </thead>
          <tbody className="divide-y divide-line">
            {bookings.map((b) => (
              <tr key={b.id}>
                <td className="p-4 font-semibold">{b.name}</td>
                <td>{b.email}</td>
                <td>{b.session.workshop.title}</td>
                <td>{dateTime(b.session.startsAt)}</td>
                <td>{b.seats}</td>
                <td>{label[b.status]}</td>
              </tr>
            ))}
            {bookings.length === 0 && <tr><td className="p-6 text-muted" colSpan={6}>Noch keine Buchungen.</td></tr>}
          </tbody>
        </table>
      </div>
    </>
  );
}
