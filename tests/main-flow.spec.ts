import { test, expect } from "@playwright/test";
import {LoanBasePage} from "../src/pages/LoanBasePage";

let loan: LoanBasePage;

test.beforeEach(async ({ page }) => {
    await page.route("**/api/loan-calc?amount=500&period=12", async (route) => {
        await route.fulfill({
            json: { paymentAmountMonthly: "55.8" },
        });
    });

    loan = new LoanBasePage(page);
    await loan.open();
});
test("should show mocked monthly payment amount", async ({ page }) => {
    await expect(loan.monthlyPayment).toBeVisible();
    const textContentElement = await loan.monthlyPayment.textContent();
    console.log(textContentElement);
    const monthlyValue = textContentElement?.replace("€", "").trim() ?? "";
    expect(monthlyValue).toBe("55.8");
});

test("should display and hide error message based on mocked API response", async ({ page }) => {
    await page.route("**/api/loan-calc?amount=499&period=12", async (route) => {
        await route.fulfill({
            status: 400,
        });
    });

    await loan.enterAmount("499");
    await expect(loan.oopsErrorMessage).toBeVisible();

    await loan.enterAmount("500");
    await expect(loan.oopsErrorMessage).not.toBeVisible();

    await loan.applyForLoan();
    await loan.login("abalaksin", "password");
    await loan.finishFlow();
});
