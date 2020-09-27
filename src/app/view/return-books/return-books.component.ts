import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-return-books',
  templateUrl: './return-books.component.html',
  styleUrls: ['./return-books.component.css']
})
export class ReturnBooksComponent implements OnInit {



  title = 'bookLendingSystem';
  book;
  bookList;
  membershipNo;
  username;

  dateToday = new Date();
  newDate;

  constructor(private router: Router, private http: HttpClient, private cookieService: CookieService) {
  }

  ngOnInit() {
    this.book = JSON.parse(this.cookieService.get('selectedBook'));
    this.bookList = JSON.parse(this.cookieService.get('bookList'));
    console.log(this.book);

  }



  returnBooks() {
    if (!this.membershipNo || !this.username) {
      console.log('Fields Cannot be Empty');
      return;
    }
    console.log(this.membershipNo + this.username);

    for (const addedbook of this.bookList) {
      if (addedbook.id === this.book.id) {
        addedbook.onRent = false;
        addedbook.returnBefore = '';

      }
    }
    console.log('after: ');
    console.log(this.bookList);
    this.cookieService.put('bookList', JSON.stringify(this.bookList));
    this.router.navigate(['/home']);

  }

}
