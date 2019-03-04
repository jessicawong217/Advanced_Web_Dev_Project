import { Component, OnInit } from '@angular/core';

import { AdminService } from './admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  /* Dummy data */
  public food = [
      {
          name: 'Chicken Soup',
          price: 7,
          category: 'Food'
      },
      {
          name: 'Curry',
          price: 11.50,
          category: 'Food'
      },
      {
          name: 'Hot and Sour Soup',
          price: 7,
          category: 'Food'
      },
      {
          name: 'Rice',
          price: 3.50,
          category: 'Food'
      },
      {
          name: 'Iced Lemon Tea',
          price: 3.50,
          category: 'Drink'
      },
      {
          name: 'CocaCola',
          price: 2.50,
          category: 'Drink'
      },
      {
          name: 'Sweet and Sour',
          price: 6.50,
          category: 'Food'
      },
      {
          name: 'Ice Cream',
          price: 3.50,
          category: 'Food'
      },
      {
          name: 'Plum Wine',
          price: 4.50,
          category: 'Drink'
      },
      {
          name: 'Fruit Bowl',
          price: 3.50,
          category: 'Food'
      },
      {
          name: 'Stir Fry',
          price: 7.50,
          category: 'Food'
      }

  ];

  public staff = [
    {
      firstname: 'Klaus',
      surname: 'Logan',
      role: 'Waiter'
    },
    {
      firstname: 'Susanne',
      surname: 'Smith',
      role: 'Waiter'
    },
    {
      firstname: 'Joanne',
      surname: 'Lee',
      role: 'Manager'
    },
    {
      firstname: 'John',
      surname: 'McGregor',
      role: 'Manager'
    },
    {
      firstname: 'Lucy',
      surname: 'McCabe',
      role: 'Chef'
    }
  ];

  constructor(
    protected adminService: AdminService
  ) { }

  ngOnInit() {

  }



  openMenuNav() {
    document.getElementById("menuBar").style.width = "20%";
    document.getElementById("menuBar").style.display = "block";
    document.getElementById("menuMain").style.visibility = "hidden";
    document.getElementById("summary").style.marginLeft = "15%";
  }

  closeMenuNav() {
    document.getElementById("menuBar").style.width = "0";
    document.getElementById("menuBar").style.display = "none";
    document.getElementById("menuMain").style.visibility = "visible";
    document.getElementById("summary").style.marginLeft = "0";

  }

  openStaffNav() {
    document.getElementById("staffBar").style.width = "20%";
    document.getElementById("staffBar").style.display = "block";
    document.getElementById("staffMain").style.visibility = "hidden";
    document.getElementById("analytics").style.marginLeft = "15%";
  }

  closeStaffNav() {
    document.getElementById("staffBar").style.width = "0";
    document.getElementById("staffBar").style.display = "none";
    document.getElementById("staffMain").style.visibility = "visible";
    document.getElementById("analytics").style.marginLeft = "0";

  }

}
