import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ReceipeService } from '../receipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes!: Recipe[];
  subscription!: Subscription;

  constructor(private recipeService: ReceipeService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscription = this.recipeService.recipesChanged.subscribe(
      (recipes: Recipe[]) => this.recipes = recipes
    );
    this.recipes = this.recipeService.getRecipes();
  }
  onAddRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route })
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
