import { Component, OnInit } from '@angular/core';
import { Hero } from '../book/book';
import { BookService } from '../book.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})

export class BookComponent implements OnInit {

  constructor(private heroService: BookService ,
    private messageService: MessageService) { }
    title ="My the book";
    hero: Hero = {
      id: 1,
      name: 'Windstorm'
    };
    add(name: string): void {
      name = name.trim();
      if (!name) { return; }
      this.heroService.addHero({ name } as Hero)
        .subscribe(hero => {
          this.heroes.push(hero);
        });
    }
    delete(hero: Hero): void {
      this.heroes = this.heroes.filter(h => h !== hero);
      this.heroService.deleteHero(hero.id).subscribe();
    }
    
  // heroes = HEROES;
  heroes: Hero[] = [];

  getHeroes(): void {
    this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes);
  }

  

  ngOnInit(): void {
    this.getHeroes();
  }


  selectedHero?: Hero;
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  }

}
