import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Payload, Promotion } from '../_models/promotion';
import { Store } from '../_models/store';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {
  baseUrl = environment.apiUrl;

  promoId: string;

  constructor(private http: HttpClient) { }

  uploadFile(formData: FormData): Observable<Store[]> {

    return this.http.post<Store[]>(this.baseUrl + 'promotion/upload-file', formData);
  }

  savePromotion(promotion: Promotion) {
    return this.http.post(this.baseUrl + 'promotion/save', promotion).pipe(map((payload: any) => payload));
  }
}
