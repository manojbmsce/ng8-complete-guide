import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingService } from 'src/app/shopping/services/shopping.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private recipes: Recipe[] = [
    new Recipe(
      "Test recipe", 
      " a test description", 
      "https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg",
      [
        new Ingredient('a', 1),
        new Ingredient('b', 5),
      ]),
    new Recipe(
      "Test recipe another ", 
      " another test description", 
      "https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg",
      [
        new Ingredient('c', 12),
        new Ingredient('d', 25),])
  ];

  constructor(private shoppingService: ShoppingService) { }

  getRecipes(){
    return this.recipes.slice();
  }

  recipeSelected = new EventEmitter<Recipe>();

  addIngredients(ingredients: Ingredient[]){
    this.shoppingService.addIngredients(ingredients);
  }
}
