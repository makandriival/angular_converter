import { Motd } from "./Motd";

export interface RatesData {
  base: string;
  date: string;
  motd: Motd
  rates: RatesFromApi;
  success: boolean;
}

interface RatesFromApi {
  [key: string]: number;
  CZK: number;
  EUR: number;
  PLN: number;
  USD: number;
}

export interface Rate {
  code: string;
  rate: number
}
