import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie';
import {Router, ActivatedRoute} from '@angular/router';
// import * as moment from 'moment';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  title = 'bookLendingSystem';
  bookList: [];
  bookId;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private http: HttpClient, 
              private cookieService: CookieService) {
  }

  ngOnInit() {
    // const date = moment().add(day, 'days');
    this.cookieService.get('bookList');
    if (this.cookieService.get('bookList') != null) {
      this.bookList = JSON.parse(this.cookieService.get('bookList'));
      console.log(this.bookList);
    } else {
     this.getBookList();
    }
  }

  getBookList() {
     this.getJSON().subscribe(data => {
        console.log(data);
        this.cookieService.put('bookList', JSON.stringify(data));
        this.bookList = data;
      });
  }

  viewBookDetails(data) {
    console.log(data);
    this.bookId = data.id;
    this.cookieService.put('selectedBook', JSON.stringify(data));
    this.router.navigate(['/get-books/' + this.bookId ]);
  }

  returnBook(data) {
    console.log(data);
    this.bookId = data.id;
    this.cookieService.put('selectedBook', JSON.stringify(data));
    this.router.navigate(['/return-books/' + this.bookId ]);
  }

  public getJSON(): Observable<any> {
    return this.http.get('/assets/json/books.json');
  }


}
