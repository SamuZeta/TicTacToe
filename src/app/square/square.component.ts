import { Component, Input} from '@angular/core';

@Component({
  styleUrls: ['./square.component.scss'],
  selector: 'app-square',
  template:`
  <button nbButton status="primary" *ngIf="!value">{{ value }}</button>
  <button nbButton hero status="success" *ngIf="value=='X'">{{ value }}</button>
  <button nbButton hero status="info" *ngIf="value=='O'">{{ value }}</button>`,
  styles: ['']
})

export class SquareComponent{
  squares: any;
 @Input() value: 'X' | 'O';
}
