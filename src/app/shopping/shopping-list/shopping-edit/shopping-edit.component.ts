import { Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingService } from '../../services/shopping.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('shoppingEditForm', {static: true}) form: NgForm;
  shoppingItem: Ingredient;
  editMode= false;
  editedItemIndex: number = -1;

  subscription: Subscription;

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit() {
    this.subscription = this.shoppingService.editRequested.subscribe((index: number) =>{
      this.editedItemIndex = index;
      this.editMode = true;
      this.shoppingItem = this.shoppingService.getIngredient(index);
      this.form.setValue({
        name: this.shoppingItem.name,
        amount: this.shoppingItem.amount
      });
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  
  onAddItem(){
    let ingredient = new Ingredient(
      this.form.value.name,
      this.form.value.amount
    );

    if(this.editMode) {
      this.shoppingService.updateIngredient(this.editedItemIndex, ingredient); 
    } else {
      this.shoppingService.addIngredient(ingredient);
    }
    this.clearForm();
  }
  clearForm() {
    this.editMode = false;
    this.form.reset();
  }
  onDelete() {
    this.shoppingService.deleteIngredient(this.editedItemIndex);
    this.clearForm();
  }

}
