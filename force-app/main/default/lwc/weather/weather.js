import { LightningElement, track } from 'lwc';
//import getLastSyncDetails from '@salesforce/apex/WeatherWidgetController.getLastSyncDetails';
import refreshWeather from '@salesforce/apex/WeatherWidgetController.refreshWeather';
export default class weather extends LightningElement {
    error;
    configuration;
    //apiKey;
    displayCity;
    temperature;
   weatherDescription;
    weatherIcon;
    timestamp;
    isFormEnabled;


 /*     connectedCallback() {
        this.getLastSync();
    }


  async getLastSync() {
        this.error = '';

        try {
            this.configuration = await getLastSyncDetails();
            this.populateValues();
        }
        catch (error) {
            console.error(error);
            this.error = error;
        }
    }
*/

    async handleRefresh() {
        this.error = '';

        try {
            this.configuration = await refreshWeather({
                city : this.displayCity,
               // apiKey : this.apiKey
            });

            this.populateValues();
        }
        catch (error) {
            console.error(error);
            this.error = error;
        }
    }


    populateValues() {
        const configuration = this.configuration;
        this.isFormEnabled = false;

       // if(configuration) {
            this.displayCity = configuration.City__c;
            this.temperature = configuration.Temperature__c;
            this.weatherDescription = configuration.Weather_message__c;
           // this.apiKey = apiKey;
         //   this.timestamp = configuration.Last_Synced_on__c;
         //   this.weatherIcon = 'http://openweathermap.org/img/wn/' + configuration.Icon_Name__c +'@2x.png';
        }
      // else {
      //     this.isFormEnabled = true;
     //   }
    


    updateValue(event) {
        let element = event.target.name;
        let value = event.target.value;
        if(element === 'inputCity') {
            this.displayCity = value;
        }
     /*   if(element === 'inputApiKey') {
            if(value !== '') {
                this.apiKey = value;
            }
        }*/
    }


    handleFormSave() {
        this.handleRefresh();
    }


    handleEdit() {
        this.isFormEnabled = true;
    }


    handleCancel() {
        this.isFormEnabled = false;
    }
}
