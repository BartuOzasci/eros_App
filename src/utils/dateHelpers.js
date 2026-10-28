const MS_PER_DAY = 1000 * 60 * 60 * 24;

const ISO_DATE = /^(\d{4})-(\d{1,2})-(\d{1,2})$/;
const TR_DATE = /^(\d{1,2})[./](\d{1,2})[./](\d{4})$/;

/**
 * Tarihi yerel saat diliminde gece yarısına sabitler; okunamazsa null döner.
 * Böylece gün farkı hesapları saat/dakika kaymasından etkilenmez.
 *
 * "2026-10-28" ve GitHub'dan elle yazılabilecek "28.10.2026" biçimlerini kabul eder.
 * Saf tarih metni yerel tarih olarak kurulur: `new Date("2026-10-28")` UTC kabul
 * edildiği için UTC'nin batısındaki saat dilimlerinde bir gün geriye kayıyordu.
 */
export const parseDate = (value) => {
  if (value instanceof Date || typeof value === "number") {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return null;
    date.setHours(0, 0, 0, 0);
    return date;
  }

  if (typeof value !== "string") return null;

  const text = value.trim();
  let parts = text.match(ISO_DATE)?.slice(1).map(Number);
  if (!parts) {
    const tr = text.match(TR_DATE)?.slice(1).map(Number);
    if (tr) parts = [tr[2], tr[1], tr[0]];
  }
  if (!parts) return null;

  const [year, month, day] = parts;
  const date = new Date(year, month - 1, day);
  /* 2026-02-31 gibi taşan tarihleri sessizce 3 Mart'a çevirmek yerine reddet */
  if (date.getMonth() !== month - 1 || date.getDate() !== day) return null;
  return date;
};

/** İki tarih arasındaki tam gün farkı (b - a). Gelecek pozitif, geçmiş negatiftir. */
export const diffInDays = (from, to) => {
  const a = parseDate(from);
  const b = parseDate(to);
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
  const date = parseDate(dateString);
  if (!date) return null;
  date.setDate(date.getDate() + days);
  return date;
};

/**
 * Tarihe `{ days, months, years }` biçimli bir aralık ekler (negatif değerler geriye gider).
 * Ay/yıl eklerken gün, hedef ayın son gününe sabitlenir: 31 Ocak + 1 ay -> 28 Şubat.
 */
export const addInterval = (value, { days = 0, months = 0, years = 0 } = {}) => {
  const date = parseDate(value);
  if (!date) return null;

  const totalMonths = years * 12 + months;
  if (totalMonths) {
    const day = date.getDate();
    date.setDate(1);
    date.setMonth(date.getMonth() + totalMonths);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    date.setDate(Math.min(day, lastDay));
  }

  if (days) date.setDate(date.getDate() + days);
  return date;
};

/** Yerel tarihi veri dosyalarındaki "2026-10-28" biçimine çevirir. */
export const toISODate = (value) => {
  const date = parseDate(value);
  if (!date) return "";
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
};

const INTERVAL_UNITS = [
  { key: "years", unit: "yıl", every: "yılda", single: "Yılda bir", adjective: "yıllık" },
  { key: "months", unit: "ay", every: "ayda", single: "Ayda bir", adjective: "aylık" },
  { key: "days", unit: "gün", every: "günde", single: "Her gün", adjective: "günlük" },
];

/** `{ days: 60 }` -> "60 günde bir", `{ years: 1 }` -> "Yılda bir", `{ months: 3 }` -> "3 ayda bir". */
export const formatInterval = (every = {}) => {
  const parts = INTERVAL_UNITS.filter((u) => every[u.key]);
  if (!parts.length) return "";
  if (parts.length === 1 && every[parts[0].key] === 1) return parts[0].single;

  return `${parts
    .map((u, i) => `${every[u.key]} ${i === parts.length - 1 ? u.every : u.unit}`)
    .join(" ")} bir`;
};

/** `{ days: 60 }` -> "60 günlük" — "60 günlük bakım döngüsü" gibi ifadeler için. */
export const formatIntervalAdjective = (every = {}) =>
  INTERVAL_UNITS.filter((u) => every[u.key])
    .map((u, i, list) => `${every[u.key]} ${i === list.length - 1 ? u.adjective : u.unit}`)
    .join(" ");

/** "9 Eylül 2026" biçiminde uzun Türkçe tarih. */
export const formatDateTR = (value) => {
  const date = parseDate(value);
  if (!date) return "—";
  return date.toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

/** "9 Eyl" biçiminde kısa Türkçe tarih — dar kartlar için. */
export const formatShortTR = (value) => {
  const date = parseDate(value);
  if (!date) return "—";
  return date.toLocaleDateString("tr-TR", { day: "numeric", month: "short" });
};

/** "Perşembe" gibi gün adı. */
export const formatWeekdayTR = (value) => {
  const date = parseDate(value);
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

/** Sıradaki doz için geri sayım: "Bugün", "Yarın", "12 gün kaldı", "5 gün gecikti". */
export const formatDueLabel = (days) => {
  if (days === null || days === undefined) return "Kayıt yok";
  if (days === 0) return "Bugün";
  if (days === 1) return "Yarın";
  return days > 0 ? `${days} gün kaldı` : `${Math.abs(days)} gün gecikti`;
};

/**
 * Doğum tarihinden yaşı hesaplar.
 * @returns {{ years: number, months: number, totalMonths: number, label: string }}
 */
export const calculateAge = (dobString) => {
  const dob = parseDate(dobString);
  const today = parseDate(new Date());
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
  const dob = parseDate(dobString);
  const today = parseDate(new Date());
  if (!dob || !today) return null;

  const next = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());
  if (next < today) next.setFullYear(next.getFullYear() + 1);
  return diffInDays(today, next);
};

/**
 * Aşı durumunu tek bir nesnede toplar; renk sınıflarını da buradan üretir.
 * Tamamlanmamış kayıtlarda etiket her zaman geri sayımdır ("45 gün kaldı");
 * 14 gün kala turuncuya, tarih geçince kırmızıya döner.
 * @returns {{ key: string, label: string, dot: string, chip: string }}
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

  if (remaining === null || remaining < 0) {
    return {
      key: "overdue",
      label: formatDueLabel(remaining),
      dot: "bg-blush-500 border-blush-100 dark:border-blush-600/40",
      chip: "bg-blush-100 text-blush-600 dark:bg-blush-500/15 dark:text-blush-300",
    };
  }

  if (remaining <= 14) {
    return {
      key: "soon",
      label: formatDueLabel(remaining),
      dot: "bg-brand-400 border-brand-100 dark:border-brand-600/40",
      chip: "bg-brand-100 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300",
    };
  }

  return {
    key: "upcoming",
    label: formatDueLabel(remaining),
    dot: "bg-ink-200 border-ink-100 dark:bg-night-500 dark:border-white/10",
    chip: "bg-ink-100 text-ink-500 dark:bg-white/5 dark:text-ink-300",
  };
};
