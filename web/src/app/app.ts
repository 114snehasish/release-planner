import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './core/auth';
import { HeaderComponent } from './shared/components';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected readonly title = signal('release-planner-web');
  protected readonly isInitialized = signal(false);

  private readonly authService = inject(AuthService);

  async ngOnInit(): Promise<void> {
    await this.authService.initializeAuth();
    this.isInitialized.set(true);
  }
}
