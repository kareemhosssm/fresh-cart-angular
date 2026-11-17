import { Component, inject, input, signal, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth-service';
import { Cart } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar implements OnInit {
  readonly authService = inject(AuthService);
  readonly cartService = inject(Cart);

  isLogin = input<boolean>(true);

  isMenuOpen = signal(false);

  ngOnInit(): void {
    if (this.isLogin()) {
      this.cartService.getLoggedUserCart().subscribe({
        error: (err) => console.log(err),
      });
    }
  }

  toggleMenu() {
    this.isMenuOpen.update((open) => !open);
  }

  closeMenu() {
    this.isMenuOpen.set(false);
  }
}
