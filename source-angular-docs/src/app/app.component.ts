import {Component, OnInit} from '@angular/core';
import {RestService} from '@services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private rest: RestService) {
  }

  ngOnInit(): void {
    this.rest.fetchProducts().subscribe((products) => {
      // display the products
    });
  }
}
