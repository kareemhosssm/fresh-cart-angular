import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ProductsService } from '../../core/services/products/products.service';
import { Cart } from '../../core/services/cart/cart.service';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SalePipe } from '../../shared/pipes/sale-pipe';
import { TermtextPipe } from '../../shared/pipes/termtext-pipe';
import { SearchPipe } from '../../shared/pipes/search-pipe';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-categories',
  imports: [
    RouterLink,
    CurrencyPipe,
    FormsModule,
    SalePipe,
    TermtextPipe,
    SearchPipe,
  ],
  templateUrl: './categories.html',
  styleUrl: './categories.scss',
})
export class Categories implements OnInit {
  private readonly categoriesService = inject(CategoriesService);
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(Cart);

  Categories: ICategory[] = [];
  subCategories: Subcategory[] = [];
  products: IProduct[] = [];

  selectedCategory: ICategory | null = null;
  selectedSubCategory: Subcategory | null = null;

  isLoadingSubCategories = false;
  isLoadingProducts = false;

  text: string = '';

  ngOnInit(): void {
    this.getCategoryData();
  }

  getCategoryData(): void {
    this.categoriesService.getALLCategories().subscribe({
      next: (res) => {
        this.Categories = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  selectCategory(category: ICategory): void {
    this.selectedCategory = category;
    this.subCategories = [];
    this.isLoadingSubCategories = true;

    this.categoriesService.getAllSubCategories().subscribe({
      next: (res) => {
        this.subCategories = res.data.filter(
          (subCat: Subcategory) => subCat.category === category._id,
        );

        this.isLoadingSubCategories = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoadingSubCategories = false;
      },
    });
  }

  selectSubCategory(subCategory: Subcategory): void {
    this.selectedSubCategory = subCategory;
    this.products = [];
    this.text = '';
    this.isLoadingProducts = true;

    this.productsService.getAllProducts().subscribe({
      next: (res) => {
        const totalPages = res.metadata.numberOfPages;

        if (totalPages <= 1) {
          this.filterProducts(res.data, subCategory._id);
          return;
        }

        const requests = [];

        for (let page = 2; page <= totalPages; page++) {
          requests.push(this.productsService.getAllProducts(page));
        }

        forkJoin(requests).subscribe({
          next: (pages: any[]) => {
            const allProducts = [
              ...res.data,
              ...pages.flatMap((page) => page.data),
            ];

            this.filterProducts(allProducts, subCategory._id);
          },
          error: (err) => {
            console.log(err);
            this.isLoadingProducts = false;
          },
        });
      },
      error: (err) => {
        console.log(err);
        this.isLoadingProducts = false;
      },
    });
  }

  filterProducts(products: IProduct[], subCategoryId: string): void {
    this.products = products.filter((product) =>
      product.subcategory.some((subCat) => subCat._id === subCategoryId),
    );

    this.isLoadingProducts = false;

    console.log('Selected Subcategory:', this.selectedSubCategory?.name);
    console.log('Filtered Products:', this.products);
  }

  addToCart(id: string): void {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  backToSubCategories(): void {
    this.selectedSubCategory = null;
    this.products = [];
    this.text = '';
  }

  backToCategories(): void {
    this.selectedCategory = null;
    this.selectedSubCategory = null;
    this.subCategories = [];
    this.products = [];
    this.text = '';
  }
}
