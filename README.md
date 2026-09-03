<div align="center">
  <img src="public/app-icon.svg" alt="Eros App" width="120" height="120" />

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

- Yüzdelik **tamamlanma çubuğu** ve tamamlanan / planlanan / geciken sayıları
- **Sıradaki kayıt** vurgu kartı ve geri sayım (`6 gün sonra`)
- `Tümü · Yaklaşan · Tamamlanan` filtre sekmeleri
- **Aya göre gruplanmış** dikey zaman çizelgesi
- Aşı ve parazit kayıtları farklı ikonlarla ayrışır
- Dinamik durum rozetleri:

  | Durum | Koşul |
  | --- | --- |
  | 🟢 Tamamlandı | `isCompleted: true` |
  | 🔴 Gecikti | Tarih geçmiş, yapılmamış |
  | 🟠 N gün kaldı | 14 gün içinde |
  | ⚪ Planlandı | Daha uzak bir tarih |

### Kuaför Takibi

- Önerilen bakım döngüsüne göre **dairesel ilerleme halkası** (`27 / 60 gün`)
- Duruma göre renk ve mesaj değişir: yeşil (zamanı var) → turuncu (yaklaşıyor) → pembe (randevu zamanı)
- Son ziyaret ve otomatik hesaplanan **önerilen sonraki tarih**
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
│   ├── app-icon.svg            # PWA ikonu (vektörel, maskelenebilir)
│   ├── app_icon.png            # PNG yedek ikon
│   ├── favicon.svg             # Pati sekme simgesi
│   ├── manifest.json           # PWA manifesti
│   └── assets/img/
│       └── eros_about.jpg      # Profil fotoğrafı
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Navbar.jsx          # Üst menü (masaüstü)
│   │   │   ├── BottomNav.jsx       # Alt sekme çubuğu (mobil)
│   │   │   ├── ThemeToggle.jsx     # Açık/koyu tema düğmesi
│   │   │   ├── PageHeader.jsx      # Ortak sayfa başlığı
│   │   │   ├── StatCard.jsx        # İstatistik kartı
│   │   │   ├── ProgressRing.jsx    # SVG dairesel ilerleme
│   │   │   ├── ScrollToTop.jsx     # Rota değişiminde başa sarma
│   │   │   └── Footer.jsx
│   │   └── layout/
│   │       └── AppLayout.jsx       # Ortak kabuk
│   ├── data/                       # Tüm içerik burada
│   │   ├── aboutData.js
│   │   ├── vaccinesData.js
│   │   ├── groomerData.js
│   │   ├── contactData.js
│   │   └── navigation.js
│   ├── hooks/
│   │   └── useTheme.js
│   ├── pages/
│   │   ├── About.jsx
│   │   ├── Vaccines.jsx
│   │   ├── Groomer.jsx
│   │   ├── Contact.jsx
│   │   └── NotFound.jsx
│   ├── utils/
│   │   └── dateHelpers.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css               # Tailwind katmanları + tasarım token'ları
├── index.html
├── tailwind.config.js          # Palet, tipografi, animasyonlar
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

Kod değiştirmeye gerek yok — yalnızca `src/data/` altındaki dosyaları düzenleyin.

**Yeni aşı eklemek** (`src/data/vaccinesData.js`):

```js
{
  id: 11,
  name: "Kuduz Aşısı",
  date: "2027-06-10",     // YYYY-AA-GG
  isCompleted: false,
  type: "vaccine",         // "vaccine" | "parasite"
}
```

**Kuaför ziyaretini güncellemek** (`src/data/groomerData.js`):

```js
export const groomerData = {
  lastVisit: "2026-10-06",  // yeni tarihi yazın
  intervalDays: 60,         // önerilen bakım aralığı
  // ...
};
```

Sayaç, ilerleme halkası ve "önerilen tarih" otomatik güncellenir.

---

## Tarih Yardımcıları

`src/utils/dateHelpers.js` — tüm tarih mantığı burada toplanır. Hesaplamalar yerel gece yarısına sabitlenir, böylece saat farkından kaynaklı kaymalar oluşmaz.

| Fonksiyon | Döndürdüğü değer |
| --- | --- |
| `calculateDaysPassed(date)` | Geçen gün sayısı (gelecek tarihte negatif) |
| `daysUntil(date)` | Kalan gün sayısı |
| `addDays(date, n)` | `n` gün eklenmiş `Date` |
| `calculateAge(dob)` | `{ years, months, totalMonths, label }` |
| `daysUntilBirthday(dob)` | Doğum gününe kalan gün |
| `formatDateTR(date)` | `9 Eylül 2026` |
| `formatShortTR(date)` | `9 Eyl` |
| `formatWeekdayTR(date)` | `Çarşamba` |
| `formatRelativeDays(date)` | `Bugün` / `3 gün sonra` / `12 gün önce` |
| `getVaccineStatus(date, done)` | `{ key, label, dot, chip }` durum nesnesi |
| `getNextRecord(list)` | Tamamlanmamış en yakın kayıt |
| `getOverdueRecords(list)` | Tarihi geçmiş kayıtlar |

---

## PWA

Uygulama telefon ana ekranına eklenebilir.

- **Android / Chrome:** Menü → *Ana ekrana ekle*
- **iOS / Safari:** Paylaş → *Ana Ekrana Ekle*

Manifest; tam ekran (`standalone`) mod, maskelenebilir vektör ikon ve **hızlı eylem kısayolları** (Aşılar, Kuaför, İletişim) içerir.

> Çevrimdışı kullanım için Service Worker henüz eklenmemiştir — yol haritasında yer alıyor.

---

## Dağıtım

Uygulama tamamen statiktir; `npm run build` sonrası `dist/` klasörü herhangi bir statik sunucuya yüklenebilir.

**Vercel / Netlify:** Depoyu bağlayın, ayarlar otomatik algılanır.

| Ayar | Değer |
| --- | --- |
| Build command | `npm run build` |
| Output directory | `dist` |

> **Önemli:** İstemci tarafı yönlendirme kullanıldığı için, sunucunun tüm istekleri `index.html`'e yönlendirmesi gerekir. Aksi halde `/vaccines` adresini doğrudan açtığınızda 404 alırsınız. Vercel ve Netlify bunu Vite projelerinde otomatik yapar; kendi sunucunuzda `try_files $uri /index.html;` benzeri bir kural ekleyin.

---

## Yol Haritası

- [ ] Service Worker ile çevrimdışı destek
- [ ] Aşı hatırlatma bildirimleri
- [ ] Kuaför ziyaret geçmişi (tek tarih yerine liste)
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
