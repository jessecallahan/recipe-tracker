export class WeatherService {
    async getWeatherByCity() {
        try {
            let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
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