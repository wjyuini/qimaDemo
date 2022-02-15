import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  statusOptions = [];
  currentStatus: any = {};
  transferred1: any = {};
  transferred2: any = {};
  transferred3: any = {};
  statusManage: any;
  answer1Msg: string = '';
  answer2Msg: string = '';
  answer3Msg: string = '';

  constructor(private router: Router) { }

  setStatusData() {
    return {
      statusData: [],
      currentStatus: {},
      relationship: {}
    }
  }

  statusChange(row: any): void {
    this.router.navigate(['/updatePage', row.name]);
  }

  toCreateStatus(): void {
    this.router.navigate(['/creationPage']);
  }

  hasRes = false;
  result = '';
  step(line: any, adjacentNodes: any, tempRes: any, w: any) {
    //当前节点没有相邻节点
    //存在比查询的路径短则退出
    if (!adjacentNodes || this.hasRes && this.result.length < tempRes.length) {
      return;
    }
    adjacentNodes.forEach((item: any) => {
      //避免进入环
      if (tempRes.indexOf(item) !== -1) {
        return;
      }
      let newTempRes = tempRes.concat(item);
      //到达终点
      if (item === w) {
        if (this.hasRes) {
          if (newTempRes.length < this.result.length) {
            //已有最短路径，且比当前路径更短，替换
            this.result = newTempRes;
          }
        } else {
          //目前没有最短路径，替换
          this.result = newTempRes;
          this.hasRes = true;
        }
      } else {
        this.step(line, line[item], newTempRes, w);
      }
    });
  }

  transferred1Change(row: any) {
    if (this.currentStatus.name === row.name && this.statusManage.relationship[this.currentStatus.name].includes(row.name)) {
      this.answer1Msg = `Yes,can be transferred to ${row.name} from ${this.currentStatus.name}`;
    } else {
      const str = sessionStorage.getItem('statusManage');
      if (str) {
        const statusManage = JSON.parse(str);
        const relationship = statusManage?.relationship || {};
        this.hasRes = false;
        this.result = '';
        this.step(relationship, relationship[this.currentStatus.name], this.currentStatus.name, row.name);
      }
      if (this.result) {
        this.answer1Msg = `Yes,can be transferred to ${row.name} from ${this.currentStatus.name}`;
      } else {
        this.answer1Msg = `No,cannot be transferred to ${row.name} from ${this.currentStatus.name}`;
      }
    }
  }

  transferred2Change(row: any) {
    if (this.currentStatus.name === row.name && this.statusManage.relationship[this.currentStatus.name].includes(row.name)) {
      this.answer2Msg = `=>${row.name}`;
    } else {
      const str = sessionStorage.getItem('statusManage');
      if (str) {
        const statusManage = JSON.parse(str);
        const relationship = statusManage?.relationship || {};
        this.hasRes = false;
        this.result = '';
        this.step(relationship, relationship[this.currentStatus.name], this.currentStatus.name, row.name);
      }
      if (this.hasRes) {
        this.answer2Msg = this.result.split('').join('=>');
      } else {
        this.answer2Msg = `Cannot be transferred to ${row.name}`;
      }
    }
  }

  reset() {
    this.transferred1 = {};
    this.transferred2 = {};
    this.transferred3 = {};

    this.answer1Msg = '';
    this.answer2Msg = '';
    this.answer3Msg = '';
  }

  transferred3Change(row: any) {
    const str = sessionStorage.getItem('statusManage');
    if (str) {
      const statusManage = JSON.parse(str);
      const relationship = statusManage?.relationship || {};
      let isOK = false;
      if (relationship[this.currentStatus.name].includes(row.name)) {
        this.currentStatus = {
          name: row.name,
          value: row.name
        }
        this.reset();
        isOK = true;
      }
      if (!isOK) {
        this.answer3Msg = `cannot be transferred to ${row.name}`;
      }
    }
  }

  ngOnInit() {
    const str = sessionStorage.getItem('statusManage');
    if (!str) {
      sessionStorage.setItem('statusManage', JSON.stringify(this.setStatusData()));
    }
    if (str) {
      this.statusManage = JSON.parse(str);
      this.statusOptions = this.statusManage?.statusData;
      this.currentStatus = this.statusManage?.currentStatus;
    }
  }

}
