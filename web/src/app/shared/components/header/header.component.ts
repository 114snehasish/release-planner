import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/auth';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  protected readonly authService = inject(AuthService);

  logout(): void {
    this.authService.logout();
  }

  getUserInitials(): string {
    const name = this.authService.userName();
    if (!name) return 'U';

    const parts = name.split(/\s+/).filter((part) => part.length > 0);
    if (parts.length >= 2 && parts[0].length > 0 && parts[parts.length - 1].length > 0) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, Math.min(2, name.length)).toUpperCase() || 'U';
  }
}
