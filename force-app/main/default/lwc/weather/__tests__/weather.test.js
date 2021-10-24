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
    Id: "a01N000000N0EsoIAF",
    Name: "London 2021-10-23 12:00:00",
    City__c: "a05N000000BGZBMIA5",
    Temperature__c: 37,
    Weather_message__c: "goodi"
  },
  {
    Id: "a01N000000N0EsqIAF",
    Name: "London 2021-10-23 15:00:00",
    City__c: "a05N000000BGZBMIA5",
    Temperature__c: 37,
    Weather_message__c: "goodi"
  }
];
// Sample error for imperative Apex call
const APEX_CONTACTS_ERROR = {
  body: { message: "An internal server error has occurred" },
  ok: false,
  status: 400,
  statusText: "Bad Request"
};

describe("c-weather", () => {
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
    const element = createElement("c-weather", {
      is: weather
    });
    document.body.appendChild(element);

    // Select button for executing Apex call
    const buttonEl = element.shadowRoot.querySelector("lightning-button");
    buttonEl.click();

    // Wait for any asynchronous DOM updates
    await flushPromises();

    const detailEls = element.shadowRoot.querySelectorAll(
      "slds-var-m-bottom_xx-small"
    );
    //  expect(detailEls.length).toBe(160);
    expect(detailEls[0].textContent).toBe(APEX_CONTACTS_SUCCESS[0].Id);
    expect(detailEls[1].textContent).toBe(APEX_CONTACTS_SUCCESS[0].City__c);
  });

  it("renders the error panel when the Apex method returns an error", async () => {
    // Assign mock value for rejected Apex promise
    refreshWeather.mockRejectedValue(APEX_CONTACTS_ERROR);

    // Create initial element
    const element = createElement("c-weather", {
      is: weather
    });
    document.body.appendChild(element);

    // Select button for executing Apex call
    const buttonEl = element.shadowRoot.querySelector("lightning-button");
    buttonEl.click();

    // Wait for any asynchronous DOM updates
    await flushPromises();

    const errorPanelEl = element.shadowRoot.querySelector(
      "slds-text-color_error"
    );
    expect(errorPanelEl).not.toBeNull();
  });
  it("is accessible when data is returned", async () => {
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

    await expect(element).toBeAccessible();
  });

  it("is accessible when error is returned", async () => {
    // Assign mock value for rejected Apex promise
    weather.mockRejectedValue(APEX_CONTACTS_ERROR);

    // Create initial element
    const element = createElement("c-apex-imperative-method", {
      is: refreshWeather
    });
    document.body.appendChild(element);

    // Select button for executing Apex call
    const buttonEl = element.shadowRoot.querySelector("lightning-button");
    buttonEl.click();

    // Wait for any asynchronous DOM updates
    await flushPromises();

    await expect(element).toBeAccessible();
  });
});
