import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, map, take, tap } from "rxjs";
import { AuthService } from "../auth/auth/auth.service";
import { ReceipeService } from "../recipes/receipe.service";
import { Recipe } from "../recipes/recipe.model";

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {
    constructor(private http: HttpClient, private recipeService: ReceipeService, private authService: AuthService) { }

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http.put(
            "https://ng-course-recipe-book-db00a-default-rtdb.firebaseio.com/recipes.json", recipes
        ).subscribe(responseData => console.log(responseData));
    }

    fetchRecipes() {
        return this.http.get<Recipe[]>(
            "https://ng-course-recipe-book-db00a-default-rtdb.firebaseio.com/recipes.json",
        ).pipe(
            map(recipes => {
                return recipes.map(recipe => {
                    return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
                })
            }),
            tap(recipes => this.recipeService.setRecipes(recipes))
        )
    }

}