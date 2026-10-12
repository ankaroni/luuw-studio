export const eur = (cents: number) =>
  new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(cents / 100);

export const dateTime = (d: Date) =>
  new Intl.DateTimeFormat('de-DE', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Europe/Berlin' }).format(d);

/** Seats taken: paid bookings plus pending ones younger than 15 minutes. */
export const HOLD_MS = 15 * 60 * 1000;
