import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShoppingComponent } from './shopping/shopping.component';
import { ShoppingListComponent } from './shopping/shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping/shopping-list/shopping-edit/shopping-edit.component';
import { RecipesComponent} from './recipes/recipes.component';
import { RecipeListComponent} from './recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent} from './recipes/recipe-detail/recipe-detail.component';
import { RecipeItemComponent} from './recipes/recipe-list/recipe-item/recipe-item.component';
import { from } from 'rxjs';
import { DropdownDirective } from './shared/directives/dropdown.directive';
import { RoutingModule } from './routes/routing/routing.module';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShoppingComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    DropdownDirective,
    RecipeStartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
