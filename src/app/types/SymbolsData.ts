import { Motd } from "./Motd";


export interface SymbolsData {
  motd: Motd;
  success: boolean;
  symbols: object;
}

interface Symbols {
  [key: string]: Symbol;
}

export interface Symbol {
  code: string;
  description: string;
}
