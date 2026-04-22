import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TmdbService } from '../../services/tmdb';
import { Movie } from '../../models/movie';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MovieCard } from '../../components/movie-card/movie-card';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, MovieCard, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  movies: Movie[] = [];
  isLoading = false;
  searchQuery = '';
  private searchSubject = new Subject<string>();

  constructor(private tmdb: TmdbService) {}

  ngOnInit() {
    this.loadPopular();
    this.searchSubject
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((query) => {
        query ? this.search(query) : this.loadPopular();
      });
  }

  loadPopular() {
    this.isLoading = true;
    this.tmdb.getPopularMovies().subscribe({
      next: (res) => { this.movies = res.results; this.isLoading = false; },
      error: () => { this.isLoading = false; }
    });
  }

  onSearch(query: string) {
    this.searchSubject.next(query);
  }

  search(query: string) {
    this.isLoading = true;
    this.tmdb.searchMovies(query).subscribe({
      next: (res) => { this.movies = res.results; this.isLoading = false; },
      error: () => { this.isLoading = false; }
    });
  }
}