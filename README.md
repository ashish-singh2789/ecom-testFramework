# E-commerce and Weather API health check framework.

##  Automation Test Suite

-   ### Folder Structure

    1. api-test - WeatherAPI healthCheck
    
    2. config - Config files

    4. selectors - Page selectors

    3. specs - Test spec files

    4. utilities - Context methods

-   ### How to run the tests

    `cd ecom-testFramework`

    `npm run test:playwright`

-   ### Note:

    1. API and UI tests will run in parallel.

    2. UI tests will run in head mode because there is an issue with the website where network glitch is happening in headless on the UI when customer is trying to login into the website.

-   ### UI Test Cases:

    1. Login to the website

    2. Search the Product using below mentioned filters -

        a. Size - 14

        b. Color - Black

        c. Price Range - $100 - $150

    3. Sort the page with Price low to high

    4. Open the Product page

    5. Select the size and Add the product to shopping cart

    6. Proceed to Checkout from the shopping cart page

    7. Fill the shipping address

    8. Select shipping and continue to payment

    9. Add a dummy credit card details

    10. Capture the screenshot of the order summary

    11. Go back to shopping cart

    12. Remove the item from the cart page

    13. Logout from the website

-   ### API Test:

    Here, I am performing a health check for whetherAPI. I'm passing the city name as "Bengaluru" into the request to get the city's temperature. The response is saved into a json file.