import { Locator, Page, expect, test } from "@playwright/test";
import ApplicationURL from "../helpers/ApplicationURL";
import { ErrorMessages } from "../helpers/ErrorMessage";
import { BasePage } from "./BasePage";

export default class LoginPage extends BasePage{
  private userName_field: Locator;
  private password_field: Locator;
  private login_button: Locator;
  private error_message: Locator;
  private default_username = process.env.STANDARD_USER as string;
  private default_password = process.env.CORRECT_PASSWORD as string;


  constructor(protected page: Page) {
    super(page);
    this.userName_field = this.page.locator('[data-test="username"]');
    this.password_field = this.page.locator('[data-test="password"]');
    this.login_button = this.page.locator('[data-test="login-button"]');
    this.error_message = this.page.locator('[data-test="error"]');
  }

  public async loginToApplication(username = this.default_username, password = this.default_password, url = ApplicationURL.BASE_URL) {
    await this.page.goto(url);
    await this.validatePageUrl(ApplicationURL.BASE_URL);
    await this.userName_field.fill(username);
    await this.password_field.fill(password);
    await this.clickElement(this.login_button);
  }

  public async validatePageUrl(url: string){
    await test.step(`Validate that a correct value of the page URL is ${url}`,async () => {});
    await expect(this.page).toHaveURL(url, {timeout:10000});
  }

  public async validateErrorMessage(error_message : ErrorMessages){
    await expect(this.error_message).toContainText(error_message.valueOf());
  }
}
