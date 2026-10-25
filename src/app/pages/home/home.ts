import { Categories } from './../categories/categories';
import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import { SalePipe } from '../../shared/pipes/sale-pipe';
import { TermtextPipe } from '../../shared/pipes/termtext-pipe';
import { SearchPipe } from '../../shared/pipes/search-pipe';
import { FormsModule } from '@angular/forms';
import { Cart } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-home',
  imports: [
    CarouselModule,
    RouterLink,
    FormsModule,
    SearchPipe,
    SalePipe,
    TermtextPipe,
    CurrencyPipe,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly categoriesService = inject(CategoriesService);
  private readonly _Cart = inject(Cart);

  products: IProduct[] = [];
  Categories: ICategory[] = [];
  text: string = '';

  customMainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: false,
  };

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 2,
      },
      480: {
        items: 3,
      },
      768: {
        items: 4,
      },
      1024: {
        items: 5,
      },
      1280: {
        items: 6,
      },
    },
    nav: false,
  };

  ngOnInit(): void {
    this.getProductsData();
    this.getCategoryData();
  }

  getProductsData(): void {
    this.productsService.getAllProducts().subscribe({
      next: (res) => {
        console.log(res.data);

        this.products = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getCategoryData(): void {
    this.categoriesService.getALLCategories().subscribe({
      next: (res) => {
        console.log(res.data);
        this.Categories = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  addToCart(id: string): void {
    this._Cart.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
