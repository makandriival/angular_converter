import { Motd } from "./Motd";

export interface ConversionResult {
  date: string;
  historical: boolean;
  info: Info;
  motd: Motd;
  query: Query;
  result: number | null;
  success: boolean;
}

export interface Query {
  amount: number | null;
  from: string;
  to: string;
  result?: number | null;
}

interface Info {
  rate: number | null;
}
