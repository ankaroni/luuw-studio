import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';
import { workshops } from '../lib/data';

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }) });

async function main() {
  for (const w of workshops) {
    const data = { title: w.title, label: w.label, description: w.description, image: w.image, category: w.type };
    const workshop = await prisma.workshop.upsert({ where: { slug: w.id }, update: data, create: { slug: w.id, ...data } });
    if ((await prisma.session.count({ where: { workshopId: workshop.id } })) === 0) {
      const start = new Date();
      start.setDate(start.getDate() + 14);
      start.setHours(15, 0, 0, 0);
      await prisma.session.create({
        data: { workshopId: workshop.id, startsAt: start, endsAt: new Date(start.getTime() + 3 * 3600_000), capacity: 8, priceCents: 6500 },
      });
    }
  }
  await prisma.product.upsert({
    where: { slug: 'blumenkerze-klein' },
    update: {},
    create: { slug: 'blumenkerze-klein', name: 'Blumenkerze klein', category: 'Kerzen', priceCents: 2400, stock: 12 },
  });
}

main().finally(() => prisma.$disconnect());
