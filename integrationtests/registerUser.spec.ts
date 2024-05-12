import { expect, test } from '@playwright/test';
import AppPage from './AppPage';
import { fakeUser } from './fakeUser';

test.describe('User registration', () => {
  test('Correctly filled form is successfully submitted', async ({ page }) => {
    // GIVEN
    const appPage = await new AppPage(page).goto();

    // WHEN
    await appPage.enterUserInfoToRegistrationForm(fakeUser);
    await appPage.registerButton.click();

    // THEN
    await expect(appPage.registeredUserListItem).toHaveText(Object.values(fakeUser).join(', '));
  });

  test('Empty form is tried to be submitted', async ({ page }) => {
    // GIVEN
    const appPage = await new AppPage(page).goto();

    // WHEN
    await appPage.registerButton.click();

    // THEN
    await appPage.expectUserRegistrationFormToShowErrors();
    await expect(appPage.registeredUserListItem).toBeHidden();
  });

  test('Form submission fails', async ({ page }) => {
    // GIVEN
    const appPage = await new AppPage(page, true).goto();

    // WHEN
    await appPage.enterUserInfoToRegistrationForm(fakeUser);
    await appPage.registerButton.click();

    // THEN
    await expect(appPage.getRegistrationErrorMsg()).toBeVisible();
    await expect(appPage.registeredUserListItem).toBeHidden();
  });
});
