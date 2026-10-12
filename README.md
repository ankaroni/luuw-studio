# Luuw Studio — Next.js

Hamburg merkezli Luuw Studio için: ana sayfa, online shop, sepet, Stripe ödemesi ve admin paneli.
Next.js (App Router) + TypeScript + Tailwind 4 + Prisma + Postgres + Stripe.

> Eski statik prototip `legacy/` klasöründe duruyor (sadece referans, çalıştırmaya gerek yok).

## Gerekenler

- Node.js 20+ (22 önerilir)
- Docker Desktop **veya** kendi Postgres'in

## Kurulum (ilk sefer)

```bash
git clone https://github.com/ankaroni/luuw-studio.git   # veya PR'ın branch'i: nextjs-migration
cd luuw-studio
git checkout nextjs-migration

cp .env.example .env        # hazır yerel değerler içerir, düzenlemen gerekmez
docker compose up -d        # Postgres'i başlatır (Docker yoksa aşağıya bak)
npm install
npm run db:setup            # tabloları kurar + örnek atölye/ürün ekler
npm run dev
```

Sonra: http://localhost:3000

| Adres | Ne |
|---|---|
| `/` | Ana sayfa |
| `/shop` | Ürünler (DB'den) |
| `/cart` | Sepet |
| `/admin` | Admin paneli — şifre: `.env` içindeki `ADMIN_PASSWORD` (varsayılan `luuw-admin-dev`) |

## Sonraki günler

```bash
docker compose up -d   # DB kapalıysa
npm run dev
```

## Docker yoksa

Kendi Postgres'inde boş bir veritabanı aç ve `.env` içindeki `DATABASE_URL`'i ona göre değiştir
(ör. `postgresql://kullanici:sifre@localhost:5432/luuw`). Ücretsiz [Neon](https://neon.tech) bağlantısı da olur.

## Ödemeyi denemek (isteğe bağlı)

Site Stripe anahtarları olmadan da açılır; sadece "Zur Kasse" için gerekir.
[Stripe test anahtarlarını](https://dashboard.stripe.com/test/apikeys) (Test mode) `.env`'e yaz:

```
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

Test kartı: `4242 4242 4242 4242`, herhangi bir gelecek tarih ve CVC.
**Gizli anahtarı (`sk_...`) asla commit'leme veya sohbette paylaşma.**

## Sık sorunlar

- **`Can't reach database server`** → Postgres çalışmıyor: `docker compose up -d`.
- **Tablo yok / `relation does not exist`** → `npm run db:setup`.
- **`@/generated/prisma/client` bulunamadı** → `npx prisma generate` (normalde `npm install` yapar).
- **Şema değişti, sayfa hata veriyor** → `npx prisma generate`, sonra `npm run dev`'i kapatıp aç.
- `npm run dev` açıkken `npm run build` çalıştırma.

## Canlıya çıkmadan önce

- Ürün fotoğrafları şu an `public/uploads/` içine yazılıyor; Vercel'de çalışmaz → Vercel Blob/S3
- Güçlü `ADMIN_PASSWORD` ve `AUTH_SECRET`
- Stripe webhook (`/api/stripe/webhook`) ve `STRIPE_WEBHOOK_SECRET`
- Impressum, Datenschutz, AGB, Widerrufsbelehrung sayfaları
