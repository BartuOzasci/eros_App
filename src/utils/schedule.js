import { addInterval, diffInDays, parseDate } from "./dateHelpers";

/** Uygulamada listelenecek en eski kayıt bugünden kaç yıl önce olabilir. */
export const HISTORY_YEARS = 2;

/** Bu tarihten eski kayıtlar listelenmez (sıradaki doz hesabında yine kullanılır). */
export const getHistoryCutoff = (today = new Date()) =>
  addInterval(today, { years: -HISTORY_YEARS });

/** `isCompleted` yazılmamışsa kayıt yapılmış sayılır; yalnızca açıkça false olanlar plandır. */
const isDone = (record) =>
  record.isCompleted !== false && record.isCompleted !== "false";

/** `every: 90` gibi düz sayıları gün kabul eder. */
const normalizeEvery = (every) =>
  typeof every === "number" ? { days: every } : every;

/**
 * Bir seriyi (ör. Kuduz Aşısı ya da kuaför ziyaretleri) çözümler.
 *
 * Sıradaki tarih şu öncelikle belirlenir:
 *  1. Son yapılan dozdan sonraki planlı (`isCompleted: false`) kayıt — randevu
 *  2. Son yapılan doz + aralık (kaydın kendi `every`'si, yoksa serinin `every`'si)
 * Son dozdan önceye düşen planlar yok sayılır; onların yerine zaten yeni doz yapılmıştır.
 *
 * @param {{ id: string, name: string, every: object, records: object[] }} series
 */
export const resolveSeries = (series, today = new Date()) => {
  const records = [];
  const invalid = [];

  (series.records ?? []).forEach((record, index) => {
    const date = parseDate(record?.date);
    if (!date) {
      invalid.push({ series: series.name, value: String(record?.date ?? "") });
      return;
    }
    records.push({
      ...record,
      date,
      raw: record.date,
      done: isDone(record),
      key: `${series.id}-${index}`,
    });
  });

  records.sort((a, b) => a.date - b.date);

  const done = records.filter((record) => record.done);
  const lastDone = done.at(-1) ?? null;
  const planned =
    records.find((record) => !record.done && (!lastDone || record.date > lastDone.date)) ??
    null;

  const cycleEvery = normalizeEvery(lastDone?.every ?? series.every);

  let next = null;
  if (planned) {
    next = { date: planned.date, source: "planned", record: planned };
  } else if (lastDone && cycleEvery) {
    next = { date: addInterval(lastDone.date, cycleEvery), source: "auto" };
  }

  const cutoff = getHistoryCutoff(today);

  return {
    ...series,
    every: normalizeEvery(series.every),
    lastDone,
    next,
    /* Bugünden sıradaki doza kalan gün; geçtiyse negatif, hiç kayıt yoksa null */
    daysLeft: next ? diffInDays(today, next.date) : null,
    /* Son doz ile sıradaki doz arası — ilerleme çubukları için */
    cycleDays: lastDone && next ? diffInDays(lastDone.date, next.date) : null,
    /* Tüm yapılmış kayıtlar (eskiden yeniye) ve bunların listelenecek son 2 yılı */
    done,
    history: done.filter((record) => record.date >= cutoff),
    invalid,
  };
};

/** Tarihsiz (hiç kaydı olmayan) seriler en acil sayılıp başa alınır. */
const byUrgency = (a, b) => {
  if (!a.date || !b.date) return a.date ? 1 : b.date ? -1 : 0;
  return a.date - b.date;
};

/**
 * Aşı sayfası ve ana sayfa özeti için tüm serileri tek seferde çözümler.
 *  - pending: her seri için sıradaki doz, en acil olan başta
 *  - history: son 2 yılda yapılan dozlar, en yeni başta
 */
export const buildVaccineOverview = (seriesList, today = new Date()) => {
  const series = seriesList.map((item) => resolveSeries(item, today));

  const pending = series
    .map((item) => ({
      key: `${item.id}-next`,
      name: item.name,
      type: item.type,
      date: item.next?.date ?? null,
      isCompleted: false,
      daysLeft: item.daysLeft,
      series: item,
    }))
    .sort(byUrgency);

  const history = series
    .flatMap((item) =>
      item.history.map((record) => ({
        key: record.key,
        name: item.name,
        type: item.type,
        date: record.date,
        isCompleted: true,
        series: item,
      })),
    )
    .sort((a, b) => b.date - a.date);

  const overdue = pending.filter((item) => item.daysLeft === null || item.daysLeft < 0);

  return {
    series,
    pending,
    history,
    overdue,
    nextUp: pending[0] ?? null,
    upToDate: series.length - overdue.length,
    invalid: series.flatMap((item) => item.invalid),
  };
};
