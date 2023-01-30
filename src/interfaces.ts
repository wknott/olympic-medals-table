export interface CountryFromList {
  name: string;
  flag: string;
  id: string;
}

export interface Medals {
  gold: number;
  silver: number;
  bronze: number;
  total: number;
}

export interface Country extends CountryFromList {
  medals: Medals;
}

export interface CountryOptionData {
  id: string;
  medals: Medals;
}

export interface SortOptions {
  field: keyof Medals;
  direction: "asc" | "desc";
}
