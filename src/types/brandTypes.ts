export interface IBrandReq {
  name: string;
  image: string;
}

export interface IBrandResp extends IBrandReq {
  id: number;
}
