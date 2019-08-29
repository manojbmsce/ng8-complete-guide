import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from 'src/app/recipes/recipe.model';
import { RecipeService } from 'src/app/recipes/services/recipe.service';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient, private recipeService: RecipeService,
    private authService: AuthService) { }

  saveRecipes(){

    let recipes = this.recipeService.getRecipes();
    this.http
      .put<Recipe[]>(
        'https://ng-complete-guide-4583d.firebaseio.com/recipes.json',
        recipes
      ).subscribe((responseData)=>{
        alert("Recipes successfully saved");
      });

  }

  fetchRecipes() :Observable<Recipe[]>{
    return this.http
      .get<Recipe[]>( 
        'https://ng-complete-guide-4583d.firebaseio.com/recipes.json'
      ).pipe(
        map((recipes: Recipe[])=>{
          return recipes.map((recipe: Recipe)=>{
              return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients: []}
          });
        })
        ,tap((recipes: Recipe[])=>{
          this.recipeService.replaceRecipes(recipes.slice());
        })
      );
  }
}
