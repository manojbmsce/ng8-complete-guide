import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  editMode: boolean;

  constructor(private route: ActivatedRoute) { }

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
        console.log("Editmode: "+ this.editMode);
      }
    );
  }

}
