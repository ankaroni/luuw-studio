import { prisma } from '@/lib/db';
import { dateTime, eur } from '@/lib/format';

export const dynamic = 'force-dynamic';

export default async function Overview() {
  const now = new Date();
  const [upcoming, paidBookings, orders, revenue, next] = await Promise.all([
    prisma.session.count({ where: { startsAt: { gte: now }, status: 'OPEN' } }),
    prisma.booking.count({ where: { status: 'PAID' } }),
    prisma.order.count({ where: { fulfillment: 'NEW', status: 'PAID' } }),
    prisma.order.aggregate({ _sum: { totalCents: true }, where: { status: 'PAID' } }),
    prisma.session.findMany({
      where: { startsAt: { gte: now }, status: 'OPEN' },
      orderBy: { startsAt: 'asc' },
      take: 5,
      include: { workshop: true, bookings: { where: { status: 'PAID' } } },
    }),
  ]);

  const stats = [
    ['Offene Termine', String(upcoming)],
    ['Bezahlte Buchungen', String(paidBookings)],
    ['Neue Bestellungen', String(orders)],
    ['Shop-Umsatz', eur(revenue._sum.totalCents ?? 0)],
  ];

  return (
    <>
      <h1 className="display text-4xl mb-8">Übersicht</h1>
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map(([label, value]) => (
          <div key={label} className="bg-white p-6 shadow-soft">
            <p className="eyebrow text-muted !text-[9px]">{label}</p>
            <p className="display text-4xl mt-3">{value}</p>
          </div>
        ))}
      </div>
      <h2 className="display text-2xl mt-12 mb-4">Nächste Termine</h2>
      <div className="bg-white shadow-soft divide-y divide-line">
        {next.length === 0 && <p className="p-6 text-muted text-sm">Keine kommenden Termine.</p>}
        {next.map((s) => {
          const taken = s.bookings.reduce((n, b) => n + b.seats, 0);
          return (
            <div key={s.id} className="p-5 flex flex-wrap justify-between gap-2 text-sm">
              <span className="font-semibold">{s.workshop.title}</span>
              <span className="text-muted">{dateTime(s.startsAt)}</span>
              <span>{taken}/{s.capacity} Plätze</span>
            </div>
          );
        })}
      </div>
    </>
  );
}
