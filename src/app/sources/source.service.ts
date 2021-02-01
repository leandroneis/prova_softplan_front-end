import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';


@Injectable()
export class SourceService {

  private _sourceUrl: string;

  constructor(private http: HttpClient) {
    this._sourceUrl = `${environment.apiUrl}/source`;
  }

  buscar(): Promise<any> {
    return this.http.get(this._sourceUrl).toPromise();
  }
}
