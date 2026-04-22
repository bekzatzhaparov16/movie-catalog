import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Movie } from '../../models/movie';
import { TmdbService } from '../../services/tmdb';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.scss',
})
export class MovieCard {
  @Input() movie!: Movie;

  get isFav(): boolean {
    const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
    return favs.some((m: Movie) => m.id === this.movie.id);
  }

  constructor(public tmdb: TmdbService, private router: Router) {}

  goToDetail() {
    this.router.navigate(['/movie', this.movie.id]);
  }

  toggleFav(event: Event) {
    event.stopPropagation();
    let favs: Movie[] = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (this.isFav) {
      favs = favs.filter((m) => m.id !== this.movie.id);
    } else {
      favs.push(this.movie);
    }
    localStorage.setItem('favorites', JSON.stringify(favs));
  }
}