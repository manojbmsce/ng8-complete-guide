import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingComponent } from 'src/app/shopping/shopping.component';
import { RecipesComponent } from 'src/app/recipes/recipes.component';
import { RecipeDetailComponent } from 'src/app/recipes/recipe-detail/recipe-detail.component';
import { RecipeStartComponent } from 'src/app/recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from 'src/app/recipes/recipe-edit/recipe-edit.component';
import { RecipesResolverService } from 'src/app/recipes/services/recipes-resolver.service';
import { AuthComponent } from 'src/app/auth/auth/auth.component';
import { AuthGuardService } from 'src/app/auth/auth/auth-guard.service';

const appRoutes: Routes = [
  { path: '', redirectTo: 'recipes', pathMatch: 'full'},
  { path: 'shopping', component: ShoppingComponent},
  { path: 'recipes', component: RecipesComponent, 
      canActivate: [AuthGuardService],
      children:[
        {path:'', component: RecipeStartComponent},
        {path: 'new', component: RecipeEditComponent},
        {path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService]},
        {path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService]}
  ]},
  { path: 'auth', component: AuthComponent},
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
