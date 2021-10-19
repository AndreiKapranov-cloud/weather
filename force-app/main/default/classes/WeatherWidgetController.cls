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
    static final String API_KEY='8aecfd321e9fcd5ed9ab1029e39af095';
    static final String QUERY = 'https://api.openweathermap.org/data/2.5/forecast?';
    @AuraEnabled
    public static  List<Forecast__c> refreshWeather(String city/*, String apiKey*/) {
        try {
            String responseBody = getResponseFromAPI(city/*, apiKey*/);

            Map<String, Object> responseMap = (Map<String,Object>)JSON.deserializeUntyped(responseBody);
           
           List <Forecast__c> objList = new List<Forecast__c>(); 
           
           
          for (Integer i=0;i<40;i++) {
            Forecast__c configRec = new Forecast__c();     
                
            //    configRec = getLastSyncDetails();
                List<Object> ListGlobal = (List<Object>)responseMap.get('list');
                Map<String,Object> weatherInfoGlobal = (Map<String,Object>) ListGlobal[i];
                Map<String,Object> mainMap = (Map<String,Object>)weatherInfoGlobal.get('main');
                Double temperature = Double.valueOf(mainMap.get('temp'));
                List<Object> WeatherList = (List<Object>)weatherInfoGlobal.get('weather');
                Map<String,Object> weatherInfo = (Map<String,Object>) WeatherList[0];
                String weatherDesc = String.valueOf(weatherInfo.get('description'));
            
                String dateTimeResponce = String.valueOf(weatherInfoGlobal.get('dt_txt'));
                String year = dateTimeResponce.substring(0,4);
                String month = dateTimeResponce.substring(5,7);
                String day = dateTimeResponce.substring(8,10);
                String hour = dateTimeResponce.substring(11,13);
                String minute = dateTimeResponce.substring(14,16);
                String second = dateTimeResponce.substring(17,19);
            
                Date thisDate = Date.newInstance(integer.valueOf(year),integer.valueOf(month),integer.valueOf(day));
         
                
          
               
                Map<String,Object> cityMap = (Map<String,Object>)responseMap.get('city');
                String cityFromJson = String.valueOf(cityMap.get('name'));
       //         City__c cityFromForecast = new City__c();
    //            cityFromForecast.Country__c = countryName;
    //upsert cityFromForecast;
              //  configRec.name = 'Beach2';
              configRec.Name = 'duck';
              configRec.City__c = cityFromJson;//cityName;//cityName + ', ' + countryName;
              configRec.Temperature__c = temperature;
              configRec.Weather_message__c = weatherDesc;
               // configRec.Icon_Name__c = weatherIcon;
               // configRec.API_Key__c = apiKey;
               configRec.Date__c = thisDate;
              configRec.Time__c = dateTimeResponce;
               
               objList.add(configRec);



           /*   Forecast__c configRec1 = new Forecast__c();     
                
               //    configRec = getLastSyncDetails();
                   List<Object> ListGlobal1 = (List<Object>)responseMap.get('list');
                   Map<String,Object> weatherInfoGlobal1 = (Map<String,Object>) ListGlobal1[1];
                   Map<String,Object> mainMap1 = (Map<String,Object>)weatherInfoGlobal1.get('main');
                   Double temperature1 = Double.valueOf(mainMap.get('temp'));
                   List<Object> WeatherList1 = (List<Object>)weatherInfoGlobal1.get('weather');
                   Map<String,Object> weatherInfo1 = (Map<String,Object>) WeatherList1[0];
                   String weatherDesc1 = String.valueOf(weatherInfo.get('description'));
               
                   String dateTimeResponce1 = String.valueOf(weatherInfoGlobal1.get('dt_txt'));
                   String year1 = dateTimeResponce1.substring(0,4);
                   String month1 = dateTimeResponce1.substring(5,7);
                   String day1 = dateTimeResponce1.substring(8,10);
                   String hour1 = dateTimeResponce1.substring(11,13);
                   String minute1 = dateTimeResponce1.substring(14,16);
                   String second1 = dateTimeResponce.substring(17,19);
                   
                   Date thisDate1 = Date.newInstance(integer.valueOf(year1),integer.valueOf(month1),integer.valueOf(day1));
                   Time thisTime1 = Time.newInstance(integer.valueOf(hour1),integer.valueOf(minute1),integer.valueOf(second1),integer.valueOf(second1));
                   Map<String,Object> cityMap1 = (Map<String,Object>)responseMap.get('city');
                   String cityFromJson1 = String.valueOf(cityMap1.get('name'));
          //         City__c cityFromForecast = new City__c();
       //            cityFromForecast.Country__c = countryName;
       //upsert cityFromForecast;
                 //  configRec.name = 'Beach2';

                 configRec1.Name = 'off';
                 configRec1.City__c = cityFromJson1;//cityName;//cityName + ', ' + countryName;
                 configRec1.Temperature__c = temperature1;
                 configRec1.Weather_message__c = weatherDesc1;
                  // configRec.Icon_Name__c = weatherIcon;
                  // configRec.API_Key__c = apiKey;
                  configRec1.Date__c = thisDate1;
                  configRec1.Time__c = thisTime1;
                 */
     //      upsert configRec;
       //    objList.add(configRec1);
    }
        upsert objList; 
        return objList;
   // return configRec;
    //    return [SELECT Id,City__c, Temperature__c, Weather_message__c, Date__c,
      //Time__c
        //    FROM Forecast__c Where city__c = :city ];
    }
     //       return objList;
        
    
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
        String endpoint = 'https://api.openweathermap.org/data/2.5/forecast?';
        endpoint += 'q=' + city + '&appid=' + '8aecfd321e9fcd5ed9ab1029e39af095' + '&units=' + unit;
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
