import path from "path";

const url = "https://us.puma.com/us/en";
const myAccountURL = "https://us.puma.com/us/en/account";
const cartPageLink = "https://us.puma.com/us/en/cart";
const userId = "dGVzdGFjY291bnRfYXNoaXNoQHlhaG9vLmNvbQ";
const password = "QXNodUAyNzg5";
const address1 = "3000 S Dirksen Pkwy";
const address2 = "Crowne Plaza Springfield";
const cityName = "Southern View";
const state = "Illinois";
const zipCode = "62703";
const phoneNumber = "2175297777";
const jsonFilePath = path.resolve("./test/test-results/wheather.json");
const imageFilePath = path.resolve("./test/test-results/Order-Summary.jpg");
const timeout = 3000;
const firstName = "Ashish";
const lastName = "TestAccount";
const creditCard = "4236 4444 4666 2343";
const expirationDate = "10/25";
const cardCvv = "911";

export {
    url,
    myAccountURL,
    cartPageLink,
    userId,
    password,
    firstName,
    lastName,
    address1,
    address2,
    cityName,
    state,
    zipCode,
    phoneNumber,
    jsonFilePath,
    imageFilePath,
    timeout,
    creditCard,
    expirationDate,
    cardCvv
}