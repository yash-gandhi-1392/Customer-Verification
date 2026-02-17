export const normalizeName = (name: string) =>
  name
    .toLowerCase()
    .replace(/inc|ltd|corp|corporation|store|#/g, "")
    .replace(/[^a-z0-9]/g, "")
    .trim();
