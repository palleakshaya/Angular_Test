import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarRef } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-snack-bar',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './snack-bar.component.html',
  styleUrl: './snack-bar.component.scss',
})
export class SnackBarComponent {
  constructor(
    private snackBarRef: MatSnackBarRef<SnackBarComponent>,
    private router: Router
  ) {}

  viewCart() {
    this.snackBarRef.dismiss(); // Close the snack bar
    this.router.navigate(['/cart']); // Navigate to the cart page
  }

  close() {
    this.snackBarRef.dismiss(); // Close the snack bar
  }
}
