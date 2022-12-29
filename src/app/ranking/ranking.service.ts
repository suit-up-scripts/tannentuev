import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { map, Observable } from 'rxjs';
import { Papa } from "ngx-papaparse";
import { ParseResult } from 'ngx-papaparse/public_api';

@Injectable({
  providedIn: 'root'
})
export class RankingService {

  constructor(private http: HttpClient, private papa: Papa) { }


  public getRanking(): Observable<any> {
        const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRCSJ1dIzH1celCMVWqpMmhd9VgvrioawsC8E1Vz7BlIeqzYIJ5Hywkk9EfYH15Kx9nbAUsBKEY6ER9/pub?output=csv";
        //const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vR82styIru_NGDe_tjO8VGrWA8Cn3BtOiLadewkr4Qj1YpOytjHGJiOQwRuCHc1Xn_jtLMQrnLFSRPG/pub?output=csv"
            return this.http.get(url, {responseType: "text"})
              .pipe(
                map((res: any) => {
                  const parseResult: ParseResult = this.papa.parse(res, {header: true});
                  return parseResult.data;
                })
              );
          }
}
