import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { Input } from '@angular/compiler/src/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput', {static: false}) nameInput: ElementRef;
  @ViewChild('amountInput', {static: false}) amountInput: ElementRef;
  @Output() shoppingItemAdded = new EventEmitter<Ingredient>();

  constructor() { }

  ngOnInit() {
  }

  OnAdd() {
    const ingredient =new Ingredient(
      this.nameInput.nativeElement.value,
      this.amountInput.nativeElement.value
      );
    this.shoppingItemAdded.emit(ingredient);
  }

}
