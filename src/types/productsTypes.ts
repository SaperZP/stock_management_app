export interface IProductsResp {
  id: number;
  name: string;
  category: string;
  category_id: number;
  brand: string;
  brand_id: number;
  stock: number;
}

export interface ICreateProductReq {
  name: string;
  category_id: number;
  brand_id: number;
}
export interface IEditProductReq extends ICreateProductReq {
  id: number;
}
