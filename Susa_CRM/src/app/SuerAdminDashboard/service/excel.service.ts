import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {
  constructor(private http: HttpClient) {}

  loadExcelFile(url: string): Observable<any[]> {
    return this.http.get(url, { responseType: 'arraybuffer' })
      .pipe(
        map(data => {
          const workbook = XLSX.read(data, { type: 'buffer' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          return XLSX.utils.sheet_to_json(worksheet);
        }),
        catchError(error => {
          console.error('Error loading the Excel file', error);
          return throwError(() => new Error('Error loading the Excel file'));
        })
      );
  }
}
