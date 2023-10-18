import { Component } from '@angular/core';
import { CheckboxChangeEvent } from 'primeng/checkbox';

@Component({
  selector   : 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls  : ['./dashboard.component.scss']
})
export class DashboardComponent{

  // This is the array of numbers that will be displayed on the housie board
  checked: boolean = false;

  emitCheckedStatus(e: CheckboxChangeEvent): void {
    this.checked = e.checked;
  }


}
