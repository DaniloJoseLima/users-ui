import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { User } from 'app/models/user';
import { UserParams } from 'app/models/userParams';
import { UsersService } from 'app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  protected users = new Array<User>
  protected limit = 10;
  protected totalPages = 1;
  protected currentPage = 1;
  protected isDelete = false;

  constructor(
    private userService: UsersService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.queryParams.forEach(e => {
      if (e['page']) {
        this.currentPage = e['page'];
      }
    });

    this.loadValus();
  }

  protected loadValus() {

    const userParams = {
      page: this.currentPage - 1,
      limit: this.limit
    } as UserParams;

    this.userService.findAll(userParams).subscribe(value => {
      if (value) {
        this.users = value.data;
        this.totalPages = Math.ceil(value.total / this.limit);
      }
    });
  }

  protected setPage(page: number) {
    this.currentPage = page;
    this.router.navigate(
      ['/users'],
      { queryParams: { page } }
    );
    this.loadValus();
  }

  protected delete(id: any) {
    this.userService.delete(id).subscribe(value => {
      this.loadValus();
      this.isDelete = true;
      setTimeout(() => {
        this.isDelete = false;
      }, 3000);
    });
  }
}
