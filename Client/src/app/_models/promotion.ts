import { Store } from "./store";

export interface Promotion {
  promoType: string;
  valueType: number;
  promoDescription: string;
  promoStart: Date;
  promoEnd: Date;
  storeList: Store[];
}

export interface Payload {
  promoId: string;
  storeFile: StoreFile;
}

export interface StoreFile {
  fileName: string;
  filePath: string;
}
