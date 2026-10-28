/**
 * Aşı ve parazit takvimi — her blok bir koruma türüdür.
 *
 *   every   -> tekrar aralığı: { days: 60 } | { months: 3 } | { years: 1 }
 *   type    -> "vaccine" (aşı) | "parasite" (iç/dış parazit) — ikon ve filtre için
 *   records -> yapılan dozlar, her satır bir doz:
 *              { date: "2026-10-28", isCompleted: true },
 *
 * YENİ DOZ YAPILDIĞINDA: ilgili bloğun `records` listesine bugünün tarihiyle bir satır ekle.
 * Sıradaki doz, `true` olan en son kaydın tarihine `every` eklenerek otomatik hesaplanır
 * ve uygulamada "x gün kaldı" olarak görünür — gelecek dozu dosyaya yazmana gerek yok.
 *
 * İsteğe bağlı:
 *  - Randevu tarihi belliyse `{ date: "2026-12-20", isCompleted: false }` ekle. Otomatik tarih
 *    yerine bu gösterilir; yapıldığında `true` yap ve tarihi yapıldığı güne çevir.
 *  - Farklı süreli bir ürün kullanıldıysa (ör. 3 aylık parazit) kayda kendi süresini yaz:
 *    `{ date: "2026-07-09", isCompleted: true, every: { months: 3 } }`
 *
 * Tarih "2026-10-28" ya da "28.10.2026" biçiminde yazılabilir.
 * 2 yıldan eski kayıtlar uygulamada gösterilmez; dosyadan silinmeleri de güvenlidir.
 */
export const vaccinesData = [
  {
    id: "parazit",
    name: "İç Dış Parazit",
    type: "parasite",
    every: { days: 60 },
    records: [
      { date: "2026-01-02", isCompleted: true },
      { date: "2026-03-09", isCompleted: true },
      { date: "2026-05-09", isCompleted: true },
      { date: "2026-07-09", isCompleted: true, every: { months: 3 } },
      { date: "2026-10-28", isCompleted: true },
    ],
  },
  {
    id: "bronsin",
    name: "Bronşin Aşısı",
    type: "vaccine",
    every: { years: 1 },
    records: [
      { date: "2026-04-06", isCompleted: true },
    ],
  },
  {
    id: "karma",
    name: "Köpek Karma Aşısı",
    type: "vaccine",
    every: { years: 1 },
    records: [
      { date: "2026-05-05", isCompleted: true },
    ],
  },
  {
    id: "kuduz",
    name: "Kuduz Aşısı",
    type: "vaccine",
    every: { years: 1 },
    records: [
      { date: "2026-06-10", isCompleted: true },
    ],
  },
  {
    id: "lyme",
    name: "Lyme Aşısı",
    type: "vaccine",
    every: { years: 1 },
    records: [
      { date: "2026-06-15", isCompleted: true },
    ],
  },
];
