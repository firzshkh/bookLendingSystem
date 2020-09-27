import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-get-books',
  templateUrl: './get-books.component.html',
  styleUrls: ['./get-books.component.css']
})
export class GetBooksComponent implements OnInit {

  title = 'bookLendingSystem';
  book;
  bookList;
  membershipNo;
  username;
  rentDuration;
  returnDate;
  dateToday;
  newDate;
  hours;
  minutes;

  constructor(  private router: Router, private http: HttpClient, private cookieService: CookieService) {
  }

  ngOnInit() {
    this.dateToday = new Date();
    console.log( this.dateToday);
    console.log( this.dateToday.getFullYear());
    console.log( this.dateToday.getMonth());
    console.log( this.dateToday.getHours());
    console.log( this.dateToday.getMinutes());
   


    this.rentDuration = 0;
    this.book = JSON.parse(this.cookieService.get('selectedBook'));
    this.bookList =  JSON.parse(this.cookieService.get('bookList'));
    // console.log('Book: ' + this.bookList);
    console.log( this.book);

  }

  calcReturnDate() {
    console.log(this.dateToday.getDate());
    console.log(this.rentDuration);

    this.returnDate = this.dateToday.getDate() + parseInt(this.rentDuration);
    console.log(this.returnDate);

    this.newDate = new Date(this.dateToday.getFullYear() , this.dateToday.getMonth(), this.returnDate,
    this.dateToday.getHours(), this.dateToday.getMinutes());
 
  }

  rentBooks() {
    if (!this.membershipNo || !this.username || !this.rentDuration || !this.newDate) {
 
      return;
    }
    this.calcReturnDate();
    console.log(this.membershipNo + this.username + this.rentDuration + this.newDate);

    for (const addedbook of this.bookList ) {
        if (addedbook.id === this.book.id) {
          addedbook.onRent = true;
          addedbook.returnBefore = this.newDate.toDateString();
        }
    }
    console.log('after: ');
    console.log(this.bookList);
    this.cookieService.put('bookList', JSON.stringify(this.bookList));
    this.router.navigate(['/home']);
   }


  onSearchChange(searchValue: number): void {  
    console.log(searchValue);
    if(searchValue > 0) {
      this.rentDuration =searchValue;

      this.calcReturnDate();
    }
  }

}
