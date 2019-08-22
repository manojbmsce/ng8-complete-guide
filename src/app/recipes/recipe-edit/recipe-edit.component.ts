import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { stringify } from 'querystring';
import { RecipeService } from '../services/recipe.service';
import { Recipe } from '../recipe.model';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  editMode: boolean;
  recipeEditForm: FormGroup;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService) { }

  initForm() {
    let recipe: Recipe;
    if(this.editMode) {
      recipe = this.recipeService.getRecipe(this.id);
    } else {
      recipe = new Recipe('','','', []);
    }

    let formArray= new FormArray([]);
    recipe.ingredients.forEach(ingredient => {
      formArray.push(new FormGroup({
        'name': new FormControl(ingredient.name),
        'amount': new FormControl(ingredient.amount)
      }));
    });

    this.recipeEditForm = new FormGroup({
      'name': new FormControl(recipe.name, [Validators.required]),
      'imagePath': new FormControl(recipe.imageUrl),
      'description': new FormControl(recipe.description),
      'ingredients': formArray,
    });
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params)=>{
        const paramId = params['id'];
        console.log("paramId is:" + paramId);
        if(paramId){
          this.id = +paramId;
          this.editMode = true;
        } else{
          this.id= NaN;
          this.editMode = false;
        }
        this.initForm();
      }
    );
  }

  OnSubmit(){
    console.log(this.recipeEditForm.value);
    
  }


}
