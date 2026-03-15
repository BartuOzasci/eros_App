# 🐾 Eros App - Toy Poodle Web & PWA Uygulaması

<div align="center">
  <img src="public/app_icon.png" alt="Eros App Logo" width="200" height="200" />
  
  **Eros**, sevimli bir Toy Poodle için özel olarak tasarlanmış, modern, responsive ve PWA destekli bir web uygulaması.
  
  [📱 Mobil Öncelikli](#responsive-tasarım) • [🎨 Sevimli Tema](#tasarım-dili) • [⚡ Hızlı & Hafif](#teknolojiler) • [📲 PWA Desteği](#pwa-özellikleri)
</div>

---

## 📖 Proje Hakkında

**Eros App**, Toy Poodle cinsi bir köpek olan "Eros" için geliştirilmiş bir kişisel bilgi ve sağlık takip uygulamasıdır. Uygulama, Eros'un profilini, aşı takvimini, kuaför ziyaretlerini ve veteriner iletişim bilgilerini yönetmek için tasarlanmıştır.

### Eros'un Bilgileri

- **Ad:** Eros
- **Doğum Tarihi:** 10.01.2025
- **Irk:** Toy Poodle
- **Ağırlık:** 3.79 Kg

---

## ✨ Özellikler

### 🏠 Hakkımda Sayfası

- Eros'un sevimli profil fotoğrafı (rounded-full, şık border)
- Detaylı bilgiler: Ad, doğum tarihi, ırk, ağırlık
- "Pet Kimlik Kartı" stilinde tasarım

### 💉 Aşılarım Sayfası (Timeline & Dinamik Renk)

- Mevcut yılı başlık olarak gösteren dikey timeline UI
- **Otomatik Kronolojik Sıralama:** Aşılar tarihine göre otomatik olarak sıralanır
- **Dinamik Renk Algoritması:**
  - 🟢 **Yeşil:** Aşı tamamlanmış (isCompleted: true)
  - 🔴 **Kırmızı:** Aşı tarihi geçmiş ve yapılmamış (tarih < bugün AND isCompleted: false)
  - ⚫ **Gri:** Aşı tarihi henüz gelmemiş

### 🧴 Kuaför Sayfası (Otomatik Zaman Hesaplama)

- Son kuaför ziyaret tarihi gösterilir
- **Otomatik gün sayacı:** Bugün ile son ziyaret tarihi arasındaki gün farkı hesaplanır
- Pastel tasarımla şık gösterim

### 📞 İletişim Sayfası

- **Veteriner Kartı:** İsim, telefon numarası, Google Maps açacak buton
- **Kuaför Kartı:** İsim, telefon numarası, Google Maps açacak buton
- Hızlı arama ve harita navigasyonu

---

## 🎨 Tasarım Dili

### Tema Paleti

- **Primer Renk:** #fbd38d (Pastel Turuncu/Sarı)
- **Sekonder Renk:** #fed7e2 (Pastel Pembe)
- **Arka Plan:** #fffaf0 (Açık Krem)
- **Metin Rengi:** #4a5568 (Yumuşak Gri/Siyah)

### Responsive Tasarım

- 📱 **Mobil-First Approach:** Ana fokus mobil ekranlar
- 💻 **Tablet & Desktop:** Şık görünüm ve uyumlu layout
- 🎯 **Hamburger Menu:** Sadece mobil ekranlarda görünür
- 🔗 **Active Link Styling:** Mevcut sayfanın navbar linki highlight edilir

### UI Stilizasyonu

- Yuvarlatılmış köşeler (`rounded-2xl`, `rounded-[30px]`)
- Yumuşak gölgeler (`shadow-soft`)
- Smooth transitions ve hover efektleri

---

## 🛠️ Teknolojiler

| Teknoloji            | Versiyon | Kullanım                    |
| -------------------- | -------- | --------------------------- |
| **React**            | 18+      | Frontend framework          |
| **Vite**             | 8.0.0    | Build tool & Dev server     |
| **Tailwind CSS**     | 3.x      | Styling & Responsive design |
| **React Router DOM** | Latest   | Client-side routing         |
| **Lucide React**     | Latest   | Icon library                |

---

## 📁 Dosya Yapısı

```
ErosAPP/
├── public/
│   ├── manifest.json          # PWA manifest dosyası
│   ├── app_icon.png           # PWA uygulama ikonu
│   └── assets/
│       └── img/
│           └── eros-profile.jpg    # Profil fotoğrafı
├── src/
│   ├── assets/
│   │   └── img/              # Uygulama içi görseller
│   ├── components/
│   │   └── common/
│   │       └── Navbar.jsx    # Navigasyon çubuğu
│   ├── pages/
│   │   ├── About.jsx         # Hakkımda sayfası
│   │   ├── Vaccines.jsx      # Aşılarım sayfası (Timeline)
│   │   ├── Groomer.jsx       # Kuaför sayfası
│   │   └── Contact.jsx       # İletişim sayfası
│   ├── data/
│   │   ├── aboutData.js      # Profil verileri
│   │   ├── vaccinesData.js   # Aşı verileri
│   │   ├── groomerData.js    # Kuaför verileri
│   │   └── contactData.js    # İletişim verileri
│   ├── utils/
│   │   └── dateHelpers.js    # Tarih hesaplama fonksiyonları
│   ├── App.jsx               # Root component
│   ├── main.jsx              # Entry point
│   └── index.css             # Global stiller
├── index.html                # HTML template
├── tailwind.config.js        # Tailwind konfigürasyonu
├── postcss.config.js         # PostCSS konfigürasyonu
├── package.json              # Bağımlılıklar
├── vite.config.js            # Vite konfigürasyonu
└── README.md                 # Bu dosya
```

---

## 🚀 Kurulum ve Çalıştırma

### Gereksinimler

- Node.js 16+
- npm veya yarn

### Adım Adım Kurulum

1. **Repository'i klonla:**

   ```bash
   git clone https://github.com/BartuOzasci/eros_App.git
   cd eros_App
   ```

2. **Bağımlılıkları yükle:**

   ```bash
   npm install
   ```

3. **Geliştirme sunucusunu başlat:**

   ```bash
   npm run dev
   ```

   → Application çalışacak: `http://localhost:5173/`

4. **Production build oluştur:**

   ```bash
   npm run build
   ```

5. **Build'i preview et (localhost'ta):**
   ```bash
   npm run preview
   ```

---

## 📲 PWA Özellikleri

Eros App, Progressive Web App standartlarını destekler:

- ✅ **Manifest Dosyası:** `manifest.json` ile telefon ana ekranına ekleme desteği
- ✅ **Apple Touch Icon:** iOS cihazlarda özel ikon gösterilir
- ✅ **Responsive Design:** Tüm cihazlarda mükemmel görünüm
- ✅ **Fast Load:** Vite'nin hızlı build sistemi
- ✅ **Modern ES6+ Code:** Tüm tarayıcılarda uyumlu

### PWA olarak Kurulum

**Android/Chrome:**

1. Uygulama adresine git
2. Menüden "Ana ekrana ekle" seçeneğini tıkla
3. Eros App telefon ana ekranında görünecek

**iOS/Safari:**

1. Uygulama adresine git
2. Safari'de "Paylaş" butonu → "Ana Ekrana Ekle"
3. Eros App telefon ana ekranında görünecek

---

## 🔧 utils/dateHelpers.js - Tarih Fonksiyonları

### `calculateDaysPassed(pastDateString)`

İki tarih arasındaki gün farkını hesaplar.

```javascript
const days = calculateDaysPassed("2025-01-15");
// Sonuç: 60 (örnek)
```

### `getCurrentYear()`

Mevcut takvim yılını döndürür.

```javascript
const year = getCurrentYear(); // 2026
```

### `getVaccineStatusColor(dateString, isCompleted)`

Aşı durumuna göre renk CSS sınıfı döndürür.

```javascript
const color = getVaccineStatusColor("2025-03-01", true);
// Sonuç: "bg-green-100 text-green-700 border-green-400"
```

---

## 📊 Data Yapıları

### aboutData.js

```javascript
{
  name: "Eros",
  dob: "10.01.2025",
  breed: "Toy Poodle",
  weight: "3.79 Kg",
  image: "/assets/img/eros-profile.jpg"
}
```

### vaccinesData.js

```javascript
[
  { id: 1, name: "Karma Aşı 1", date: "2025-03-01", isCompleted: true },
  { id: 2, name: "Kuduz Aşısı", date: "2025-04-15", isCompleted: false },
  { id: 3, name: "Lyme Aşısı", date: "2026-10-01", isCompleted: false },
];
```

### groomerData.js

```javascript
{
  lastVisit: "2025-01-15"; // YYYY-MM-DD formatı
}
```

### contactData.js

```javascript
{
  vet: { name: "...", phone: "+90 ...", mapUrl: "https://..." },
  groomer: { name: "...", phone: "+90 ...", mapUrl: "https://..." }
}
```

---

## 🌐 Deployment (Vercel)

### Vercel'e Deploy Etme

1. [Vercel](https://vercel.com) hesabına giriş yap
2. GitHub repository'nizi seçin
3. "Deploy" butonuna tıklayın
4. ~1 dakika içinde canlı olacak

**Deployment URL:** `https://eros-app.vercel.app`

### Ortam Değişkenleri

`.env.local` dosyası varsa Vercel'de ayarlanmalıdır (şu anda gerekli değil).

---

## 🎯 Sayfa Rotalama (React Router)

| Rota        | Sayfa    | Açıklama                    |
| ----------- | -------- | --------------------------- |
| `/`         | About    | Profil & Kimlik Kartı       |
| `/vaccines` | Vaccines | Aşı Takvimi & Timeline      |
| `/groomer`  | Groomer  | Son Kuaför Ziyareti         |
| `/contact`  | Contact  | Veteriner & Kuaför İletişim |

---

## 🔄 V1.0 Sürüm Notları (Release)

### Tamamlanan Özellikler

✅ Temel proje yapısı ve mimarisi
✅ Responsive navbar ve hamburger menu
✅ Dört ana sayfa (About, Vaccines, Groomer, Contact)
✅ Otomatik chronological sıralama (Vaccines)
✅ Dinamik renk algoritması (Aşı durumu)
✅ Tarih hesaplama fonksiyonları
✅ PWA manifest ve ikonları
✅ Tailwind CSS tema
✅ Clean Code & modüler yapı

### Gelecek Sürümler (Roadmap)

- 📋 Service Worker & Offline Support
- 🔔 Aşı hatırlatma bildirimleri
- 📸 Fotoğraf yükleme özellikleri
- 📝 Notlar ve loglar
- 🌙 Dark mode desteği
- 🌍 Multi-language support

---

## 📝 Lisans

Eros App, MIT Lisansı altında açık kaynak olarak yayımlanmaktadır.

---

## 👨‍💻 Gelistirici

Bartu Özaşçı

---

## 💬 Destek & Geri Bildirim

Sorun, öneriler veya sorular için GitHub Issues'i kullanabilirsiniz.

---

## 🙏 Teşekkürler

- [Vite](https://vitejs.dev)
- [React](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [React Router](https://reactrouter.com)
- [Lucide React](https://lucide.dev)

---

<div align="center">
  
  **Eros App v1.0** 🐾 Made with ❤️

</div>
