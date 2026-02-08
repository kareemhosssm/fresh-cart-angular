import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { Footer } from "../footer/footer";
import { Navbar } from "../navbar/navbar";

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet, Footer, Navbar],
  templateUrl: './auth-layout.html',
  styleUrl: './auth-layout.scss',
})
export class AuthLayout {

}
