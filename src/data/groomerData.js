export const groomerData = {
  /* Toy Poodle tüyü sürekli uzadığı için önerilen tıraş aralığı */
  every: { days: 60 },
  /*
   * Ziyaret geçmişi. Kuaföre her gidişte listeye bir satır ekle:
   *   { date: "2026-10-28", isCompleted: true },
   * En son tarih "son ziyaret" olur, önerilen tarih otomatik hesaplanır.
   * Randevu alındıysa `isCompleted: false` ile ekle; gidince `true` yap.
   */
  visits: [
    { date: "2026-01-27", isCompleted: true },
    { date: "2026-04-08", isCompleted: true },
    { date: "2026-06-06", isCompleted: true },
    { date: "2026-08-07", isCompleted: true },
  ],
  salon: "Pet Style Shop & Coiffeur",
  services: ["Tüy kesimi", "Banyo", "Tırnak bakımı", "Kulak temizliği"],
  tips: [
    "Keçeleşmeyi önlemek için tüyleri haftada 2-3 kez tarayın.",
    "Kulak çevresindeki tüyleri kısa tutmak enfeksiyon riskini azaltır.",
    "Tırnaklar zemine değecek kadar uzadıysa kesim zamanı gelmiştir.",
  ],
};
