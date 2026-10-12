import { Hero, ValuesStrip } from '@/components/Hero';
import { Materials } from '@/components/Materials';
import { Newsletter } from '@/components/Newsletter';
import { ShopCategories } from '@/components/ShopCategories';
import { SiteShell } from '@/components/SiteShell';
import { About, GiftCta, Journal, QuoteStrip } from '@/components/Sections';
import { WorkshopPinboard } from '@/components/WorkshopPinboard';

export default function Home() {
  return (
    <SiteShell>
      <Hero />
      <ValuesStrip />
      <ShopCategories />
      <WorkshopPinboard />
      <GiftCta />
      <About />
      <Materials />
      <QuoteStrip />
      <Journal />
      <Newsletter />
    </SiteShell>
  );
}
