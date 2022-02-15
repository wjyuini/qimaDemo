import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.css']
})
export class CreatePageComponent implements OnInit {

  statusOptions: any = [];
  currentStatus: any = '';
  currentSelectData: any = '';
  addStatusName = '';
  isExist = false;
  relationship: any;
  constructor(
    private router: Router
  ) { }

  createStatus() {
    if (!this.addStatusName || this.isExist) {
      return;
    }
    const obj = {
      name: this.addStatusName,
      value: this.addStatusName
    };
    this.statusOptions.push(obj);
    this.relationship[this.addStatusName] = (this.currentStatus || []).map((item: any) => item.name);
    sessionStorage.setItem('statusManage', JSON.stringify({
      statusData: this.statusOptions,
      currentStatus: this.currentSelectData && this.currentSelectData.name ? this.currentSelectData : obj,
      relationship: this.relationship
    }));
    this.router.navigate(['/mainPage']);
  }

  inputChange() {
    if (!this.addStatusName) {
      this.isExist = false;
      return;
    }
    const len = this.statusOptions.filter((item: any) => item.name === this.addStatusName).length;
    this.isExist = len > 0;
  }

  ngOnInit(): void {
    const str = sessionStorage.getItem('statusManage');
    if (str) {
      const statusManage = JSON.parse(str);
      this.statusOptions = statusManage?.statusData;
      this.relationship = statusManage?.relationship;
      this.currentSelectData = statusManage?.currentStatus;
    } else {
      this.router.navigate(['/mainPage']);
    }
  }
}
