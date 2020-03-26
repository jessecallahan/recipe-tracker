import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css'
import { WeatherService } from './../src/weather-service.js';
import { RecipeGrabber } from './../src/recipelist-service.js';
import { Recipe } from './../src/recipe-service.js';


function attachAccountListeners() {
    $("ul#showRestaurant1").on("click", "li", function () {
        console.log(this.id);
    });

}
$(document).ready(function () {
    attachAccountListeners();
    $('#categoryName').click(function () {
        const catName = $('#category').val();

        (async () => {
            let NewRecipeGrabber = new RecipeGrabber();
            const catNameResponse = await NewRecipeGrabber.getRecipeListByCategory(catName);
            getElements(catNameResponse);
        })();

        function getElements(catNameResponse) {
            $("#showRestaurant1").html('');
            for (var i = 0; i < catNameResponse.meals.length; i++) {
                $("#showRestaurant1").append("<option" + " value=" + `"${catNameResponse.meals[i].strMeal}"` + ">" + catNameResponse.meals[i].strMeal + "</option>");
                $("#showRestaurant1").show();




            }




        }

    });

    $('#recipeName').click(function () {
        const recipe = $('#showRestaurant1').val();
        console.log(recipe);
        (async () => {

            let newRecipe = new Recipe();
            const recipeResponse = await newRecipe.getRecipe(recipe);
            getElements(recipeResponse);
        })();

    });
    // Promise.all([RecipeGrabber}).then(function (values) {
    //     console.log(values);
    // });


    function getElements(recipeResponse) {

        $("#output").text(recipeResponse.meals[0].strInstructions)
    }

});