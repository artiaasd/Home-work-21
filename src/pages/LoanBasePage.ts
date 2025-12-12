import { Locator, Page } from "@playwright/test";

export class LoanBasePage {
    readonly URL = "http://localhost:3000";

    readonly page: Page;

    readonly monthlyPayment: Locator;
    readonly amountField: Locator;
    readonly oopsErrorMessage: Locator;
    readonly applyButton: Locator;
    readonly usernameField: Locator;
    readonly passwordField: Locator;
    readonly continueButton: Locator;
    readonly finalContinueButton: Locator;
    readonly finalOkButton: Locator;
    readonly applyForLoan1: Locator;
    readonly applyForLoan2: Locator;

    constructor(page: Page) {
        this.page = page;

        this.monthlyPayment = page.getByTestId("ib-small-loan-calculator-field-monthlyPayment",);
        this.amountField = page.getByTestId("id-small-loan-calculator-field-amount",);
        this.oopsErrorMessage = page.getByTestId("id-small-loan-calculator-field-error",);
        this.applyButton = page.getByTestId("id-small-loan-calculator-field-apply");
        this.usernameField = page.getByTestId("login-popup-username-input");
        this.passwordField = page.getByTestId("login-popup-password-input");
        this.continueButton = page.getByTestId("login-popup-continue-button");
        this.finalContinueButton = page.getByTestId("final-page-continue-button");
        this.finalOkButton = page.getByTestId("final-page-success-ok-button");
        this.applyForLoan1 = page.getByTestId("id-image-element-button-image-1");
        this.applyForLoan2 = page.getByTestId("id-image-element-button-image-2");
    }

    async open() {
        await this.page.goto(this.URL);
    }

    async enterAmount(value: string) {
        await this.amountField.fill(value);
    }

    async applyForLoan() {
        await this.applyButton.click();
    }

    async login(username: string, password: string) {
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        await this.continueButton.click();
    }

    async finishFlow() {
        await this.finalContinueButton.click();
        await this.finalOkButton.click();
    }
}
