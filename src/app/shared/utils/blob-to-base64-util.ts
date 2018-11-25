import { Observable } from 'rxjs/index';

export const convertBlobToBase64 = (blobData): Observable<string> => {
  return new Observable(observer => {
    const reader = new FileReader();
    reader.onloadend = () => {
      observer.next(reader.result.toString().replace('application/octet-stream', 'application/pdf'));
      observer.complete();
    };
    reader.readAsDataURL(blobData);
  });
};
