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
  bookList: any[];
  sampleData = [
    {
      "id": 1,
      "name": "Sorry For Your Loss",
      "url": "https://i.pinimg.com/736x/a0/e6/26/a0e626af3883e109da440ec021080f99.jpg",
      "author": "-Jesse Anne Folley",
      "onRent": false,
      "returnBefore": ""
    },
    {
      "id": 2,
      "name": "The Girl In Red",
      "url": "https://i.pinimg.com/474x/8e/b9/63/8eb963b5794dd3f9aeb7cf19a59e659f.jpg",
      "author": "Cristina Henry",
      "onRent": false,
      "returnBefore": ""
    },
    {
      "id": 3,
      "name": "Water Cure",
      "url": "https://lithub.com/wp-content/uploads/2019/01/81SBy9jbbHL.jpg",
      "author": "-Sophie",
      "onRent": false,
      "returnBefore": ""
    },
    {
      "id": 4,
      "name": "Don't Go There",
      "url": "https://marketplace.canva.com/EAD7YH8bebE/1/0/251w/canva-white-bold-text-thriller-mystery-book-cover-CejxvxrTCyg.jpg",
      "author": "-Juliana Silva",
      "onRent": false,
      "returnBefore": ""
    },
    {
      "id": 5,
      "name": "Vanished In Woods",
      "url": "https://www.creativeparamita.com/wp-content/uploads/2018/09/vanished-in-the-wood.jpg",
      "author": "-Unknown",
      "onRent": false,
      "returnBefore": ""
    },
    {
      "id": 6,
      "name": "The Possible World",
      "url": "https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781501166150/the-possible-world-9781501166150_xlg.jpg",
      "author": "-Liese",
      "onRent": false,
      "returnBefore": ""
    }

  ];
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
    this.bookList = this.sampleData;
    this.cookieService.put('bookList', JSON.stringify(this.bookList));
    //  this.getJSON().subscribe(data => {
    //     console.log(data);
    //     this.cookieService.put('bookList', JSON.stringify(data));
    //     this.bookList = data;
    //   });
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
