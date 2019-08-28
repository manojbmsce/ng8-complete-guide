import { Component, OnInit} from '@angular/core';
import { DataStorageService } from '../shared/services/data-storage.service';
import { RecipeService } from '../recipes/services/recipe.service';
import { AuthService } from '../auth/auth/auth.service';
import { User } from '../auth/auth/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuthenticated = false;

  constructor(private dataStorageService: DataStorageService, private authService: AuthService) { }

  ngOnInit() {
    this.authService.loggedInUserSubject.subscribe((user: User) =>{
        this.isAuthenticated = !!user;
    });
  }
  
  onSaveData() {
    this.dataStorageService.saveRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

}
