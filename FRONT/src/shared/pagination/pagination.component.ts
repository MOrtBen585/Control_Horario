import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  inject,
  input,
  linkedSignal,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-pagination',
  imports: [RouterLink, CommonModule],
  templateUrl: './pagination.component.html',
})
export class PaginationComponent {
  pages = input(0);
  currentPage = input<number>(1);


  router = inject(Router);
  route = inject(ActivatedRoute);


  activePage = linkedSignal(this.currentPage);


  getPagesList = computed(() => {
    return Array.from({ length: this.pages() }, (_, i) => i + 1);
  });

  onSizeChange(newSize: number) {
    const currentParams = this.route.snapshot.queryParams;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        ...currentParams,
        size: newSize,
      },
      queryParamsHandling: 'merge', // mantiene otros parámetros como `page`
    });

  }
}
