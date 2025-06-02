import { inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PaginationService {
  private activatedRoute = inject(ActivatedRoute);
  private actualSize = signal<number>(10);

  currentPage = toSignal(
    this.activatedRoute.queryParamMap.pipe(
      map((params) => (params.get('page') ? +params.get('page')! : 1)),
      map((page) => (isNaN(page) ? 1 : page))
    ),
    {
      initialValue: 1,
    }
  );

  currentSize = toSignal(
    this.activatedRoute.queryParamMap.pipe(
      map((params) => (params.get('size') ? +params.get('size')! : this.actualSize())),
      map((size) => (isNaN(size) ? 10 : size)),
      tap((size) => (this.actualSize.set(size)))
    ),
    { initialValue: 10 }
  );
}
