import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private url = 'https://super-crud.herokuapp.com/pokemon';

  constructor(private http: HttpClient) {
  }

  getPokemons(): Observable<any> {
    return this.http.get<any>(this.url);
  }

  getPokemonById(id: string): Observable<any> {
    const url = `${this.url}/${id}`;
    return this.http.get<any>(url);
  }
}
