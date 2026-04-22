import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Movie, MovieDetail, Genre, ApiResponse } from '../models/movie';

@Injectable({ providedIn: 'root' })
export class TmdbService {
  private baseUrl = environment.tmdbBaseUrl;

  private headers = new HttpHeaders({
    'Authorization': `Bearer ${environment.tmdbToken}`,
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  getPopularMovies(page = 1): Observable<ApiResponse<Movie>> {
    return this.http.get<ApiResponse<Movie>>(
      `${this.baseUrl}/movie/popular?page=${page}&language=ru-RU`,
      { headers: this.headers }
    );
  }

  searchMovies(query: string, page = 1): Observable<ApiResponse<Movie>> {
    return this.http.get<ApiResponse<Movie>>(
      `${this.baseUrl}/search/movie?query=${encodeURIComponent(query)}&page=${page}&language=ru-RU`,
      { headers: this.headers }
    );
  }

  getMovieDetail(id: number): Observable<MovieDetail> {
    return this.http.get<MovieDetail>(
      `${this.baseUrl}/movie/${id}?language=ru-RU`,
      { headers: this.headers }
    );
  }

  getTopRated(page = 1): Observable<ApiResponse<Movie>> {
    return this.http.get<ApiResponse<Movie>>(
      `${this.baseUrl}/movie/top_rated?page=${page}&language=ru-RU`,
      { headers: this.headers }
    );
  }

  getGenres(): Observable<{ genres: Genre[] }> {
    return this.http.get<{ genres: Genre[] }>(
      `${this.baseUrl}/genre/movie/list?language=ru-RU`,
      { headers: this.headers }
    );
  }

  getPosterUrl(path: string | null, size = 'w500'): string {
    if (!path) return 'assets/no-poster.png';
    return `https://image.tmdb.org/t/p/${size}${path}`;
  }
}