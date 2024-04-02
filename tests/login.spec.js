// @ts-check
import { test, expect } from "@playwright/test";
import { randomInt } from "crypto";
import { describe } from "node:test";

//Test bundle for Login page
describe("Login page tests (id LoginPage-####)", () => {
  test("Test Login Page with correct credentials ", async ({ page }) => {
    //Go to the app's page
    await page.goto("http://localhost:5173/");
    //Grab the heading element and check
    const heading = await page.getByRole("heading", { name: "Groceries App" });
    await expect(heading).toHaveText("Groceries App");
    //Grab the username element and fill in a correct username
    const username = await page.getByLabel("Username");
    await username.click();
    await username.fill("ziad");
    //Get password field and fill it with a correct password
    const password = await page.getByLabel("Password");
    await password.click();
    await password.fill("123");
    //get login button and click
    await page.getByRole("button", { name: "Login" }).click();
    //expect the login to work and the page is redirected to "/main"
    await expect(page).toHaveURL(/main/i);
  });

  test("Test login page with incorrect username", async ({ page }) => {
    //Go to the app's page
    await page.goto("http://localhost:5173/");

    //Grab the username element and fill in a correct username
    const username = await page.getByLabel("Username");
    await username.click();
    await username.fill("helloworld");
    //Get password field and fill it with a correct password
    const password = await page.getByLabel("Password");
    await password.click();
    await password.fill("123");
    //get login button and click
    await page.getByRole("button", { name: "Login" }).click();
    //find and check the bad username message
    const noUsernameMsg = await page.getByText("Username does not exist");
    await expect(noUsernameMsg).toHaveText("Username does not exist");
    //expect the login to not work and the page is not redirected to "/main"
    await expect(page).not.toHaveURL(/main/i);
  });

  test("Test login page with incorrect password", async ({ page }) => {
    //Go to the app's page
    await page.goto("http://localhost:5173/");

    //Grab the username element and fill in a correct username
    const username = await page.getByLabel("Username");
    await username.click();
    await username.fill("ziad");
    //Get password field and fill it with a correct password
    const password = await page.getByLabel("Password");
    await password.click();
    await password.fill("helloworld132");
    //get login button and click
    await page.getByRole("button", { name: "Login" }).click();
    //find and check the bad username or password message
    const badAuthMsg = await page.getByText("Bad username or password");
    await expect(badAuthMsg).toHaveText("Bad username or password");
    //expect the login to not work and the page is not redirected to "/main"
    await expect(page).not.toHaveURL(/main/i);
  });

  test("check sign-up link redirects to create-user page at (/create-user)", async ({
    page,
  }) => {
    //Go to the app's page
    await page.goto("http://localhost:5173/");
    await page.getByRole("link", { name: "here" }).click();
    await expect(page).toHaveURL(/create-user/i);
  });
});

describe("Testing create-user page (id CreateUser-###)", () => {
  test("Add a new username and password", async ({ page }) => {
    //Go to the app's page
    await page.goto("http://localhost:5173/create-user");
    //Grab the heading element and check
    const heading = await page.getByRole("heading", { name: /create/i });
    await expect(heading).toHaveText(/create/i);
    //Get the username and password inputs and add data
    const username = `testZiad${randomInt(100)}`;
    await page.getByLabel("Username").click();
    await page.getByLabel("Username").fill(username);
    await page.getByLabel("Password").click();
    await page.getByLabel("Password").fill("123456");
    //Get create user button and click
    await page.getByRole("button", { name: "Create User" }).click();
    //check for congrats message
    const congratsMsg = await page.getByText(/Congrats! created username/i);
    await expect(congratsMsg).toHaveText(/Congrats! created username/i);
    //click on the go back to login page link and check for change in url
    await page.getByRole("link", { name: "Back to login page" }).click();
    await expect(page).toHaveURL("http://localhost:5173");
  });

  test("Check new username already exists", async ({ page }) => {
    //Go to the app's page
    await page.goto("http://localhost:5173/create-user");
    //Get the username and password inputs and add data
    const username = `ziad`;
    await page.getByLabel("Username").click();
    await page.getByLabel("Username").fill(username);
    await page.getByLabel("Password").click();
    await page.getByLabel("Password").fill("123456");
    //Get create user button and click
    await page.getByRole("button", { name: "Create User" }).click();
    //check for already exists message
    const congratsMsg = await page.getByText(/already exists/i);
    await expect(congratsMsg).toHaveText(/already exists/i);
    //click on the go back to login page link and check for change in url
    await page.getByRole("link", { name: "Back to login page" }).click();
    await expect(page).toHaveURL("http://localhost:5173");
  });
});
