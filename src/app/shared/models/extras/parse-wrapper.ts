import { Response } from '@angular/http';
import { ResponseWrapper } from './response-wrapper.model';


export function convertResponse(res: Response): ResponseWrapper {
  const jsonResponse = res.json();
  return new ResponseWrapper(res.headers, jsonResponse, res.status);
}
