export interface ProductModel {
  PID: number;
  PName: string;
  PPrice: number;
  PDescription: string;
  PPicture: string;
}

export interface ProductPayload {
  PID: number;
  PName: string;
  PDescription: string;
  PPrice: number;
  PPicture: string;
  PQuantity: number;
  PUnit: string;
}
