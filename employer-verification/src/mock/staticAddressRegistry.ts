export interface StaticAddress {
  formatted: string;
  lat: number;
  lng: number;
  zoning: "COMMERCIAL" | "RESIDENTIAL";
  city: string;
}

export const staticAddressRegistry: StaticAddress[] = [
  {
    formatted: "100 King St, Toronto",
    lat: 43.6487,
    lng: -79.3817,
    zoning: "COMMERCIAL",
    city: "Toronto",
  },
  {
    formatted: "500 Industrial Rd, Calgary",
    lat: 51.0447,
    lng: -114.0719,
    zoning: "COMMERCIAL",
    city: "Calgary",
  },
  {
    formatted: "12 Maple Ave, Toronto",
    lat: 43.7001,
    lng: -79.4163,
    zoning: "RESIDENTIAL",
    city: "Toronto",
  },
];
