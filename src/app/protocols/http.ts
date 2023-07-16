export interface HttpRequest {
  body: any;
  params?: any;
}

export interface HttpResponse {
  body: any;
  params?: any;
  statusCode: number;
}
