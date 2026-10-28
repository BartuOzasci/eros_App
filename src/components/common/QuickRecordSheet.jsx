import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CalendarCheck2, Check, Copy, ExternalLink, X } from "lucide-react";
import { githubEditUrl } from "../../data/repo";
import { addInterval, formatDateTR, toISODate } from "../../utils/dateHelpers";

const buildLine = (date) => `{ date: "${date}", isCompleted: true },`;

/**
 * "Yapıldı olarak kaydet" alt sayfası.
 * Uygulama statik olduğu için veriyi kendisi yazamaz; bunun yerine GitHub'a eklenecek
 * satırı hazırlar, panoya kopyalar ve veri dosyasını GitHub düzenleyicisinde açar.
 *
 * Yalnızca açıkken render edilir — kapanınca üst bileşen onu DOM'dan kaldırır.
 * @param {{ title: string, every?: object, plannedDate?: string, filePath: string,
 *           listName?: string, onClose: () => void }} props
 */
const QuickRecordSheet = ({
  title,
  every,
  plannedDate,
  filePath,
  listName = "records",
  onClose,
}) => {
  const dialogRef = useRef(null);
  const today = toISODate(new Date());
  const [date, setDate] = useState(today);
  const [copyState, setCopyState] = useState("idle");

  const line = buildLine(date || today);
  const nextDate = every ? addInterval(date || today, every) : null;

  useEffect(() => {
    const dialog = dialogRef.current;
    /* StrictMode efekti iki kez çalıştırır; açık diyaloğu tekrar açmak hata verir */
    if (dialog && !dialog.open) dialog.showModal();

    /* Sayfa arkada kaymasın */
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previousOverflow;
    };
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(line);
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }
  };

  const close = () => dialogRef.current?.close();

  /* body'ye taşınır: sayfa kapsayıcısındaki space-y-* boşlukları alt sayfayı yukarı itmesin */
  return createPortal(
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(event) => {
        /* Yalnızca karartılmış arka plana dokunulunca kapan */
        if (event.target === event.currentTarget) close();
      }}
      aria-labelledby="quick-record-title"
      className="m-0 mt-auto w-full max-w-none bg-transparent p-0 backdrop:bg-ink-900/50
                 backdrop:backdrop-blur-sm sm:m-auto sm:max-w-md"
    >
      <div
        className="rounded-t-4xl bg-white p-5 text-ink-700 shadow-lift animate-fade-up
                   dark:bg-night-800 dark:text-ink-100 sm:rounded-4xl"
        style={{ paddingBottom: "calc(1.25rem + env(safe-area-inset-bottom))" }}
      >
        {/* Tutamaç: mobilde alt sayfa olduğunu belli eder */}
        <span
          className="mx-auto mb-4 block h-1.5 w-10 rounded-full bg-ink-200 dark:bg-white/10 sm:hidden"
          aria-hidden="true"
        />

        <div className="flex items-start gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-mint-gradient text-white shadow-soft">
            <CalendarCheck2 className="h-5 w-5" strokeWidth={2.2} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="section-title">Yapıldı olarak kaydet</p>
            <h2
              id="quick-record-title"
              className="font-display text-lg font-bold leading-snug text-ink-800 dark:text-ink-50"
            >
              {title}
            </h2>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Kapat"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-2xl text-ink-400 transition-colors
                       hover:bg-ink-50 hover:text-ink-600 dark:hover:bg-white/5 dark:hover:text-ink-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <label className="mt-5 block">
          <span className="text-xs font-semibold text-ink-500 dark:text-ink-300">
            Yapıldığı tarih
          </span>
          <input
            type="date"
            value={date}
            max={today}
            onChange={(event) => {
              setDate(event.target.value);
              setCopyState("idle");
            }}
            className="mt-1.5 block w-full rounded-2xl border border-ink-200 bg-white px-4 py-3 text-sm
                       font-semibold text-ink-700 dark:border-white/10 dark:bg-white/5 dark:text-ink-100
                       dark:[color-scheme:dark]"
          />
        </label>

        <p className="mt-4 text-xs font-semibold text-ink-500 dark:text-ink-300">
          GitHub'a eklenecek satır
        </p>
        <code
          className="mt-1.5 block select-all overflow-x-auto whitespace-nowrap rounded-2xl bg-ink-50 px-4 py-3
                     font-mono text-[13px] text-ink-700 dark:bg-white/5 dark:text-ink-100"
        >
          {line}
        </code>

        {nextDate && (
          <p className="mt-2 text-xs text-ink-400">
            Sonraki doz otomatik olarak{" "}
            <strong className="font-semibold text-ink-600 dark:text-ink-200">
              {formatDateTR(nextDate)}
            </strong>{" "}
            tarihine planlanır.
          </p>
        )}

        <ol className="mt-4 list-decimal space-y-1.5 pl-5 text-sm leading-relaxed text-ink-500 marker:font-semibold marker:text-brand-500 dark:text-ink-300">
          <li>Satırı kopyala.</li>
          {plannedDate ? (
            <li>
              GitHub'da <strong className="font-semibold">{title}</strong> bloğundaki{" "}
              <code className="rounded bg-ink-50 px-1 font-mono text-xs dark:bg-white/5">
                {`{ date: "${plannedDate}", isCompleted: false }`}
              </code>{" "}
              satırını sil, yerine yapıştır.
            </li>
          ) : (
            <li>
              GitHub'da <strong className="font-semibold">{title}</strong> bloğunu bul,{" "}
              <code className="rounded bg-ink-50 px-1 font-mono text-xs dark:bg-white/5">
                {listName}
              </code>{" "}
              listesinin sonuna yapıştır.
            </li>
          )}
          <li>
            <strong className="font-semibold">Commit changes</strong> ile kaydet; uygulama
            1-2 dakika içinde güncellenir.
          </li>
        </ol>

        <div className="mt-5 grid grid-cols-2 gap-2.5">
          <button type="button" onClick={copy} className="btn-ghost" autoFocus>
            {copyState === "copied" ? (
              <Check className="h-4 w-4 text-mint-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            {copyState === "copied" ? "Kopyalandı" : "Kopyala"}
          </button>

          {/* Bağlantı da kopyalar: pano yazımı aynı dokunuş içinde başlamalı (Safari) */}
          <a
            href={githubEditUrl(filePath)}
            target="_blank"
            rel="noreferrer"
            onClick={() => {
              copy();
            }}
            className="btn-primary"
          >
            <ExternalLink className="h-4 w-4" />
            GitHub'da aç
          </a>
        </div>

        <p className="sr-only" aria-live="polite">
          {copyState === "copied" ? "Satır panoya kopyalandı" : ""}
        </p>
        {copyState === "failed" && (
          <p role="alert" className="mt-3 text-xs text-blush-600 dark:text-blush-300">
            Panoya kopyalanamadı. Satıra dokunup elle kopyalayabilirsin.
          </p>
        )}
      </div>
    </dialog>,
    document.body,
  );
};

export default QuickRecordSheet;
