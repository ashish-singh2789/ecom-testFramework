import { test } from "@playwright/test";
import { address1, address2, cardCvv, cityName, creditCard, expirationDate, firstName, imageFilePath, password, phoneNumber, timeout, url, userId, zipCode } from "../config/constants";
import loginPageSelectors from "../selectors/loginPageSelectors.js";
import searchPageSelectors from "../selectors/searchPageSelectors.js";
import productPageSelectors from "../selectors/productPageSelectors.js";
import cartPageSelectors from "../selectors/cartPageSelectors.js";
import { BaseContext } from "../utilities/basecontext";

const user = Buffer.from(userId, "base64").toString("ascii");
const pswd = Buffer.from(password, "base64").toString("ascii");

test.describe("E-COMMERCE : ", () => {
  
  test("Shopping", async ({ page }) => {
    const context = new BaseContext(page);

    await context.Pumalogin(user, pswd);
    
    await context.delay(timeout); //Delay added to wait for the page to be loaded completely.
    await page.locator(loginPageSelectors.MENU_ITEM).hover();

    // Open Shoes category from the dropdown
    await page.locator(loginPageSelectors.SHOES).click();

    // Filter 1 : Size - 14
    await page.getByRole('button', { name: "Size" }).click();
    await page.locator(searchPageSelectors.SIZE14).click();

    // Filter 2 : Color - Black
    await page.getByRole('button', { name: "Color" }).click();
    await page.locator(searchPageSelectors.BLK_COLOR).click();

    // Filter 3 : Price Range - $100 - $150
    await page.getByRole('button', { name: "Price" }).click();
    await page.locator('label').filter({ hasText: '$100 - $150' }).locator("div").first().click();

    // Sort the search as Price low to high
    await page.locator(searchPageSelectors.SORT).selectOption("price-low-to-high");

    // Open product page
    await page.getByRole('link', { name: "Go to Fuse 2.0 Men\'s Training Shoes Puma Black-CASTLEROCK" }).click();

    // Select the size
    await page.getByText('Size14').click();

    // Waiting for the Add to cart Button
    await page.waitForSelector(productPageSelectors.ADDTOCART);

    // Add the product to cart
    await page.locator(productPageSelectors.ADDTOCART).click();
    await context.delay(timeout);

    // Checkout from Mini Cart
    page.locator(productPageSelectors.MINICART_CHECKOUT).click();

    // Checkout from Cart
    await page.locator(cartPageSelectors.CHECKOUT).click();

    // Fill address
    await context.fillAddress(address1, address2, cityName, zipCode, phoneNumber);

    // Select Shipping mode
    await page.locator('label').filter({ hasText: "StandardEstimated" }).locator("div").first().click();

    await context.pageScreenshot(imageFilePath);

    // Checkout to payment
    await context.checkout(firstName, creditCard, expirationDate, cardCvv);

    // Remove item from the cart
    await context.removeItem();

    // Logout
    await context.logout();
  });
});
