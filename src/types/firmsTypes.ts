export interface IFirmsReq {
  name: string;
  phone: string;
  image: string;
  address: string;
}

export interface IFirmsResp extends IFirmsReq {
  id: number;
}
