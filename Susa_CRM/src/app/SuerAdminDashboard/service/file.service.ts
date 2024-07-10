import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private baseUrl = 'https://susa-crmpublic-render-deploy-api.onrender.com/Api/Document/'; // Adjust this URL based on your actual server URL

  constructor(private http: HttpClient) { }

  getDocuments(): Observable<any[]> {
    return this.http.get<any>(`${this.baseUrl}documents`);
  }

  getDocumentsByEmail(email: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}documents/email/${email}`);
  }

  getDocumentById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  deleteFile(fileId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}documents/file/${fileId}`);
  }


  updateDocument(id: string, followUpData: { followUpDate: Date; holdOption: string; additionalNotes: string; }): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}documents/${id}`, followUpData);
  }

  deleteDocument(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }

  uploadFile(file: File) {
    const formData: FormData = new FormData();
    formData.append('File', file, file.name);
    return this.http.post('https://susa-crmpublic-render-deploy-3.onrender.com/Api/Document/upload', formData, {
      reportProgress: true,
      observe: 'events', responseType: 'text'
    });
  }
}
