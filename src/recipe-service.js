export class Recipe {
  async getRecipe(recipe) {
    try {
      let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${recipe}`);
      let jsonifiedResponse;
      if (response.ok && response.status == 200) {
        jsonifiedResponse = await response.json();
      } else {
        jsonifiedResponse = false;
      }
      return jsonifiedResponse;
    } catch (e) {
      return false;
    }
  }
}