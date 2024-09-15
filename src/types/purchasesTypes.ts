export interface IPurchaseReq {
  "firm_id": number,
  "brand_id": number,
  "product_id": number,
  "quantity": number,
  "price": string,
}

export interface IPurchaseResp extends IPurchaseReq {
  "id": number,
  "user": string,
  "firm": string,
  "brand": string,
  "product": string,
  "category": [{
    id: number,
    name: string,
  }],
  "price_total": string,
  "created": string,
  "createds": string,
  "time_hour": string,
}
