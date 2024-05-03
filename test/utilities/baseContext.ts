import { Page } from "@playwright/test";
import { cartPageLink, timeout, url } from "../config/constants";
import cartPageSelectors from "../selectors/cartPageSelectors";
import checkoutPageSelectors from "../selectors/checkoutPageSelectors";
import loginPageSelectors from "../selectors/loginPageSelectors";

export class BaseContext {
    /**
     * Constuctor for HzContext
     * @param page - page fixture for playwright
     */
    constructor(public page: Page) {};


    /**
     * Login page functionality
     */
    async Pumalogin(user: string, pswd: string) {
        await this.page.goto(url, { waitUntil: "load" });
        await this.page.locator(loginPageSelectors.QUICKLINK_BUTTON).click();
        await this.page.locator(loginPageSelectors.PROFILE_BUTTON).click();
        await this.page.getByPlaceholder(loginPageSelectors.EMAIL).fill(user);
        await this.page.getByPlaceholder(loginPageSelectors.PASSWORD).fill(pswd);
        await this.page.waitForSelector(loginPageSelectors.LOGIN_BUTTON);
        await this.page.locator(loginPageSelectors.LOGIN_BUTTON).click();

        // Closing choose country popup
        let locatorElem = await this.page.$(loginPageSelectors.COUNTRYSELECTOR);
        if (locatorElem) {
            await this.page.locator(loginPageSelectors.COUNTRYPOPUPCLOSE).click();
        }

    }

    /**
     * Remove the product from cart
     */
    async removeItem() {
        await this.page.goto(cartPageLink, { waitUntil: "load" });
        await this.page.locator(cartPageSelectors.REMOVEITEM).click();
        await this.page.locator(cartPageSelectors.CONFIRM).click();
    }

    /**
     * Delay function
     * @param timeout - delay in ms
     */
    async delay(timeout: number) {
        await this.page.waitForTimeout(timeout);
    }

    /**
     * Fill Address
     */
    async fillAddress(street: string, landmark: string, cityName: string, postalCode: string, mobile: string) {
        // await this.page.locator();
        // await this.page.pause();

        await this.page.locator(checkoutPageSelectors.ADDRESS1).click();
        await this.page.locator(checkoutPageSelectors.ADDRESS1).clear();
        await this.page.locator(checkoutPageSelectors.ADDRESS1).fill(street);

        await this.delay(timeout);
        await this.page.locator(checkoutPageSelectors.ADDRESS2).click();
        await this.page.locator(checkoutPageSelectors.ADDRESS2).clear();
        await this.page.locator(checkoutPageSelectors.ADDRESS2).fill(landmark);
        
        await this.delay(timeout);
        await this.page.locator(checkoutPageSelectors.CITY).click();
        await this.page.locator(checkoutPageSelectors.CITY).clear();
        await this.page.locator(checkoutPageSelectors.CITY).fill(cityName);
        
        await this.delay(timeout);
        await this.page.locator(checkoutPageSelectors.POSTALCODE).click();
        await this.page.locator(checkoutPageSelectors.POSTALCODE).clear();
        await this.page.locator(checkoutPageSelectors.POSTALCODE).fill(postalCode);

        await this.delay(timeout);
        await this.page.locator(checkoutPageSelectors.PHONENO).click();
        await this.page.locator(checkoutPageSelectors.PHONENO).clear();
        await this.page.locator(checkoutPageSelectors.PHONENO).fill(mobile);
    }

    /**
     * Take screenshot of the whole page
     * @param filePath - File path to save the screenshot
     */
    async pageScreenshot(filePath: string) {
        await this.page.screenshot({ path: filePath });
    }

    /**
     * Checkout
     * @param name - card holder name
     * @param cardNumber - credit card number
     * @param expiryDate - credit card expiration date
     * @param cvv - credit card cvv
     */
    async checkout(name: string, cardNumber: string, expiryDate: string, cvv: string) {
        // await this.page.waitForSelector("[data-test-id='continue-to-payment']");
        await this.page.locator(checkoutPageSelectors.CONTINUEPAYMENT).click();

        // await this.page.locator(checkoutPageSelectors.CARDHOLDERNAME).click();
        await this.page.locator(checkoutPageSelectors.CARDHOLDERNAME).fill(name);

        // await this.page.locator('[data-test-id="credit-card-holder-name"]').click();
        await this.page.locator(checkoutPageSelectors.CCNUMBER).fill(cardNumber);

        // await this.page.locator(checkoutPageSelectors.CCEXPIRYDATE).click();
        await this.page.locator(checkoutPageSelectors.CCEXPIRYDATE).fill(expiryDate);

        // await this.page.locator('[data-test-id="credit-card-cvv"]').click();
        await this.page.locator(checkoutPageSelectors.CVV).fill(cvv);
    }

    /**
     * Logout
     */
    async logout() {
        await this.page.locator(loginPageSelectors.QUICKLINK_BUTTON).click();
        await this.page.locator(loginPageSelectors.LOGOUT_BUTTON).click();
    }
}