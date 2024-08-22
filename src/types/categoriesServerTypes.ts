export interface ICategory {
  id: number;
  name: string;
  product_count: number;
}

export interface IAddCategoryRequest {
  name: string;
}
