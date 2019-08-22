import { Injectable } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
  updateIngredient(editedItemIndex: number, ingredient: Ingredient) {
    this.ingredients[editedItemIndex] = ingredient;
    this.ingredientAdded.next(this.ingredients.slice());
  }
  private ingredients: Ingredient[] = [
    new Ingredient('apple', 5),
    new Ingredient('orange', 6)
  ];

  ingredientAdded= new Subject<Ingredient[]>();

  editRequested= new Subject<number>();

  constructor() { }

  getIngredients(){
    return this.ingredients.slice();
  }
  getIngredient(i: number): Ingredient{
    return this.ingredients[i];
  }

  notifyEditRequest(i: number) {
    this.editRequested.next(i);
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientAdded.next(this.ingredients.slice());
  }
  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientAdded.next(this.ingredients.slice());
  }
  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientAdded.next(this.ingredients.slice());
  }
}
