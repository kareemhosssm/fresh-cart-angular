import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Flowbite } from './core/services/flowbite/flowbite';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  constructor(private flowbite: Flowbite) {}

  ngOnInit(): void {
    this.flowbite.loadFlowbite((flowbite) => {
     
    });
  }
}
