import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../book/book';
import { BookService } from '../book.service';
@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

  constructor(private bookService : BookService ) { }

  ngOnInit(): void {
  }
  @Input() hero?: Hero;
  save(): void {
    if (this.hero) {
      this.bookService.updateHero(this.hero)
       // .subscribe(() => this.goBack());
    }
  }
}
