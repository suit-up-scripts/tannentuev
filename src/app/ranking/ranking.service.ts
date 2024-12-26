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


  public getRanking(year: number): Observable<any> {

        let url = "";
        if(year === 2022) {
          url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRCSJ1dIzH1celCMVWqpMmhd9VgvrioawsC8E1Vz7BlIeqzYIJ5Hywkk9EfYH15Kx9nbAUsBKEY6ER9/pub?output=csv";
        }
        else if (year === 2023) {
          url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQZc7XjrwB0_6xMlFRhsg7UQO3FX5tbi7rHqU5fiN88F3NhDzNTattnVpxPn2FdOpRxPdLXPW-tS9jw/pub?output=csv";
        }
        else {
          url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSVhVTfIWDWramWAvkmST_-bHOX32-_qKcOxDjKRACpIUQypriDGF3HC5ypUCcGiXNo1B_paXWYxdqa/pub?output=csv";
        }
        //2023
        //const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQZc7XjrwB0_6xMlFRhsg7UQO3FX5tbi7rHqU5fiN88F3NhDzNTattnVpxPn2FdOpRxPdLXPW-tS9jw/pub?output=csv"
        //2022
        //const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRCSJ1dIzH1celCMVWqpMmhd9VgvrioawsC8E1Vz7BlIeqzYIJ5Hywkk9EfYH15Kx9nbAUsBKEY6ER9/pub?output=csv";
            return this.http.get(url, {responseType: "text"})
              .pipe(
                map((res: any) => {
                  const parseResult: ParseResult = this.papa.parse(res, {header: true});
                  return parseResult.data;
                })
              );
          }
}
