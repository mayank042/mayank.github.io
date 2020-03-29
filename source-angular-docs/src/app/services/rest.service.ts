import {Injectable} from '@angular/core';
import {HttpService} from '@services';
import {IProducts} from '@models';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpService) {
  }

  fetchProducts() {
    return this.http.get<IProducts>('/products');
  }

}
