/* type Theme = 'light' | 'dark';

class ThemeManager {
  private currentTheme: Theme = 'light';

  constructor() {
    this.initializeTheme();
    this.createToggleButton();
  }

  private initializeTheme(): void {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    this.currentTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    this.applyTheme();
  }

  private applyTheme(): void {
    document.documentElement.setAttribute('data-theme', this.currentTheme);
    localStorage.setItem('theme', this.currentTheme);
  }

  private toggleTheme(): void {
    this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.applyTheme();
  }

  private createToggleButton(): void {
    const button = document.createElement('button');
    button.className = 'theme-toggle';
    button.textContent = this.currentTheme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
    
    button.addEventListener('click', () => {
      this.toggleTheme();
      button.textContent = this.currentTheme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
    });

    document.body.appendChild(button);
  }
}

// Initialize the theme manager when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ThemeManager();
});
