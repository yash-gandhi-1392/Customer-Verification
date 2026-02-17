import { normalizeName } from "../shared/utils/stringUtils";
import { saveToStorage, loadFromStorage } from "../shared/utils/localStorage";

export const resolveCEID = (name: string, address: string) => {
  const normalized = normalizeName(name);
  const key = `ceid-${normalized}`;

  const existing = loadFromStorage(key);
  if (existing && existing.address === address) {
    return existing.ceid;
  }

  const ceid = crypto.randomUUID();
  saveToStorage(key, { ceid, address });

  return ceid;
};
