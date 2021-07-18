import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss']
})
export class AccountPage implements OnInit {
  constructor(private route: Router) {}

  buyerAccount() {
    this.route.navigate(['/buyer']);
  }

  ngOnInit() {}
}
