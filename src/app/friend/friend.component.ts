import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

//import {Friend} from '../friend';
import { Friend } from '../shared/friend.model';

import { FriendService } from '../shared/friend.service';

import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

/*
export class Friend {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    //public department: string,
    public email: string,
   //public country: string
  ) { }
}*/

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.scss']
})
export class FriendComponent implements OnInit {

  friends: Friend[]=[];
  closeResult: string;
  editForm: FormGroup;
  friend: Friendgit;
  deleteId: number;

  page: number = 1;

  constructor(private friendService: FriendService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private httpClient: HttpClient,
    private toastr: ToastrService) {
  }

  ngOnInit(): void {

    this.getFriends();

    this.editForm = this.fb.group({
      id: [''],
      firstName: [''],
      lastName: [''],
      email: ['']
    });
  }

  //Get all List
  getFriends() {
    this.friendService.getAllFriends().subscribe(
      response => {
        console.log(response);
        this.friends = response;
      }
    );
  }

  // Open Modal Form
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  // Get dismissReason
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  //form Submit
  onSubmit(f: NgForm) {
    this.insertRecord(f);
  }

  //Insert a record
  insertRecord(f: NgForm) {
    this.friendService.postEmployee(f.value).subscribe((result) => {
      console.log(result);
      this.ngOnInit();  //reload the table
    });
    this.modalService.dismissAll(); //dismiss the modal
    this.toastr.success('Record has been inserted', 'Appv2021');
  }


  //Details
  openDetails(targetModal, friend: Friend) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });
    document.getElementById('fname').setAttribute('value', friend.firstName);
    document.getElementById('lname').setAttribute('value', friend.lastName);
    document.getElementById('email2').setAttribute('value', friend.email);

  }

  //Edit
  openEdit(targetModal, friend: Friend) {
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
    this.editForm.patchValue({
      id: friend.id,
      firstName: friend.firstName,
      lastName: friend.lastName,
      email: friend.email
    });
  }

  //Save
  onSave() {
    this.updateRecord();
  }

  //update a record
  updateRecord() {

    //assigning values into editForm from formGroup
    this.friend = this.editForm.value;
    console.log(this.friend);

    /*
     //calling method to insert
     this.resourceService.updateResourceType(this.resource).subscribe(
      data=>console.log(data), error=> console.log(error)
    );
    this.toastr.success('New Resource Successfully Created', 'Creating ResourceType');
    this.router.navigateByUrl('/admin/viewResourceType');
      */

    this.friendService.putEmployee(this.friend).subscribe((result) => {
      console.log(result);
      this.ngOnInit();  //reload the table
    });
    this.modalService.dismissAll(); //dismiss the modal
    this.toastr.success('Record has been updated', 'Appv2021');
  }

  //openDelete
  openDelete(targetModal, friend: Friend) {
    this.deleteId = friend.id;
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }

 
  //Delete
  onDelete() {
    this.friendService.deleteEmployee(this.deleteId)
      .subscribe((result) => {
        console.log(result);
        this.ngOnInit();
      });
      this.modalService.dismissAll();
  }

  /*
  onDelete() {
    //console.log(this.friend.id);
    console.log(this.deleteId);
  
    const deleteURL = 'http://localhost:9090/api/employees/' + this.deleteId;
    this.httpClient.delete(deleteURL)
      .subscribe((results) => {
        this.ngOnInit();
      });
      this.modalService.dismissAll();
  }*/

}
