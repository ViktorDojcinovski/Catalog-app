interface IHttp {
  submitCatalog(endpoint: string, data: any): Promise<Response>;
  getCatalogs(endpoint: string): Promise<Response>;
  getCatalog(endpoint: string): Promise<Response>;
  updateCatalog(endpoint: string, data: any): Promise<Response>;
  deleteCatalog(endpoint: string, data: any): Promise<Response>;
}

export default IHttp;
