import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { RecipeGrabber } from './recipelist-service.js';
import { Recipe } from './recipe-service.js';



$(document).ready(function () {
  $('#categoryName').click(function () {
    const catName = $('#category').val();

    (async () => {
      let NewRecipeGrabber = new RecipeGrabber();
      const catNameResponse = await NewRecipeGrabber.getRecipeListByCategory(catName);
      getElements(catNameResponse);
    })();

    function getElements(catNameResponse) {
      if (catNameResponse) {
        $("#showCategory").html('');
        for (var i = 0; i < catNameResponse.meals.length; i++) {
          $("#showCategory").append("<option" + " value=" + `"${catNameResponse.meals[i].strMeal}"` + ">" + catNameResponse.meals[i].strMeal + "</option>");
          $("#showCategory").show();
          $("#recipeName").show();

        }
      } else {
        $("#showRestaurant1").append("Hmmm...didnt work. Try another category.");
      }
    }
  });

  $('#recipeName').click(function () {
    const recipe = $('#showCategory').val();

    (async () => {
      let newRecipe = new Recipe();
      const recipeResponse = await newRecipe.getRecipe(recipe);
      getElements(recipeResponse);
    })();
  });

  function getElements(recipeResponse) {
    if (recipeResponse) {
      const values = Object.values(recipeResponse.meals[0]);
      $("#ingredients").html('');
      $("#measurements").html('');
      for (var i = 0; i < values.length; i++) {
        if (i >= 9 && i <= 28) {
          $("#ingredientsTitle").text("Ingredients:");
          $("#ingredients").append("<ul>" + values[i] + "</ul");
          $("#ingredients").show();
        }
        if (i >= 29 && i <= 48) {
          $("#measurementsTitle").text("Measurements:");
          $("#measurements").append("<ul>" + values[i] + "</ul");
          $("#measurements").show();
        }

      }

      $("#name").text(recipeResponse.meals[0].strMeal);
      $("#instructionsTitle").text("Instructions:");
      $("#instructions").text(recipeResponse.meals[0].strInstructions);

    } else {
      $("#instructions").append("Hmmm...didnt work. Try another recipe.");
    }
  }
});