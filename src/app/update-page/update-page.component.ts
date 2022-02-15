import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-page',
  templateUrl: './update-page.component.html',
  styleUrls: ['./update-page.component.css']
})
export class UpdatePageComponent implements OnInit {
  currentStatus = '';
  selectStatus: any = '';
  statusManage: any = {};

  statusOptions: any = [];

  constructor(
    private activateInfo: ActivatedRoute,
    private router: Router
  ) { }

  toMainPage() {
    this.router.navigate(['/mainPage']);
  }

  updateStaus() {
    this.statusManage.currentStatus = {
      name: this.currentStatus,
      value: this.currentStatus
    };
    this.statusManage.relationship[this.currentStatus] = (this.selectStatus || []).map((item: any) => item.name);
    sessionStorage.setItem('statusManage', JSON.stringify(this.statusManage));
    this.toMainPage();
  }

  delRelationShipData(name: string) {
    const keys = Object.keys(this.statusManage.relationship);
    keys.forEach(val => {
      this.statusManage.relationship[val] = this.statusManage.relationship[val].filter((item: any) => item !== name);
    })
  }

  deleteStaus() {
    this.delRelationShipData(this.currentStatus);
    this.statusOptions = this.statusOptions.filter((item: any) => item.name !== this.currentStatus);
    this.statusManage.statusData = this.statusOptions;
    delete this.statusManage.relationship[this.currentStatus];

    if (this.statusManage.statusData?.length) {
      this.statusManage.currentStatus = this.statusManage.statusData[0];
    } else {
      this.statusManage.currentStatus = {};
    }
    sessionStorage.setItem('statusManage', JSON.stringify(this.statusManage));
    this.toMainPage();
  }

  ngOnInit(): void {
    this.activateInfo.params.subscribe((queryParams: any) => {
      this.currentStatus = queryParams.status;
      if (!this.currentStatus) {
        this.toMainPage();
      }
    });
    const str = sessionStorage.getItem('statusManage');
    if (str) {
      this.statusManage = JSON.parse(str);
      this.statusOptions = this.statusManage?.statusData || [];
      if (!this.statusOptions.map((item: any) => item.name).includes(this.currentStatus)) {
        this.toMainPage();
      }
      this.selectStatus = this.statusManage.relationship[this.currentStatus].map((item: any) => {
        return {
          name: item,
          value: item
        };
      })
    } else {
      this.toMainPage();
    }
  }
}
