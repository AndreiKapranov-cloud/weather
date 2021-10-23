import { createElement } from "lwc";
import weather from "c/weather";
import refreshWeather from "@salesforce/apex/WeatherController.refreshWeather";

// Mocking imperative Apex method call
jest.mock(
  "@salesforce/apex/WeatherController.refreshWeather",
  () => {
    return {
      default: jest.fn()
    };
  },
  { virtual: true }
);

// Sample data for imperative Apex call
const APEX_CONTACTS_SUCCESS = [
  {
    cod: "200",
    message: 0,
    cnt: 40,
    list: [
      {
        dt: 1634990400,
        main: {
          temp: 6.21,
          feels_like: 2.04,
          temp_min: 6.21,
          temp_max: 6.92,
          pressure: 1010,
          sea_level: 1010,
          grnd_level: 984,
          humidity: 69,
          temp_kf: -0.71
        },
        weather: [
          {
            id: 500,
            main: "Rain",
            description: "light rain",
            icon: "10d"
          }
        ],
        clouds: {
          all: 100
        },
        wind: {
          speed: 7.07,
          deg: 262,
          gust: 11.61
        },
        visibility: 10000,
        pop: 0.2,
        rain: {
          "3h": 0.17
        },
        sys: {
          pod: "d"
        },
        dt_txt: "2021-10-23 12:00:00"
      },
      {
        dt: 1635001200,
        main: {
          temp: 6.07,
          feels_like: 1.86,
          temp_min: 6.07,
          temp_max: 6.18,
          pressure: 1011,
          sea_level: 1011,
          grnd_level: 986,
          humidity: 73,
          temp_kf: -0.11
        },
        weather: [
          {
            id: 803,
            main: "Clouds",
            description: "broken clouds",
            icon: "04n"
          }
        ],
        clouds: {
          all: 79
        },
        wind: {
          speed: 7.09,
          deg: 258,
          gust: 13.07
        },
        visibility: 10000,
        pop: 0.09,
        sys: {
          pod: "n"
        },
        dt_txt: "2021-10-23 15:00:00"
      },
      {
        dt: 1635012000,
        main: {
          temp: 5.01,
          feels_like: 0.84,
          temp_min: 5.01,
          temp_max: 5.01,
          pressure: 1015,
          sea_level: 1015,
          grnd_level: 988,
          humidity: 83,
          temp_kf: 0
        },
        weather: [
          {
            id: 803,
            main: "Clouds",
            description: "broken clouds",
            icon: "04n"
          }
        ],
        clouds: {
          all: 68
        },
        wind: {
          speed: 6.18,
          deg: 262,
          gust: 12.7
        },
        visibility: 10000,
        pop: 0.07,
        sys: {
          pod: "n"
        },
        dt_txt: "2021-10-23 18:00:00"
      },
      {
        dt: 1635022800,
        main: {
          temp: 3.69,
          feels_like: -0.55,
          temp_min: 3.69,
          temp_max: 3.69,
          pressure: 1017,
          sea_level: 1017,
          grnd_level: 990,
          humidity: 87,
          temp_kf: 0
        },
        weather: [
          {
            id: 802,
            main: "Clouds",
            description: "scattered clouds",
            icon: "03n"
          }
        ],
        clouds: {
          all: 49
        },
        wind: {
          speed: 5.51,
          deg: 290,
          gust: 11.6
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: "n"
        },
        dt_txt: "2021-10-23 21:00:00"
      },
      {
        dt: 1635033600,
        main: {
          temp: 3.26,
          feels_like: -1.39,
          temp_min: 3.26,
          temp_max: 3.26,
          pressure: 1019,
          sea_level: 1019,
          grnd_level: 992,
          humidity: 85,
          temp_kf: 0
        },
        weather: [
          {
            id: 802,
            main: "Clouds",
            description: "scattered clouds",
            icon: "03n"
          }
        ],
        clouds: {
          all: 50
        },
        wind: {
          speed: 6.17,
          deg: 304,
          gust: 10.95
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: "n"
        },
        dt_txt: "2021-10-24 00:00:00"
      },
      {
        dt: 1635044400,
        main: {
          temp: 3.74,
          feels_like: -0.53,
          temp_min: 3.74,
          temp_max: 3.74,
          pressure: 1021,
          sea_level: 1021,
          grnd_level: 994,
          humidity: 80,
          temp_kf: 0
        },
        weather: [
          {
            id: 804,
            main: "Clouds",
            description: "overcast clouds",
            icon: "04n"
          }
        ],
        clouds: {
          all: 100
        },
        wind: {
          speed: 5.6,
          deg: 308,
          gust: 9.15
        },
        visibility: 10000,
        pop: 0.07,
        sys: {
          pod: "n"
        },
        dt_txt: "2021-10-24 03:00:00"
      },
      {
        dt: 1635055200,
        main: {
          temp: 2.36,
          feels_like: -2.3,
          temp_min: 2.36,
          temp_max: 2.36,
          pressure: 1024,
          sea_level: 1024,
          grnd_level: 997,
          humidity: 91,
          temp_kf: 0
        },
        weather: [
          {
            id: 600,
            main: "Snow",
            description: "light snow",
            icon: "13d"
          }
        ],
        clouds: {
          all: 100
        },
        wind: {
          speed: 5.66,
          deg: 325,
          gust: 10.73
        },
        visibility: 7389,
        pop: 0.28,
        snow: {
          "3h": 0.23
        },
        sys: {
          pod: "d"
        },
        dt_txt: "2021-10-24 06:00:00"
      },
      {
        dt: 1635066000,
        main: {
          temp: 4.65,
          feels_like: 0.36,
          temp_min: 4.65,
          temp_max: 4.65,
          pressure: 1026,
          sea_level: 1026,
          grnd_level: 999,
          humidity: 56,
          temp_kf: 0
        },
        weather: [
          {
            id: 802,
            main: "Clouds",
            description: "scattered clouds",
            icon: "03d"
          }
        ],
        clouds: {
          all: 35
        },
        wind: {
          speed: 6.22,
          deg: 332,
          gust: 8.48
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: "d"
        },
        dt_txt: "2021-10-24 09:00:00"
      },
      {
        dt: 1635076800,
        main: {
          temp: 5.68,
          feels_like: 1.66,
          temp_min: 5.68,
          temp_max: 5.68,
          pressure: 1027,
          sea_level: 1027,
          grnd_level: 1001,
          humidity: 59,
          temp_kf: 0
        },
        weather: [
          {
            id: 803,
            main: "Clouds",
            description: "broken clouds",
            icon: "04d"
          }
        ],
        clouds: {
          all: 60
        },
        wind: {
          speed: 6.24,
          deg: 319,
          gust: 8.51
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: "d"
        },
        dt_txt: "2021-10-24 12:00:00"
      },
      {
        dt: 1635087600,
        main: {
          temp: 4.01,
          feels_like: 0.99,
          temp_min: 4.01,
          temp_max: 4.01,
          pressure: 1029,
          sea_level: 1029,
          grnd_level: 1002,
          humidity: 72,
          temp_kf: 0
        },
        weather: [
          {
            id: 804,
            main: "Clouds",
            description: "overcast clouds",
            icon: "04n"
          }
        ],
        clouds: {
          all: 100
        },
        wind: {
          speed: 3.45,
          deg: 319,
          gust: 7.19
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: "n"
        },
        dt_txt: "2021-10-24 15:00:00"
      },
      {
        dt: 1635098400,
        main: {
          temp: 3.02,
          feels_like: 0.58,
          temp_min: 3.02,
          temp_max: 3.02,
          pressure: 1030,
          sea_level: 1030,
          grnd_level: 1003,
          humidity: 82,
          temp_kf: 0
        },
        weather: [
          {
            id: 804,
            main: "Clouds",
            description: "overcast clouds",
            icon: "04n"
          }
        ],
        clouds: {
          all: 95
        },
        wind: {
          speed: 2.47,
          deg: 305,
          gust: 4.42
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: "n"
        },
        dt_txt: "2021-10-24 18:00:00"
      },
      {
        dt: 1635109200,
        main: {
          temp: 1.74,
          feels_like: -0.22,
          temp_min: 1.74,
          temp_max: 1.74,
          pressure: 1031,
          sea_level: 1031,
          grnd_level: 1003,
          humidity: 86,
          temp_kf: 0
        },
        weather: [
          {
            id: 803,
            main: "Clouds",
            description: "broken clouds",
            icon: "04n"
          }
        ],
        clouds: {
          all: 61
        },
        wind: {
          speed: 1.83,
          deg: 294,
          gust: 2.05
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: "n"
        },
        dt_txt: "2021-10-24 21:00:00"
      },
      {
        dt: 1635120000,
        main: {
          temp: 1.12,
          feels_like: -1.31,
          temp_min: 1.12,
          temp_max: 1.12,
          pressure: 1031,
          sea_level: 1031,
          grnd_level: 1004,
          humidity: 87,
          temp_kf: 0
        },
        weather: [
          {
            id: 802,
            main: "Clouds",
            description: "scattered clouds",
            icon: "03n"
          }
        ],
        clouds: {
          all: 44
        },
        wind: {
          speed: 2.14,
          deg: 241,
          gust: 2.33
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: "n"
        },
        dt_txt: "2021-10-25 00:00:00"
      },
      {
        dt: 1635130800,
        main: {
          temp: 0.41,
          feels_like: -2.7,
          temp_min: 0.41,
          temp_max: 0.41,
          pressure: 1031,
          sea_level: 1031,
          grnd_level: 1004,
          humidity: 89,
          temp_kf: 0
        },
        weather: [
          {
            id: 801,
            main: "Clouds",
            description: "few clouds",
            icon: "02n"
          }
        ],
        clouds: {
          all: 16
        },
        wind: {
          speed: 2.66,
          deg: 232,
          gust: 3.6
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: "n"
        },
        dt_txt: "2021-10-25 03:00:00"
      },
      {
        dt: 1635141600,
        main: {
          temp: 0.75,
          feels_like: -2.63,
          temp_min: 0.75,
          temp_max: 0.75,
          pressure: 1031,
          sea_level: 1031,
          grnd_level: 1004,
          humidity: 86,
          temp_kf: 0
        },
        weather: [
          {
            id: 802,
            main: "Clouds",
            description: "scattered clouds",
            icon: "03d"
          }
        ],
        clouds: {
          all: 33
        },
        wind: {
          speed: 3.03,
          deg: 218,
          gust: 6.87
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: "d"
        },
        dt_txt: "2021-10-25 06:00:00"
      },
      {
        dt: 1635152400,
        main: {
          temp: 5.84,
          feels_like: 2.42,
          temp_min: 5.84,
          temp_max: 5.84,
          pressure: 1031,
          sea_level: 1031,
          grnd_level: 1004,
          humidity: 64,
          temp_kf: 0
        },
        weather: [
          {
            id: 803,
            main: "Clouds",
            description: "broken clouds",
            icon: "04d"
          }
        ],
        clouds: {
          all: 54
        },
        wind: {
          speed: 4.92,
          deg: 215,
          gust: 7.51
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: "d"
        },
        dt_txt: "2021-10-25 09:00:00"
      },
      {
        dt: 1635163200,
        main: {
          temp: 7.87,
          feels_like: 4.71,
          temp_min: 7.87,
          temp_max: 7.87,
          pressure: 1029,
          sea_level: 1029,
          grnd_level: 1002,
          humidity: 55,
          temp_kf: 0
        },
        weather: [
          {
            id: 802,
            main: "Clouds",
            description: "scattered clouds",
            icon: "03d"
          }
        ],
        clouds: {
          all: 35
        },
        wind: {
          speed: 5.54,
          deg: 215,
          gust: 8.09
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: "d"
        },
        dt_txt: "2021-10-25 12:00:00"
      },
      {
        dt: 1635174000,
        main: {
          temp: 4.62,
          feels_like: 1.47,
          temp_min: 4.62,
          temp_max: 4.62,
          pressure: 1028,
          sea_level: 1028,
          grnd_level: 1001,
          humidity: 70,
          temp_kf: 0
        },
        weather: [
          {
            id: 800,
            main: "Clear",
            description: "clear sky",
            icon: "01n"
          }
        ],
        clouds: {
          all: 6
        },
        wind: {
          speed: 3.87,
          deg: 199,
          gust: 9.2
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: "n"
        },
        dt_txt: "2021-10-25 15:00:00"
      },
      {
        dt: 1635184800,
        main: {
          temp: 3.58,
          feels_like: -0.35,
          temp_min: 3.58,
          temp_max: 3.58,
          pressure: 1027,
          sea_level: 1027,
          grnd_level: 1000,
          humidity: 73,
          temp_kf: 0
        },
        weather: [
          {
            id: 802,
            main: "Clouds",
            description: "scattered clouds",
            icon: "03n"
          }
        ],
        clouds: {
          all: 34
        },
        wind: {
          speed: 4.82,
          deg: 201,
          gust: 12.83
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: "n"
        },
        dt_txt: "2021-10-25 18:00:00"
      },
      {
        dt: 1635195600,
        main: {
          temp: 2.96,
          feels_like: -1.01,
          temp_min: 2.96,
          temp_max: 2.96,
          pressure: 1027,
          sea_level: 1027,
          grnd_level: 1000,
          humidity: 73,
          temp_kf: 0
        },
        weather: [
          {
            id: 804,
            main: "Clouds",
            description: "overcast clouds",
            icon: "04n"
          }
        ],
        clouds: {
          all: 99
        },
        wind: {
          speed: 4.61,
          deg: 201,
          gust: 13.11
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: "n"
        },
        dt_txt: "2021-10-25 21:00:00"
      },
      {
        dt: 1635206400,
        main: {
          temp: 2.19,
          feels_like: -1.97,
          temp_min: 2.19,
          temp_max: 2.19,
          pressure: 1026,
          sea_level: 1026,
          grnd_level: 999,
          humidity: 75,
          temp_kf: 0
        },
        weather: [
          {
            id: 803,
            main: "Clouds",
            description: "broken clouds",
            icon: "04n"
          }
        ],
        clouds: {
          all: 75
        },
        wind: {
          speed: 4.62,
          deg: 200,
          gust: 13.09
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: "n"
        },
        dt_txt: "2021-10-26 00:00:00"
      },
      {
        dt: 1635217200,
        main: {
          temp: 1.84,
          feels_like: -2.67,
          temp_min: 1.84,
          temp_max: 1.84,
          pressure: 1024,
          sea_level: 1024,
          grnd_level: 997,
          humidity: 73,
          temp_kf: 0
        },
        weather: [
          {
            id: 802,
            main: "Clouds",
            description: "scattered clouds",
            icon: "03n"
          }
        ],
        clouds: {
          all: 31
        },
        wind: {
          speed: 5.11,
          deg: 200,
          gust: 13.23
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: "n"
        },
        dt_txt: "2021-10-26 03:00:00"
      },
      {
        dt: 1635228000,
        main: {
          temp: 1.72,
          feels_like: -2.48,
          temp_min: 1.72,
          temp_max: 1.72,
          pressure: 1023,
          sea_level: 1023,
          grnd_level: 996,
          humidity: 73,
          temp_kf: 0
        },
        weather: [
          {
            id: 803,
            main: "Clouds",
            description: "broken clouds",
            icon: "04d"
          }
        ],
        clouds: {
          all: 52
        },
        wind: {
          speed: 4.49,
          deg: 203,
          gust: 12.45
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: "d"
        },
        dt_txt: "2021-10-26 06:00:00"
      },
      {
        dt: 1635238800,
        main: {
          temp: 6.46,
          feels_like: 2.94,
          temp_min: 6.46,
          temp_max: 6.46,
          pressure: 1022,
          sea_level: 1022,
          grnd_level: 996,
          humidity: 57,
          temp_kf: 0
        },
        weather: [
          {
            id: 802,
            main: "Clouds",
            description: "scattered clouds",
            icon: "03d"
          }
        ],
        clouds: {
          all: 49
        },
        wind: {
          speed: 5.51,
          deg: 216,
          gust: 9.07
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: "d"
        },
        dt_txt: "2021-10-26 09:00:00"
      },
      {
        dt: 1635249600,
        main: {
          temp: 9.14,
          feels_like: 6.38,
          temp_min: 9.14,
          temp_max: 9.14,
          pressure: 1021,
          sea_level: 1021,
          grnd_level: 994,
          humidity: 52,
          temp_kf: 0
        },
        weather: [
          {
            id: 802,
            main: "Clouds",
            description: "scattered clouds",
            icon: "03d"
          }
        ],
        clouds: {
          all: 49
        },
        wind: {
          speed: 5.36,
          deg: 222,
          gust: 8.62
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: "d"
        },
        dt_txt: "2021-10-26 12:00:00"
      },
      {
        dt: 1635260400,
        main: {
          temp: 5.73,
          feels_like: 2.99,
          temp_min: 5.73,
          temp_max: 5.73,
          pressure: 1021,
          sea_level: 1021,
          grnd_level: 994,
          humidity: 68,
          temp_kf: 0
        },
        weather: [
          {
            id: 801,
            main: "Clouds",
            description: "few clouds",
            icon: "02n"
          }
        ],
        clouds: {
          all: 20
        },
        wind: {
          speed: 3.59,
          deg: 211,
          gust: 7.81
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: "n"
        },
        dt_txt: "2021-10-26 15:00:00"
      },
      {
        dt: 1635271200,
        main: {
          temp: 4.19,
          feels_like: 1.09,
          temp_min: 4.19,
          temp_max: 4.19,
          pressure: 1021,
          sea_level: 1021,
          grnd_level: 994,
          humidity: 75,
          temp_kf: 0
        },
        weather: [
          {
            id: 801,
            main: "Clouds",
            description: "few clouds",
            icon: "02n"
          }
        ],
        clouds: {
          all: 14
        },
        wind: {
          speed: 3.63,
          deg: 223,
          gust: 9.04
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: "n"
        },
        dt_txt: "2021-10-26 18:00:00"
      },
      {
        dt: 1635282000,
        main: {
          temp: 3.4,
          feels_like: 0.21,
          temp_min: 3.4,
          temp_max: 3.4,
          pressure: 1020,
          sea_level: 1020,
          grnd_level: 993,
          humidity: 78,
          temp_kf: 0
        },
        weather: [
          {
            id: 800,
            main: "Clear",
            description: "clear sky",
            icon: "01n"
          }
        ],
        clouds: {
          all: 7
        },
        wind: {
          speed: 3.51,
          deg: 236,
          gust: 8.84
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: "n"
        },
        dt_txt: "2021-10-26 21:00:00"
      },
      {
        dt: 1635292800,
        main: {
          temp: 3.41,
          feels_like: 0.11,
          temp_min: 3.41,
          temp_max: 3.41,
          pressure: 1019,
          sea_level: 1019,
          grnd_level: 993,
          humidity: 80,
          temp_kf: 0
        },
        weather: [
          {
            id: 801,
            main: "Clouds",
            description: "few clouds",
            icon: "02n"
          }
        ],
        clouds: {
          all: 22
        },
        wind: {
          speed: 3.68,
          deg: 236,
          gust: 9
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: "n"
        },
        dt_txt: "2021-10-27 00:00:00"
      },
      {
        dt: 1635303600,
        main: {
          temp: 5.08,
          feels_like: 1.86,
          temp_min: 5.08,
          temp_max: 5.08,
          pressure: 1019,
          sea_level: 1019,
          grnd_level: 992,
          humidity: 85,
          temp_kf: 0
        },
        weather: [
          {
            id: 500,
            main: "Rain",
            description: "light rain",
            icon: "10n"
          }
        ],
        clouds: {
          all: 100
        },
        wind: {
          speed: 4.18,
          deg: 252,
          gust: 10.52
        },
        visibility: 10000,
        pop: 0.59,
        rain: {
          "3h": 0.66
        },
        sys: {
          pod: "n"
        },
        dt_txt: "2021-10-27 03:00:00"
      },
      {
        dt: 1635314400,
        main: {
          temp: 5.87,
          feels_like: 2.68,
          temp_min: 5.87,
          temp_max: 5.87,
          pressure: 1019,
          sea_level: 1019,
          grnd_level: 993,
          humidity: 89,
          temp_kf: 0
        },
        weather: [
          {
            id: 500,
            main: "Rain",
            description: "light rain",
            icon: "10d"
          }
        ],
        clouds: {
          all: 100
        },
        wind: {
          speed: 4.47,
          deg: 262,
          gust: 11.03
        },
        visibility: 10000,
        pop: 0.65,
        rain: {
          "3h": 0.33
        },
        sys: {
          pod: "d"
        },
        dt_txt: "2021-10-27 06:00:00"
      },
      {
        dt: 1635325200,
        main: {
          temp: 8.11,
          feels_like: 5.24,
          temp_min: 8.11,
          temp_max: 8.11,
          pressure: 1019,
          sea_level: 1019,
          grnd_level: 993,
          humidity: 77,
          temp_kf: 0
        },
        weather: [
          {
            id: 804,
            main: "Clouds",
            description: "overcast clouds",
            icon: "04d"
          }
        ],
        clouds: {
          all: 95
        },
        wind: {
          speed: 4.96,
          deg: 263,
          gust: 10.25
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: "d"
        },
        dt_txt: "2021-10-27 09:00:00"
      },
      {
        dt: 1635336000,
        main: {
          temp: 10.64,
          feels_like: 9.51,
          temp_min: 10.64,
          temp_max: 10.64,
          pressure: 1020,
          sea_level: 1020,
          grnd_level: 994,
          humidity: 67,
          temp_kf: 0
        },
        weather: [
          {
            id: 803,
            main: "Clouds",
            description: "broken clouds",
            icon: "04d"
          }
        ],
        clouds: {
          all: 62
        },
        wind: {
          speed: 6.05,
          deg: 284,
          gust: 9.56
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: "d"
        },
        dt_txt: "2021-10-27 12:00:00"
      },
      {
        dt: 1635346800,
        main: {
          temp: 7.86,
          feels_like: 5.03,
          temp_min: 7.86,
          temp_max: 7.86,
          pressure: 1022,
          sea_level: 1022,
          grnd_level: 995,
          humidity: 83,
          temp_kf: 0
        },
        weather: [
          {
            id: 801,
            main: "Clouds",
            description: "few clouds",
            icon: "02n"
          }
        ],
        clouds: {
          all: 19
        },
        wind: {
          speed: 4.72,
          deg: 302,
          gust: 10.23
        },
        visibility: 10000,
        pop: 0.07,
        sys: {
          pod: "n"
        },
        dt_txt: "2021-10-27 15:00:00"
      },
      {
        dt: 1635357600,
        main: {
          temp: 6.84,
          feels_like: 4.72,
          temp_min: 6.84,
          temp_max: 6.84,
          pressure: 1023,
          sea_level: 1023,
          grnd_level: 997,
          humidity: 88,
          temp_kf: 0
        },
        weather: [
          {
            id: 802,
            main: "Clouds",
            description: "scattered clouds",
            icon: "03n"
          }
        ],
        clouds: {
          all: 49
        },
        wind: {
          speed: 2.99,
          deg: 299,
          gust: 7.18
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: "n"
        },
        dt_txt: "2021-10-27 18:00:00"
      },
      {
        dt: 1635368400,
        main: {
          temp: 6.58,
          feels_like: 4.73,
          temp_min: 6.58,
          temp_max: 6.58,
          pressure: 1024,
          sea_level: 1024,
          grnd_level: 998,
          humidity: 90,
          temp_kf: 0
        },
        weather: [
          {
            id: 803,
            main: "Clouds",
            description: "broken clouds",
            icon: "04n"
          }
        ],
        clouds: {
          all: 79
        },
        wind: {
          speed: 2.55,
          deg: 263,
          gust: 4.48
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: "n"
        },
        dt_txt: "2021-10-27 21:00:00"
      },
      {
        dt: 1635379200,
        main: {
          temp: 7.4,
          feels_like: 5.06,
          temp_min: 7.4,
          temp_max: 7.4,
          pressure: 1024,
          sea_level: 1024,
          grnd_level: 998,
          humidity: 88,
          temp_kf: 0
        },
        weather: [
          {
            id: 804,
            main: "Clouds",
            description: "overcast clouds",
            icon: "04n"
          }
        ],
        clouds: {
          all: 89
        },
        wind: {
          speed: 3.54,
          deg: 251,
          gust: 8.77
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: "n"
        },
        dt_txt: "2021-10-28 00:00:00"
      },
      {
        dt: 1635390000,
        main: {
          temp: 7.57,
          feels_like: 4.92,
          temp_min: 7.57,
          temp_max: 7.57,
          pressure: 1024,
          sea_level: 1024,
          grnd_level: 997,
          humidity: 85,
          temp_kf: 0
        },
        weather: [
          {
            id: 804,
            main: "Clouds",
            description: "overcast clouds",
            icon: "04n"
          }
        ],
        clouds: {
          all: 100
        },
        wind: {
          speed: 4.19,
          deg: 244,
          gust: 9.8
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: "n"
        },
        dt_txt: "2021-10-28 03:00:00"
      },
      {
        dt: 1635400800,
        main: {
          temp: 7.1,
          feels_like: 4.25,
          temp_min: 7.1,
          temp_max: 7.1,
          pressure: 1024,
          sea_level: 1024,
          grnd_level: 998,
          humidity: 91,
          temp_kf: 0
        },
        weather: [
          {
            id: 804,
            main: "Clouds",
            description: "overcast clouds",
            icon: "04d"
          }
        ],
        clouds: {
          all: 94
        },
        wind: {
          speed: 4.38,
          deg: 248,
          gust: 10.6
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: "d"
        },
        dt_txt: "2021-10-28 06:00:00"
      },
      {
        dt: 1635411600,
        main: {
          temp: 10.53,
          feels_like: 9.75,
          temp_min: 10.53,
          temp_max: 10.53,
          pressure: 1024,
          sea_level: 1024,
          grnd_level: 997,
          humidity: 81,
          temp_kf: 0
        },
        weather: [
          {
            id: 803,
            main: "Clouds",
            description: "broken clouds",
            icon: "04d"
          }
        ],
        clouds: {
          all: 79
        },
        wind: {
          speed: 6.33,
          deg: 258,
          gust: 11.22
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: "d"
        },
        dt_txt: "2021-10-28 09:00:00"
      }
    ],
    city: {
      id: 625144,
      name: "Minsk",
      coord: {
        lat: 53.9,
        lon: 27.5667
      },
      country: "BY",
      population: 1742124,
      timezone: 10800,
      sunrise: 1634964745,
      sunset: 1635000924
    }
  }
];

// Sample error for imperative Apex call
const APEX_CONTACTS_ERROR = {
  body: { message: "An internal server error has occurred" },
  ok: false,
  status: 400,
  statusText: "Bad Request"
};

describe("c-apex-imperative-method", () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
    // Prevent data saved on mocks from leaking between tests
    jest.clearAllMocks();
  });

  // Helper function to wait until the microtask queue is empty. This is needed for promise
  // timing when calling imperative Apex.
  async function flushPromises() {
    return Promise.resolve();
  }

  it("renders two contacts returned from imperative Apex call", async () => {
    // Assign mock value for resolved Apex promise
    refreshWeather.mockResolvedValue(APEX_CONTACTS_SUCCESS);

    // Create initial element
    const element = createElement("c-apex-imperative-method", {
      is: weather
    });
    document.body.appendChild(element);

    // Select button for executing Apex call
    const buttonEl = element.shadowRoot.querySelector("lightning-button");
    buttonEl.click();

    // Wait for any asynchronous DOM updates
    await flushPromises();

    const detailEls = element.shadowRoot.querySelectorAll("p:not([class])");
    expect(detailEls.length).toBe(APEX_CONTACTS_SUCCESS.length);
    expect(detailEls[0].textContent).toBe(APEX_CONTACTS_SUCCESS[0].Name);
    expect(detailEls[1].textContent).toBe(APEX_CONTACTS_SUCCESS[1].Name);
  });

  it("renders the error panel when the Apex method returns an error", async () => {
    // Assign mock value for rejected Apex promise
    refreshWeather.mockRejectedValue(APEX_CONTACTS_ERROR);

    // Create initial element
    const element = createElement("c-apex-imperative-method", {
      is: weather
    });
    document.body.appendChild(element);

    // Select button for executing Apex call
    const buttonEl = element.shadowRoot.querySelector("lightning-button");
    buttonEl.click();

    // Wait for any asynchronous DOM updates
    await flushPromises();

    const errorPanelEl = element.shadowRoot.querySelector("c-error-panel");
    expect(errorPanelEl).not.toBeNull();
  });
});
