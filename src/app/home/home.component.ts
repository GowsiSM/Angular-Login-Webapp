import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  username: string = 'Guest';

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.checkAuthentication();
  }

  checkAuthentication() {
    const token = sessionStorage.getItem('authToken');
    if (!token) {
      this.router.navigate(['/login']);
    } else {
      this.route.queryParams.subscribe(params => {
        this.username = params['username'] || sessionStorage.getItem('username') || 'Guest';
      });
    }
  }

  logout() {
    sessionStorage.clear();
    this.router.navigateByUrl('/login').then(() => {
      window.location.reload();
    });
  }
}
