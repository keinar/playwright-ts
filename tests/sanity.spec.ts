import { test } from "@playwright/test";
import UserCredentials from "../helpers/UserCredentials";
import ApplicationURL from "../helpers/ApplicationURL";
import ProductsPage from "../pages/ProductsPage";
import LoginPage from "../pages/loginPage";

test.describe("Sanity tests",async () => {
  test.beforeEach(async () => {
      
  })

test("sanity test", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.loginToApplication(
    UserCredentials.STANDARD_USER,
    UserCredentials.CORRECT_PASSWORD
  );

  loginPage.validatePageUrl(`${ApplicationURL.BASE_URL}/inventory.html`);

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
  const loginPage = new LoginPage(page);
  await loginPage.loginToApplication(
    UserCredentials.STANDARD_USER,
    UserCredentials.CORRECT_PASSWORD
  );
  const productsPage = new ProductsPage(page);
  await productsPage.validatePageUrl(ApplicationURL.INVENTORY_PAGE_URL);
  await productsPage.validateTitle('Products');
});

})