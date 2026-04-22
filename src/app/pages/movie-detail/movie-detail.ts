import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TmdbService } from '../../services/tmdb';
import { MovieDetail as MovieDetailModel } from '../../models/movie';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './movie-detail.html',
  styleUrl: './movie-detail.scss',
})
export class MovieDetail implements OnInit {
  movie: MovieDetailModel | null = null;
  isLoading = true;

  constructor(private route: ActivatedRoute, private tmdb: TmdbService) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.tmdb.getMovieDetail(id).subscribe({
      next: (movie) => { this.movie = movie; this.isLoading = false; },
      error: () => { this.isLoading = false; }
    });
  }

  getPosterUrl(path: string | null): string {
    return this.tmdb.getPosterUrl(path, 'w342');
  }
}