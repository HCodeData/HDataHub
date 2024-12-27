export enum IDocumentType {
  API = 'Api',
  TEXT = 'Text',
  PROXY = 'Proxy'
}

export interface IDocument {
  id?: string;
  alias?: string;
  name?: string;
  type: IDocumentType;
  title?: string;
  content?: string;
  rank?: number;
  api?: any;
  proxy?: any;
  api_id?: string;
  api_stage?: string;
  proxy_id?: string;
  proxy_stage?: string;
  created_at?: string;
  updated_at?: string;
}

export interface IDocumentListResponse {
  count: number;
  items: IDocument[];
}

export type IDocumentDetailResponse = IDocument;
