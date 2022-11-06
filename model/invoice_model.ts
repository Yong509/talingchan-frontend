export interface InvoiceCreateModel {
  IStatus: string;
  CID: number;
  EmpID: number;
}

export interface InvoiceModel {
  IID: number,
  IStatus: string,
  IDate: string,
  CID: number,
  EmpID: number
}
