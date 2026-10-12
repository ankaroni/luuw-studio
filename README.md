# Luuw Studio — Modern Boho / Tailwind CSS

Hamburg merkezli Luuw Studio için, **mum ve Keraflott online shop'u** ile **Blumenkerzen, Herbstkerzen, Keraflott ve Tufting workshop'larını** aynı marka dünyasında birleştiren responsive ana sayfa prototipi.

## Nasıl açılır?

ZIP dosyasını klasöre çıkar, `luuw-studio/index.html` dosyasını Chrome veya Safari ile aç. **HTML ve Tailwind CSS dosyaları lokaldir; siteyi görüntülemek için Tailwind CDN gerekmez.** Fotoğraflar ve Google Fonts internet üzerinden yüklenir. İnternet veya görsel servisi erişilemezse `assets/` klasöründeki özgün SVG illüstrasyonlar fotoğrafların yerini alır. Klasör yapısını koru.

## Tasarım

- **Stil:** Scandinavian minimal + modern boho + sıcak, editorial tipografi.
- **Renkler:** Kırık beyaz `#f8f4ed`, koyu adaçayı `#55634c`, terracotta `#a76753`, pastel blush `#edddd3`.
- **Fontlar:** Playfair Display (display), DM Sans (metin), Caveat (el yazısı notlar).
- **Workshop fikri:** “Creative Pinboard” — mantar panoya iliştirilmiş dört Polaroid kart, kategori filtresi, açılır detay pencereleri.
- **Ana bölümler:** Hero / Shop kategorileri / Workshops / Hediye fikri / Über Luuw / Mum ve malzeme illüstrasyonu / Journal / Newsletter / Footer.
- **Mum illüstrasyonu:** Cam mum çevresinde Sojawachs, Docht, Glas ve liebevolle Details. Görsel şematiktir; gerçek ürün bileşenleri yayın öncesinde teyit edilmelidir.

## Çalışan prototip özellikleri

- Mobil menü, arama alanı ve sayfa içi navigasyon.
- Workshop kategorilerini filtreleme ve 4 workshop detay penceresi.
- WooCommerce bağlantısı için hazırlanmış “Termine & Plätze” aksiyonu (link yoksa bilgilendirir).
- Shop kategorileri için demo detay pencereleri.
- Klavye ile modal kapatma, basit focus trap ve erişilebilir form/menü etiketleri.
- Newsletter/demo hesap ve sepet aksiyonlarında dürüst prototip bilgilendirmeleri; **gerçek sipariş, bülten aboneliği veya rezervasyon yapılmaz.**

## Workshop WooCommerce bağlantıları

`index.html` sonunda yer alan `workshopInfo` nesnesinde her workshop için `bookingUrl: ''` alanı bulunuyor. WooCommerce ürün sayfalarını oluşturduktan sonra URL'leri bu alanlara gir:

```js
blumen: { bookingUrl: '/produkt/blumenkerzen-workshop/', /* ... */ },
herbst: { bookingUrl: '/produkt/herbstkerzen-workshop/', /* ... */ },
keraflott: { bookingUrl: '/produkt/keraflott-workshop/', /* ... */ },
tufting: { bookingUrl: '/produkt/tufting-workshop/', /* ... */ }
```

Bunlar **örnek URL'lerdir, gerçek sayfa adresleri değildir**. Her atölye için tarih, fiyat ve kapasite göstermek isteniyorsa WooCommerce tarafında tarih bazlı stok/rezervasyon çözümü kurulmalı. Shop kategori kartları da gerçek WooCommerce kategori URL'lerine bağlanmalı.

## Tailwind derlemesi

Görüntüleme için kurulum gerekmez. **CSS kodunu değiştirip yeniden derlemek** istersen Node.js ile klasörde:

```bash
npm install
npm run build
```

- `tailwind.input.css`: Tailwind v4 teması ve renk/font token'ları.
- `build-css.js`: HTML içindeki Tailwind class'larını tarar ve `styles.css` üretir.
- `styles.css`: Sayfanın kullandığı derlenmiş Tailwind CSS. ZIP içinde hazır bulunur.
- `index.html`: Bölümler ve sayfa etkileşimi.
- `assets/`: Fotoğraf bağlantısı çalışmazsa görüntülenecek SVG illüstrasyonlar.

Tailwind utility class'ları HTML içinde literal tutulmuştur. Daha sonra JavaScript'te yeni dinamik utility class'ları üretirsen bunları CSS build safelist'ine de dahil etmen gerekir.

## WordPress + Elementor + WooCommerce için yayın kontrolü

Bu paket **statik tasarım prototipidir**, doğrudan çalışan WordPress teması veya WooCommerce şablonu **değildir**. Canlı siteye geçerken:

1. Ürün ve workshop fotoğraflarını Luuw Studio'nun kendi gerçek görselleriyle değiştir (Pexels görselleri tasarım amaçlı örnek materyaldir).
2. WooCommerce kategori bağlantıları, ürün sayfaları ve sepet/hesap/search aksiyonlarını bağla.
3. Dört atölyenin gerçek tarih/fiyat/kontenjanlarını bağla; ürün stokları ve rezervasyon tarihleri backend'den gelmeli.
4. Bülten formunu DSGVO'ya uygun **double opt-in** sistemi (ör. Brevo/Mailchimp) ve Datenschutz bağlantısıyla bağla.
5. İletişim sayfasını, gerçek iletişim bilgilerini, Impressum, Datenschutzerklärung, Widerrufsbelehrung ve gerekli Shop/Rechtstexte bağlantılarını ekle.
6. “Gratis Versand ab 50 €” metnini canlı WooCommerce kargo ayarıyla doğrula.
7. WordPress'e aktarırken ayrı sayfa bileşenleri, temaya özel Tailwind CSS build ve gerçek veriye bağlı ürün kartları kullan.

## Önemli görsel notu

Pexels görselleri ve `assets/*.svg` illüstrasyonları **Luuw Studio'nun gerçek ürün, ekip, mağaza veya workshop fotoğrafları olduğu iddiasını taşımaz**. Canlı kullanım öncesi gerçek fotoğraflar ve ürün metinleriyle değiştirilmeli; üçüncü taraf görsellerin ilgili lisans koşulları kontrol edilmeli.
