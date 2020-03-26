export class RecipeGrabber {
    async getRecipeListByCategory(catName) {
        try {
            let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${catName}`);
            let jsonifiedResponse;
            if (response.ok && response.status == 200) {
                jsonifiedResponse = await response.json();
            } else {
                jsonifiedResponse = false;
            }
            return jsonifiedResponse;
        } catch {
            return false;
        }
    }
}