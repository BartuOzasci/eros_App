<div align="center">
  <img src="public/icons/icon-512.png" alt="Eros App" width="120" height="120" />

  <h1>Eros App</h1>

  <p><strong>Toy Poodle Eros'un profili, aşı takvimi, kuaför döngüsü ve iletişim bilgilerini tek yerde toplayan mobil öncelikli PWA.</strong></p>

  <p>
    <img alt="React" src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" />
    <img alt="Vite" src="https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white" />
    <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss&logoColor=white" />
    <img alt="PWA" src="https://img.shields.io/badge/PWA-ready-5A0FC8?logo=pwa&logoColor=white" />
    <img alt="Lisans" src="https://img.shields.io/badge/Lisans-MIT-green" />
  </p>
</div>

---

## İçindekiler

- [Proje Hakkında](#proje-hakkında)
- [Özellikler](#özellikler)
- [Tasarım Sistemi](#tasarım-sistemi)
- [Teknolojiler](#teknolojiler)
- [Hızlı Başlangıç](#hızlı-başlangıç)
- [VS Code ile Çalıştırma](#vs-code-ile-çalıştırma)
- [Proje Yapısı](#proje-yapısı)
- [Veriyi Güncelleme](#veriyi-güncelleme)
- [Tarih Yardımcıları](#tarih-yardımcıları)
- [PWA](#pwa)
- [Dağıtım](#dağıtım)
- [Yol Haritası](#yol-haritası)
- [Lisans](#lisans)

---

## Proje Hakkında

**Eros App**, Toy Poodle cinsi bir köpek olan Eros için geliştirilmiş kişisel bakım takip uygulamasıdır. Amaç, "son kuaför ne zamandı?", "sıradaki parazit koruması ne zaman?" gibi soruların cevabına telefondan tek dokunuşla ulaşmaktır.

Uygulama **veritabanı veya backend kullanmaz**; tüm bilgiler `src/data/` altındaki düz JavaScript dosyalarında tutulur ve tarihe bağlı her şey (yaş, kalan gün, gecikme durumu) çalışma anında hesaplanır.

| Alan | Değer |
| --- | --- |
| Ad | Eros |
| Doğum Tarihi | 10 Ocak 2025 |
| Irk | Toy Poodle |
| Tüy Rengi | Apricot |
| Ağırlık | 3.79 kg |

---

## Özellikler

### Hakkımda

- Fotoğrafın bulanıklaştırılmış halinden oluşan atmosferik profil kartı
- **Yaş otomatik hesaplanır** (`1 yaş 7 ay`) — veriye elle yaş yazmaya gerek yok
- Künye ızgarası: yaş, ırk, ağırlık, tüy rengi
- "Bir Bakışta" özeti: sıradaki aşı ve son kuaför ziyareti, ilgili sayfalara kısayol
- Doğum gününe kalan gün sayacı

### Aşı Takvimi

- **Sıradaki doz otomatik hesaplanır:** `true` olan en son kaydın tarihine tekrar aralığı eklenir — iç-dış parazit **60 günde bir**, Bronşin, Karma, Kuduz ve Lyme **yılda bir**. Gelecek dozu dosyaya yazmaya gerek yoktur.
- Her bekleyen doz `45 gün kaldı` / `Bugün` / `5 gün gecikti` şeklinde geri sayar; altında son dozdan bu yana döngünün ne kadarının dolduğunu gösteren çubuk vardır
- **Koruma durumu:** kaç aşı türünün güncel olduğu (`5 / 5 tür güncel`)
- En acil doz için vurgu kartı (gecikmişse kırmızıya döner)
- **Hızlı kayıt:** bekleyen her dozdaki `Yapıldı` butonu, GitHub'a eklenecek satırı bugünün tarihiyle hazırlayıp kopyalar ve veri dosyasını GitHub düzenleyicisinde açar
- Önce sıradaki dozlar (en yakın başta), sonra **son 2 yılın geçmişi** (en yeni başta); 2 yıldan eski kayıtlar gösterilmez
- `Tümü · Yaklaşan · Tamamlanan` filtre sekmeleri, aya göre gruplanmış zaman çizelgesi
- Veri dosyasına okunamayan bir tarih yazılırsa sayfada uyarı çıkar
- Dinamik durum rozetleri:

  | Durum | Koşul |
  | --- | --- |
  | 🟢 Tamamlandı | `isCompleted: true` |
  | 🔴 N gün gecikti | Tarih geçmiş, yapılmamış |
  | 🟠 N gün kaldı | 14 gün içinde |
  | ⚪ N gün kaldı | Daha uzak bir tarih |

### Kuaför Takibi

- Önerilen bakım döngüsüne göre **dairesel ilerleme halkası** (`27 / 60 gün`)
- Duruma göre renk ve mesaj değişir: yeşil (zamanı var) → turuncu (yaklaşıyor) → pembe (randevu zamanı)
- Son ziyaret ve otomatik hesaplanan **önerilen sonraki tarih** (randevu girildiyse randevu tarihi)
- **Ziyaret geçmişi:** son 2 yılın ziyaretleri, aralarındaki gün sayısı ve ortalama ziyaret sıklığı
- Salon bilgisi, hizmet listesi ve ara bakım ipuçları

### İletişim

- Veteriner ve kuaför kartları
- Numaraya dokununca **telefon uygulaması açılır** (`tel:`)
- **Panoya kopyala** butonu (görsel geri bildirimli)
- Google Maps'te aç
- Acil durum hatırlatması

### Genel

- 🌙 **Açık / koyu tema** — tercih `localStorage`'da saklanır, ilk açılışta sistem ayarına uyar
- 📱 **Mobilde alt sekme çubuğu**, masaüstünde üst menü
- ♿ Klavye odak halkaları, `aria` etiketleri, `prefers-reduced-motion` desteği
- 🐾 404 sayfası

---

## Tasarım Sistemi

Palet, Eros'un kayısı (apricot) rengi tüylerinden türetilmiştir.

| Rol | Renk | Kullanım |
| --- | --- | --- |
| `brand` | `#F19B51` | Ana vurgu, butonlar, aktif durumlar |
| `blush` | `#FB7A95` | Kuaför, gecikmiş uyarılar |
| `mint` | `#4BBE8D` | Tamamlanmış kayıtlar, olumlu durum |
| `sky` | `#4FA4F0` | Veteriner, bilgi |
| `ink` | `#3E3932` | Metin ve nötr yüzeyler |
| `night` | `#14110F` | Koyu tema zemini (mavi değil, sıcak kömür) |

**Tipografi:** Başlıklar `Quicksand` (yumuşak, yuvarlak), gövde metni `Inter`.

**Yüzeyler:** `rounded-4xl` köşeler, cam efekti (`backdrop-blur`) ve yumuşak `shadow-soft` / `shadow-lift` gölgeler.

**Duyarlılık:** Mobil öncelikli. Kırılım noktası `md` (768px) — altında alt sekme çubuğu, üstünde üst menü. Izgaralar `2 → 4` sütuna açılır.

---

## Teknolojiler

| Teknoloji | Sürüm | Kullanım |
| --- | --- | --- |
| React | 19 | Arayüz |
| Vite | 8 | Derleme ve geliştirme sunucusu |
| Tailwind CSS | 3.4 | Stil ve duyarlı tasarım |
| React Router DOM | 7 | Yönlendirme |
| Lucide React | 0.5x | İkonlar |
| ESLint | 9 | Kod kalitesi |

---

## Hızlı Başlangıç

**Gereksinim:** [Node.js](https://nodejs.org) 20 veya üzeri (`node -v` ile kontrol edin).

```bash
git clone https://github.com/BartuOzasci/eros_App.git
cd eros_App
npm install
npm run dev
```

Tarayıcıda <http://localhost:5173> adresini açın.

### Komutlar

| Komut | Açıklama |
| --- | --- |
| `npm run dev` | Geliştirme sunucusu (anlık yenileme ile) |
| `npm run build` | `dist/` klasörüne production derlemesi |
| `npm run preview` | Derlenmiş sürümü yerelde önizle |
| `npm run lint` | ESLint kontrolü |

---

## VS Code ile Çalıştırma

### 1. Projeyi açın

```bash
git clone https://github.com/BartuOzasci/eros_App.git
cd eros_App
code .
```

> `code` komutu tanınmıyorsa: VS Code'u açın → `Ctrl+Shift+P` → **Shell Command: Install 'code' command in PATH**. Alternatif olarak **File → Open Folder** ile klasörü seçebilirsiniz.

### 2. Önerilen eklentileri kurun

Proje açıldığında VS Code sağ altta *"Bu çalışma alanı eklenti öneriyor"* bildirimi gösterir → **Install** deyin.

Elle kurmak isterseniz `Ctrl+Shift+X` ile Eklentiler sekmesini açıp arayın:

| Eklenti | Neden gerekli |
| --- | --- |
| **Tailwind CSS IntelliSense** | Sınıf adı tamamlama ve renk önizleme |
| **ESLint** | Hataları yazarken görme |
| **Prettier** | Kod biçimlendirme (opsiyonel) |
| **Error Lens** | Hataları satır sonunda gösterme (opsiyonel) |

`.vscode/settings.json` dosyası hazırdır; `@tailwind` uyarılarını kapatır ve kaydederken ESLint düzeltmelerini uygular.

### 3. Terminali açın

`Ctrl+Ö` (veya **Terminal → New Terminal**) ile VS Code içinde terminal açın.

> **Windows / PowerShell notu:** `npm` betikleri "bu sistemde betik çalıştırma devre dışı" hatası verirse terminali **yönetici** olarak açıp şunu çalıştırın:
> ```powershell
> Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
> ```

### 4. Bağımlılıkları kurun ve başlatın

```bash
npm install
```

```bash
npm run dev
```

Terminalde çıkan `http://localhost:5173/` bağlantısına `Ctrl` tuşuna basılı tutarak tıklayın — tarayıcıda açılır.

### 5. Geliştirmeye başlayın

Herhangi bir `.jsx` dosyasını kaydettiğinizde sayfa otomatik yenilenir. Sunucuyu durdurmak için terminalde `Ctrl+C`.

### 6. Hata ayıklama (opsiyonel)

`npm run dev` çalışırken `F5` tuşuna basın. `.vscode/launch.json` sayesinde Chrome açılır ve `.jsx` dosyalarınıza doğrudan kesme noktası (breakpoint) koyabilirsiniz.

### Sık karşılaşılan sorunlar

| Sorun | Çözüm |
| --- | --- |
| `'npm' is not recognized` | Node.js kurulu değil ya da PATH'te yok. Kurun ve VS Code'u yeniden başlatın. |
| Port 5173 dolu | `npm run dev -- --port 3000` |
| Stiller görünmüyor | Sunucuyu durdurup `npm run dev` ile yeniden başlatın |
| Tuhaf bağımlılık hataları | `node_modules` ve `package-lock.json` silinip `npm install` tekrar çalıştırılır |

---

## Proje Yapısı

```
eros_App/
├── .vscode/                    # Paylaşılan editör ayarları
├── public/
│   ├── icons/                  # Kare PWA ikonları (192/512, maskable, apple-touch-icon)
│   ├── favicon.svg             # Pati sekme simgesi
│   ├── manifest.json           # PWA manifesti
│   └── assets/img/
│       └── eros_about.webp     # Profil fotoğrafı
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Navbar.jsx          # Üst menü (masaüstü)
│   │   │   ├── BottomNav.jsx       # Alt sekme çubuğu (mobil)
│   │   │   ├── ThemeToggle.jsx     # Açık/koyu tema düğmesi
│   │   │   ├── PageHeader.jsx      # Ortak sayfa başlığı
│   │   │   ├── StatCard.jsx        # İstatistik kartı
│   │   │   ├── ProgressRing.jsx    # SVG dairesel ilerleme
│   │   │   ├── QuickRecordSheet.jsx # "Yapıldı" hızlı kayıt alt sayfası
│   │   │   ├── ScrollToTop.jsx     # Rota değişiminde başa sarma
│   │   │   └── Footer.jsx
│   │   └── layout/
│   │       └── AppLayout.jsx       # Ortak kabuk
│   ├── data/                       # Tüm içerik burada
│   │   ├── aboutData.js
│   │   ├── vaccinesData.js
│   │   ├── groomerData.js
│   │   ├── contactData.js
│   │   ├── navigation.js
│   │   └── repo.js                 # Hızlı kaydın açtığı GitHub deposu
│   ├── hooks/
│   │   └── useTheme.js
│   ├── pages/
│   │   ├── About.jsx
│   │   ├── Vaccines.jsx
│   │   ├── Groomer.jsx
│   │   ├── Contact.jsx
│   │   └── NotFound.jsx
│   ├── utils/
│   │   ├── dateHelpers.js          # Tarih ayrıştırma, biçimleme, aralık ekleme
│   │   └── schedule.js             # Sıradaki doz ve 2 yıllık geçmiş hesabı
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css               # Tailwind katmanları + tasarım token'ları
├── index.html
├── tailwind.config.js          # Palet, tipografi, animasyonlar
├── vercel.json                 # Tüm rotaları index.html'e yönlendirir (SPA)
└── vite.config.js
```

### Rotalar

| Rota | Sayfa |
| --- | --- |
| `/` | Hakkımda |
| `/vaccines` | Aşı Takvimi |
| `/groomer` | Kuaför Takibi |
| `/contact` | İletişim |
| `*` | 404 |

---

## Veriyi Güncelleme

Kod değiştirmeye gerek yok — yalnızca `src/data/` altındaki dosyaları düzenleyin. GitHub'da kaydettiğiniz değişiklik Vercel'de 1-2 dakika içinde yayına girer.

### Aşı veya parazit yapıldığında

`src/data/vaccinesData.js` içinde her koruma türü bir bloktur. Doz yapıldığında ilgili bloğun `records` listesine **bugünün tarihiyle tek satır** ekleyin:

```js
{
  id: "parazit",
  name: "İç Dış Parazit",
  type: "parasite",          // "vaccine" | "parasite"
  every: { days: 60 },       // tekrar aralığı: { days } | { months } | { years }
  records: [
    { date: "2026-07-09", isCompleted: true },
    { date: "2026-10-28", isCompleted: true },  // <- yeni satır
  ],
},
```

Sıradaki doz (`2026-10-28` + 60 gün = **27 Aralık 2026**) otomatik hesaplanır ve uygulamada `60 gün kaldı` olarak görünür. Gelecek dozu dosyaya yazmanıza gerek yoktur.

> **Telefondan en kısa yol:** Aşı sayfasında ilgili dozun `Yapıldı` butonuna dokunun. Satır kopyalanır ve dosya GitHub düzenleyicisinde açılır; yapıştırıp **Commit changes** demeniz yeterli.

İsteğe bağlı durumlar:

| Durum | Ne yazılır |
| --- | --- |
| Randevu tarihi belli | `{ date: "2026-12-20", isCompleted: false }` — otomatik tarih yerine bu gösterilir; yapılınca `true` yapıp tarihi güncelleyin |
| Farklı süreli ürün (ör. 3 aylık parazit) | `{ date: "2026-07-09", isCompleted: true, every: { months: 3 } }` — sıradaki doz bu kayda göre hesaplanır |
| Tarih biçimi | `"2026-10-28"` veya `"28.10.2026"` |
| 2 yıldan eski kayıtlar | Uygulamada gösterilmez; dosyadan silmek de güvenlidir |

### Kuaföre gidildiğinde

`src/data/groomerData.js` içindeki `visits` listesine bir satır ekleyin:

```js
visits: [
  { date: "2026-08-07", isCompleted: true },
  { date: "2026-10-28", isCompleted: true },  // <- yeni ziyaret
],
```

Son ziyaret, sayaç, ilerleme halkası, önerilen tarih (`every: { days: 60 }`) ve ziyaret geçmişi otomatik güncellenir. Randevu alındıysa satırı `isCompleted: false` ile ekleyin.

---

## Tarih Yardımcıları

`src/utils/dateHelpers.js` — tüm tarih mantığı burada toplanır. Hesaplamalar yerel gece yarısına sabitlenir, böylece saat farkından kaynaklı kaymalar oluşmaz.

| Fonksiyon | Döndürdüğü değer |
| --- | --- |
| `parseDate(value)` | `"2026-10-28"` / `"28.10.2026"` → yerel `Date`, okunamazsa `null` |
| `diffInDays(a, b)` | İki tarih arası gün farkı |
| `calculateDaysPassed(date)` | Geçen gün sayısı (gelecek tarihte negatif) |
| `daysUntil(date)` | Kalan gün sayısı |
| `addDays(date, n)` | `n` gün eklenmiş `Date` |
| `addInterval(date, { days, months, years })` | Aralık eklenmiş `Date` (31 Ocak + 1 ay → 28 Şubat) |
| `toISODate(date)` | `2026-10-28` |
| `calculateAge(dob)` | `{ years, months, totalMonths, label }` |
| `daysUntilBirthday(dob)` | Doğum gününe kalan gün |
| `formatDateTR(date)` | `9 Eylül 2026` |
| `formatShortTR(date)` | `9 Eyl` |
| `formatWeekdayTR(date)` | `Çarşamba` |
| `formatRelativeDays(date)` | `Bugün` / `3 gün sonra` / `12 gün önce` |
| `formatDueLabel(days)` | `Bugün` / `Yarın` / `12 gün kaldı` / `5 gün gecikti` |
| `formatInterval(every)` | `60 günde bir` / `Yılda bir` / `3 ayda bir` |
| `getVaccineStatus(date, done)` | `{ key, label, dot, chip }` durum nesnesi |

`src/utils/schedule.js` — tekrar eden kayıtların mantığı:

| Fonksiyon | Döndürdüğü değer |
| --- | --- |
| `resolveSeries(series)` | Bir tür için `lastDone`, `next` (randevu ya da otomatik), `daysLeft`, son 2 yılın `history`'si |
| `buildVaccineOverview(list)` | Tüm türler için `pending`, `history`, `overdue`, `nextUp` ve okunamayan tarihler |
| `HISTORY_YEARS` | Listelenecek geçmişin yıl sayısı (`2`) |

---

## PWA

Uygulama telefon ana ekranına eklenebilir.

- **Android / Chrome:** Menü → *Ana ekrana ekle*
- **iOS / Safari:** Paylaş → *Ana Ekrana Ekle*

Manifest; tam ekran (`standalone`) mod ve **hızlı eylem kısayolları** (Aşılar, Kuaför, İletişim) içerir.

**İkonlar** (`public/icons/`) kare ve oranları korunmuş PNG'lerdir:

| Dosya | Kullanım |
| --- | --- |
| `icon-192.png`, `icon-512.png` | Genel ikon (şeffaf zemin) |
| `icon-maskable-192.png`, `icon-maskable-512.png` | Android uyarlanabilir ikon; rozet %80 güvenli alanın içinde |
| `apple-touch-icon.png` | iOS ana ekranı (180px, opak zemin — iOS şeffaflığı siyaha boyar) |

> iOS ana ekran ikonunu önbellekte tutar. İkon güncellendiğinde uygulamayı ana ekrandan silip yeniden ekleyin.

> Çevrimdışı kullanım için Service Worker henüz eklenmemiştir — yol haritasında yer alıyor.

---

## Dağıtım

Uygulama tamamen statiktir; `npm run build` sonrası `dist/` klasörü herhangi bir statik sunucuya yüklenebilir.

**Vercel / Netlify:** Depoyu bağlayın, ayarlar otomatik algılanır.

| Ayar | Değer |
| --- | --- |
| Build command | `npm run build` |
| Output directory | `dist` |

> **Önemli:** İstemci tarafı yönlendirme kullanıldığı için, sunucunun tüm istekleri `index.html`'e yönlendirmesi gerekir. Aksi halde `/vaccines` adresini doğrudan açtığınızda, sayfayı yenilediğinizde ya da PWA kısayolundan girdiğinizde 404 alırsınız. Vercel için bu kural depodaki `vercel.json` dosyasındadır; Netlify'da `_redirects` içine `/* /index.html 200`, kendi sunucunuzda `try_files $uri /index.html;` benzeri bir kural ekleyin.

---

## Yol Haritası

- [ ] Service Worker ile çevrimdışı destek
- [ ] Aşı hatırlatma bildirimleri
- [x] Kuaför ziyaret geçmişi (tek tarih yerine liste)
- [x] Aşılarda otomatik sonraki doz ve hızlı kayıt
- [ ] Fotoğraf galerisi
- [ ] Kilo takibi grafiği
- [ ] Verileri tarayıcıda düzenleme (şu an kod içinde)

---

## Lisans

MIT

## Geliştirici

**Bartu Özaşçı** — [GitHub](https://github.com/BartuOzasci)

---

<div align="center">
  <sub>🐾 Eros için yapıldı</sub>
</div>
