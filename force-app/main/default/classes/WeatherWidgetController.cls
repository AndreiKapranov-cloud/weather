public with sharing class WeatherWidgetController {

  /*  @AuraEnabled
    public static Weather_Widget_Configuration__c getLastSyncDetails() {
        try {
            Weather_Widget_Configuration__c result = Weather_Widget_Configuration__c.getValues('Default');
            return result;
        }
        catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }*/


    @AuraEnabled
    public static Forecast__c refreshWeather(String city/*, String apiKey*/) {
        try {
            String responseBody = getResponseFromAPI(city/*, apiKey*/);

            Map<String, Object> responseMap = (Map<String,Object>)JSON.deserializeUntyped(responseBody);
            Forecast__c configRec = new Forecast__c();
        //    configRec = getLastSyncDetails();
            List<Object> weatherList = (List<Object>)responseMap.get('weather');
            Map<String,Object> weatherInfo = (Map<String,Object>)weatherList[0];
            String weatherDesc = String.valueOf(weatherInfo.get('description'));
            String weatherIcon = String.valueOf(weatherInfo.get('icon'));
            Map<String,Object> mainMap = (Map<String,Object>)responseMap.get('main');
            Double temperature = Double.valueOf(mainMap.get('temp'));
            Map<String,Object> sysMap = (Map<String,Object>)responseMap.get('sys');
            String countryName = String.valueOf(sysMap.get('country'));
            String cityName = String.valueOf(responseMap.get('name'));
            
           
   //         City__c cityFromForecast = new City__c();
//            cityFromForecast.Country__c = countryName;
            
//upsert cityFromForecast;

          //  configRec.name = 'Beach2';
            configRec.City__c = cityName;//cityName;//cityName + ', ' + countryName;
            configRec.Temperature__c = temperature;
            configRec.Weather_message__c = weatherDesc;
           // configRec.Icon_Name__c = weatherIcon;
           // configRec.API_Key__c = apiKey;
            configRec.Date__c = Date.newInstance(1960, 2, 17);
            configRec.Time__c = Time.newInstance(18, 30, 2, 20);
          
            upsert configRec;

            return configRec;
        }
        catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }


    // PRIVATE

    private static String getResponseFromAPI(String city/*, String apiKey*/) {
        String result;
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        String unit = 'metric';
        String endpoint = 'https://api.openweathermap.org/data/2.5/weather?';
        endpoint += 'q=' + city + '&appid=8aecfd321e9fcd5ed9ab1029e39af095' + '&units=' + unit;
        request.setEndpoint(endpoint);
        request.setMethod('GET');
        HttpResponse res = http.send(request);
        result = res.getBody();

        if(res.getStatusCode() == 401){
            throw new AuraHandledException('Invalid API Key');
        }

        if(res.getStatusCode() == 404){
            throw new AuraHandledException('City not found');
        }

        return result;
    }
}