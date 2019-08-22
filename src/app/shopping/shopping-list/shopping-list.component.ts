import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient} from '../../shared/ingredient.model';
import { ShoppingService } from '../services/shopping.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit , OnDestroy{

  ingredients: Ingredient[];

  ingredientSubscription: Subscription;

  constructor(private shoppingService: ShoppingService, 
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {  
    this.ingredients = this.shoppingService.getIngredients();
    this.ingredientSubscription = this.shoppingService.ingredientAdded.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;}
    );
  }
  onEditItem(ingredientIndex: number) {
    this.shoppingService.notifyEditRequest(ingredientIndex);
  }

  ngOnDestroy(): void {
    this.ingredientSubscription.unsubscribe();
  }

}
