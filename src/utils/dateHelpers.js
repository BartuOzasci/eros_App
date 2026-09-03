const MS_PER_DAY = 1000 * 60 * 60 * 24;

/**
 * Tarihi yerel saat diliminde gece yarısına sabitler.
 * Böylece gün farkı hesapları saat/dakika kaymasından etkilenmez.
 */
const startOfDay = (value) => {
  const date = value instanceof Date ? new Date(value) : new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  date.setHours(0, 0, 0, 0);
  return date;
};

/** İki tarih arasındaki tam gün farkı (b - a). Gelecek pozitif, geçmiş negatiftir. */
const diffInDays = (from, to) => {
  const a = startOfDay(from);
  const b = startOfDay(to);
  if (!a || !b) return null;
  return Math.round((b - a) / MS_PER_DAY);
};

/**
 * Verilen tarihin üzerinden kaç gün geçtiğini döndürür.
 * Tarih gelecekteyse negatif değer döner (eski sürüm Math.abs ile
 * gelecek tarihleri de "geçmiş" gibi gösteriyordu).
 */
export const calculateDaysPassed = (pastDateString) =>
  diffInDays(pastDateString, new Date());

/** Verilen tarihe kaç gün kaldığını döndürür. Geçmişse negatiftir. */
export const daysUntil = (futureDateString) =>
  diffInDays(new Date(), futureDateString);

export const getCurrentYear = () => new Date().getFullYear();

/** Bir tarihe gün ekleyip yeni Date döndürür. */
export const addDays = (dateString, days) => {
  const date = startOfDay(dateString);
  if (!date) return null;
  date.setDate(date.getDate() + days);
  return date;
};

/** "9 Eylül 2026" biçiminde uzun Türkçe tarih. */
export const formatDateTR = (value) => {
  const date = startOfDay(value);
  if (!date) return "—";
  return date.toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

/** "9 Eyl" biçiminde kısa Türkçe tarih — dar kartlar için. */
export const formatShortTR = (value) => {
  const date = startOfDay(value);
  if (!date) return "—";
  return date.toLocaleDateString("tr-TR", { day: "numeric", month: "short" });
};

/** "Perşembe" gibi gün adı. */
export const formatWeekdayTR = (value) => {
  const date = startOfDay(value);
  if (!date) return "";
  return date.toLocaleDateString("tr-TR", { weekday: "long" });
};

/** Gün farkını insan diline çevirir: "Bugün", "3 gün sonra", "12 gün önce". */
export const formatRelativeDays = (dateString) => {
  const days = daysUntil(dateString);
  if (days === null) return "—";
  if (days === 0) return "Bugün";
  if (days === 1) return "Yarın";
  if (days === -1) return "Dün";
  return days > 0 ? `${days} gün sonra` : `${Math.abs(days)} gün önce`;
};

/**
 * Doğum tarihinden yaşı hesaplar.
 * @returns {{ years: number, months: number, totalMonths: number, label: string }}
 */
export const calculateAge = (dobString) => {
  const dob = startOfDay(dobString);
  const today = startOfDay(new Date());
  if (!dob || !today) {
    return { years: 0, months: 0, totalMonths: 0, label: "—" };
  }

  let months =
    (today.getFullYear() - dob.getFullYear()) * 12 +
    (today.getMonth() - dob.getMonth());
  if (today.getDate() < dob.getDate()) months -= 1;
  months = Math.max(months, 0);

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  let label;
  if (years === 0) label = `${remainingMonths} aylık`;
  else if (remainingMonths === 0) label = `${years} yaşında`;
  else label = `${years} yaş ${remainingMonths} ay`;

  return { years, months: remainingMonths, totalMonths: months, label };
};

/** Bir sonraki doğum gününe kalan gün sayısı. */
export const daysUntilBirthday = (dobString) => {
  const dob = startOfDay(dobString);
  const today = startOfDay(new Date());
  if (!dob || !today) return null;

  const next = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());
  if (next < today) next.setFullYear(next.getFullYear() + 1);
  return diffInDays(today, next);
};

/**
 * Aşı durumunu tek bir nesnede toplar; renk sınıflarını da buradan üretir.
 * @returns {{ key: string, label: string, dot: string, chip: string, icon: string }}
 */
export const getVaccineStatus = (dateString, isCompleted) => {
  if (isCompleted) {
    return {
      key: "completed",
      label: "Tamamlandı",
      dot: "bg-mint-400 border-mint-100 dark:border-mint-600/40",
      chip: "bg-mint-100 text-mint-600 dark:bg-mint-500/15 dark:text-mint-300",
    };
  }

  const remaining = daysUntil(dateString);

  if (remaining !== null && remaining < 0) {
    return {
      key: "overdue",
      label: "Gecikti",
      dot: "bg-blush-500 border-blush-100 dark:border-blush-600/40",
      chip: "bg-blush-100 text-blush-600 dark:bg-blush-500/15 dark:text-blush-300",
    };
  }

  if (remaining !== null && remaining <= 14) {
    return {
      key: "soon",
      label: remaining === 0 ? "Bugün" : `${remaining} gün kaldı`,
      dot: "bg-brand-400 border-brand-100 dark:border-brand-600/40",
      chip: "bg-brand-100 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300",
    };
  }

  return {
    key: "upcoming",
    label: "Planlandı",
    dot: "bg-ink-200 border-ink-100 dark:bg-night-500 dark:border-white/10",
    chip: "bg-ink-100 text-ink-500 dark:bg-white/5 dark:text-ink-300",
  };
};

/** Geriye dönük uyumluluk: eski imzayla nokta rengi sınıflarını döndürür. */
export const getVaccineStatusColor = (dateString, isCompleted) =>
  getVaccineStatus(dateString, isCompleted).dot;

/** Tamamlanmamış kayıtlar içinde tarihi en yakın olanı bulur. */
export const getNextRecord = (records = []) => {
  const upcoming = records
    .filter((item) => !item.isCompleted)
    .map((item) => ({ ...item, remaining: daysUntil(item.date) }))
    .filter((item) => item.remaining !== null && item.remaining >= 0)
    .sort((a, b) => a.remaining - b.remaining);

  return upcoming[0] ?? null;
};

/** Tarihi geçmiş ama yapılmamış kayıtlar. */
export const getOverdueRecords = (records = []) =>
  records.filter((item) => {
    if (item.isCompleted) return false;
    const remaining = daysUntil(item.date);
    return remaining !== null && remaining < 0;
  });
