
import { Component, OnInit, ChangeDetectorRef, TemplateRef, ViewChild } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { FileService } from '../service/file.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatSnackBar } from '@angular/material/snack-bar';

declare var bootstrap: any;

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  searchText: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  isLoading: boolean = false;
  excelData: any[] = [];
  displayedUsers: any[] = [];
  selectedDataItem: any = null;
  newComment: string = '';
  status: boolean = false;

  public dateValue: Date = new Date("2024-05-12"); // Initialize with May 12, 2024
  // Initialize with May 12, 2024
public minDate: Date = new Date("2024-01-01");   // Initialize with January 1, 2024
public maxDate: Date = new Date("2024-12-31");
holdDate: Date | null = null;
holdOption: string = 'noHold';
additionalNotes: string = '';
died:boolean=false // Initialize with December 31, 2024
selectedDate:Date = new Date();
  constructor(

    private fileService: FileService,
    private modalService: NgbModal,
    private snackBar: MatSnackBar
  ) {

  }


  showDetails(data: any): void {
    this.selectedDataItem = data;
    console.log(this.selectedDataItem);
    this.status = this.selectedDataItem.callMade; // Set status based on the callMade property
    var myModal = new bootstrap.Modal(document.getElementById('detailModal'), {});
    myModal.show();
  }

  onDateChange(event: any) {

    this.selectedDate = event.value;
    console.log("Selected date:", this.selectedDate);
  }
  onDateChangeHold(event: any) {

    this.holdDate = event.value;
    console.log("Selected date:", this.holdDate);
  }
  saveFollowUp(): void {
    const id = this.selectedDataItem._id;
    const email = localStorage.getItem('email');

    const followUpData = {
      email: email,
      followUpDate: this.selectedDate, // Use directly from the dateValue property
      holdOption: this.holdOption,
      died: this.died,
      additionalNotes: this.additionalNotes,
      holdDate: this.holdDate
    };

    // If hold option is selected, include hold date in follow-up data
    if (this.holdOption === 'hold') {
      followUpData.holdDate = new Date();
    }

    console.log('Follow-up data:', followUpData);
    console.log('Date Value:', this.dateValue);

    this.fileService.updateDocument(id, followUpData).subscribe({
      next: (response) => {
        // Handle successful save
        console.log('Follow-up data saved:', response);
        this.snackBar.open('Follow-up time set!', 'Close', {
          duration: 2000
        }).afterDismissed().subscribe(() => {
          // Close the modal after snackbar is dismissed
          console.log('Before closing modal');
          this.modalService.dismissAll();
        });
      },
      error: (error) => {
        console.error('Failed to save follow-up data:', error);
      }
    });
  }

  ngOnInit() {

    this.loadDocuments();
  }
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.uploadFile(file);
    }
  }

  private uploadFile(file: File): void {
    this.snackBar.open('Please wait, uploading...', 'Close', { duration: 2000 });
    this.fileService.uploadFile(file).subscribe({
      next: (event: HttpEvent<any>) => {
        if (event.type === HttpEventType.UploadProgress) {
          const percentDone = Math.round(100 * event.loaded / (event.total || 1));
          console.log(`File is ${percentDone}% loaded.`);
        } else if (event.type === HttpEventType.Response) {
          this.snackBar.open('File successfully uploaded!', 'Close', { duration: 3000 });
          console.log('File is completely loaded!', event.body);
        }

      },
      error: (error) => {
        this.snackBar.open('File upload failed!', 'Close', { duration: 3000 });
        console.error('File upload failed:', error);
      },
      complete: (()=>{
        console.log('File upload completed.');
        this.loadDocuments();
      })

    });
  }


  loadDocuments(): void {
    this.fileService.getDocuments().subscribe({
      next: (data) => {
        this.excelData = data;
        this.updateDisplayedUsers();
        console.log('Documents:', this.excelData);
      },
      error: (error) => {
        console.error('Failed to get documents:', error);
      }
    });
  }

  updateDisplayedUsers() {
    if (!this.searchText) {
      this.displayedUsers = [...this.excelData];
    } else {
      this.displayedUsers = this.excelData.filter(item => {
        const Account_Name = item.Account_Name && item.Account_Name.toLowerCase().includes(this.searchText.toLowerCase());
        const Account_Website = item.Account_Website && item.Account_Website.toLowerCase().includes(this.searchText.toLowerCase());
        const City = item.City && item.City.toLowerCase().includes(this.searchText.toLowerCase());
        return Account_Name || Account_Website || City;
      });
    }
    this.resetPagination();
  }



  get paginatedUsers() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.displayedUsers.slice(startIndex, startIndex + this.itemsPerPage);
  }


  nextPage(): void {
    if ((this.currentPage * this.itemsPerPage) < this.displayedUsers.length) {
      this.currentPage++;
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  resetPagination(): void {
    this.currentPage = 1;  // Reset to first page whenever the filter changes
  }




  startItemIndex(): number {
    return ((this.currentPage - 1) * this.itemsPerPage) + 1;
  }

  endItemIndex(): number {
    const endIdx = this.currentPage * this.itemsPerPage;
    return endIdx > this.excelData.length ? this.excelData.length : endIdx;
  }



  commonFields: any[] = [];
  filterCommonFields(): void {
    const fieldIdMap = new Map<string, string>();
    this.excelData.forEach(item => {
      const fieldId = item.fileId;
      if (fieldId && !fieldIdMap.has(fieldId)) { // Check if the fieldId has not been added yet
        fieldIdMap.set(fieldId, item.filename); // Store only the first filename
      }
    });

    // Convert the map to an array suitable for display
    this.commonFields = Array.from(fieldIdMap).map(([fieldId, filename]) => ({ fieldId, filename }));
    console.log("Updated Common Fields (one filename each):", this.commonFields);
  }




showDeleteModal(): void {
  this.filterCommonFields();
  const deleteModal = new bootstrap.Modal(document.getElementById('deleteFileModal'), {});
  deleteModal.show();
  this.loadDocuments();
}

onDeleteFile(fileId: string): void {
  if (confirm('Are you sure you want to delete this file?')) {
    this.fileService.deleteFile(fileId).subscribe({
      next: (response) => {
        this.snackBar.open('File deleted successfully', 'Close', { duration: 3000 });
        this.loadDocuments();

      },
      error: () => {
        this.snackBar.open('Failed to delete file', 'Close', { duration: 3000 });
      }
    });
  }
}








openFollowUpModal(): void {
  // Trigger Bootstrap modal
  const myModal = new bootstrap.Modal(document.getElementById('followUpModal'));
  myModal.show();
}






}


