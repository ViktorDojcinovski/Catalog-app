interface IHttp {
  submitCatalogue(endpoint: string, data: any): Promise<Response>;
  getCatalogues(endpoint: string): Promise<Response>;
  getCatalogue(endpoint: string): Promise<Response>;
  updateCatalogue(endpoint: string, data: any): Promise<Response>;
  deleteCatalogue(endpoint: string, data: any): Promise<Response>;
}

export default IHttp;
