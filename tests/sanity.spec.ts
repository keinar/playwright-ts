import { test } from "@playwright/test";
import ApplicationURL from "../helpers/ApplicationURL";
import ProductsPage from "../pages/ProductsPage";
import LoginPage from "../pages/LoginPage";

test.describe("Sanity tests", async () => {
  let loginPage: LoginPage;
  let productsPage: ProductsPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
  });

  test("sanity test", async ({ page }) => {
    await loginPage.loginToApplication(
      process.env.STANDARD_USER,
      process.env.CORRECT_PASSWORD
    );

    await loginPage.validatePageUrl(ApplicationURL.INVENTORY_PAGE_URL);

    await page
      .locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]')
      .click();

    await page.locator("a").filter({ hasText: "1" }).click();
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="firstName"]').click();
    await page.locator('[data-test="firstName"]').fill("keinar");
    await page.locator('[data-test="firstName"]').press("Tab");
    await page.locator('[data-test="lastName"]').fill("elkayam");
    await page.locator('[data-test="lastName"]').press("Tab");
    await page.locator('[data-test="postalCode"]').fill("123");
    await page.locator('[data-test="continue"]').click();
    await page.locator('[data-test="finish"]').click();
    await page.locator('[data-test="back-to-products"]').click();
  });

  test("negative login test", async ({ page }) => {
    await loginPage.loginToApplication(
      process.env.STANDARD_USER,
      process.env.CORRECT_PASSWORD
    );
    await productsPage.validatePageUrl(ApplicationURL.INVENTORY_PAGE_URL);
    await productsPage.validateTitle("Products");
  });
});
