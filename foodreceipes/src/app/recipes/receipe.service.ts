import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class ReceipeService {
    recipesChanged = new Subject<Recipe[]>();

    // private recipes: Recipe[] = [
    //     new Recipe('Biriyani', 'A delicious food that I can"t avoid',
    //         'https://www.getbengal.com/uploads/story_image/calcutta_alo-biriyani.jpg',
    //         [
    //             new Ingredient('Meat', 2),
    //             new Ingredient('Rice', 400)
    //         ]
    //     ),
    //     new Recipe('Kebabs', 'This should not be missed..tastes yammy!',
    //         'https://www.licious.in/blog/wp-content/uploads/2020/12/Turkish-Kebabs-min.jpg',
    //         [
    //             new Ingredient('Meat', 3),
    //             new Ingredient('Spice', 100)
    //         ]
    //     )
    // ];

    private recipes: Recipe[] = [];

    constructor(private shoppingListService: ShoppingListService) { }

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}