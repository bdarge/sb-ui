import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Environment} from '../../environments/environment.interface'

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  constructor(private http: HttpClient) {}
  config : Environment = {} as Environment
  async load(): Promise<Environment> {
    return this.http.get<Environment>('config/config.json')
      .toPromise()
      .then(data => {
        Object.assign(this.config, data);
        return data;
      });
  }
}
