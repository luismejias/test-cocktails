import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MenuComponent } from '../menu/menu.component';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MenuComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {}
