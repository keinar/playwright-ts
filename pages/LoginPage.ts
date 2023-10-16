import { Locator, Page, expect } from "@playwright/test";
import ApplicationURL from "../helpers/ApplicationURL";

export default class LoginPage {
  userName_field: Locator;
  password_field: Locator;
  submit_button: Locator;


  constructor(protected page: Page) {
    this.userName_field = this.page.locator('[data-test="username"]');
    this.password_field = this.page.locator('[data-test="password"]');
    this.submit_button = this.page.locator('[data-test="login-button"]');
  }

  public async loginToApplication(username: string, password: string, url = ApplicationURL.BASE_URL) {
    await this.page.goto(url);
    await this.validatePageUrl(ApplicationURL.BASE_URL);
    await this.userName_field.fill(username);
    await this.password_field.fill(password);
    await this.submit_button.click();
  }

  public async validatePageUrl(url: string){
    await expect(this.page).toHaveURL(url, {timeout:10000});
  }
}
