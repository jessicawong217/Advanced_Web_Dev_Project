import { Component, OnInit } from '@angular/core';

import { AdminService } from './admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
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
