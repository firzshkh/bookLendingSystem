import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookListComponent } from './view/book-list/book-list.component';
import { GetBooksComponent } from './view/get-books/get-books.component';
import { ReturnBooksComponent } from './view/return-books/return-books.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: BookListComponent,
    data: {
      title: 'Home Page'
    }
  },
  {
    path: 'get-books/:id',
    component: GetBooksComponent,
    data: {
      title: 'Lend Book Page'
    }
  },
  {
    path: 'return-books/:id',
    component: ReturnBooksComponent,
    data: {
      title: 'Return Book Page'
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
