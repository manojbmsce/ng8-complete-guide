import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingComponent } from 'src/app/shopping/shopping.component';
import { RecipesComponent } from 'src/app/recipes/recipes.component';
import { RecipeDetailComponent } from 'src/app/recipes/recipe-detail/recipe-detail.component';
import { RecipeStartComponent } from 'src/app/recipes/recipe-start/recipe-start.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'recipes', pathMatch: 'full'},
  { path: 'shopping', component: ShoppingComponent},
  { path: 'recipes', component: RecipesComponent, children:[
    {path:'', component: RecipeStartComponent},
    {path: ':id', component: RecipeDetailComponent}
  ]}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports:[
    RouterModule
  ]
})
export class RoutingModule { }
