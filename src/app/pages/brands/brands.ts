import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands/brands.service';
import { IBrand } from '../../shared/interfaces/ibrand';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.html',
  styleUrl: './brands.scss',
})
export class Brands implements OnInit {
  private readonly brandsService = inject(BrandsService);

  brands: IBrand[] = [];

  ngOnInit(): void {
    this.getBrandsData();
  }

  getBrandsData(): void {
    this.brandsService.GetAllBrands().subscribe({
      next: (res) => {
        this.brands = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
