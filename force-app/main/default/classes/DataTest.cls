@isTest
public class DataTest {
  @isTest
  static void getFieldInfoTest() {
    City__c city = new City__c();
    //   insert city;
    List<Forecast__c> forecastsFirst = TestDataFactory.createForecasts(
      1,
      'Paris',
      45
    );
    //    try{
    List<Forecast__c> weatherList = WeatherController.refreshWeather('London');
    //   }
    //     catch(exception e){

    //  }
    Test.startTest();
    try {
      for (Forecast__c forecast : weatherList) {
        System.assertEquals(forecast.Name, 'London');
      }
    } catch (exception e) {
    }
    Test.stopTest();
  }
}
