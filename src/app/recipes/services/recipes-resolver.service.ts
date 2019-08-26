import { Injectable } from '@angular/core';
import { Resolve, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from '../recipe.model';
import { DataStorageService } from 'src/app/shared/services/data-storage.service';
import { RecipeService } from './recipe.service';

@Injectable({
  providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]>{

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let recipes = this.recipeService.getRecipes();
    if (recipes && recipes.length !== 0) {
      return recipes;
    } else {
      return this.dataStoreService.fetchRecipes();
    }

  }

  constructor(private dataStoreService: DataStorageService, private recipeService: RecipeService) {
    this.dataStoreService.fetchRecipes();
   }
}
