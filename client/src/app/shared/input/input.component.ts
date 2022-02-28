import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  @Input() control: FormControl = new FormControl();
  @Input() placeholder = '';
  @Input() label = '';
  @Input() variant = 'input'; // peut être: textarea
  @Input() type = 'text'; // peut être: email, password, checkbox, radio

  constructor() {

  }

  ngOnInit(): void {
  }

}
