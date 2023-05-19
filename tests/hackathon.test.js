// @ts-check
const { test, expect } = require('@playwright/test');

//Test 1: whether a new todo can be added to the list ok
//Test 2: if a todo can be deleted from the list by clicking the delete button ok
//Test 3: if a todo can be saved after refreshing the page ok


//For each test, 
//1. Go to the page 
//2. Select an element we are using (getByRole, getByLabe...)
//3. Perform an action on the element (fill, click...)
//4. Assert that action
//5. Compare the expected with the actual result

const TODO_ITEMS = [
  'wash my dog',
  'play guitar',
  'watch a movie'
];

const DATES = [
  '2021-12-31',
  '2023-04-03',
  '2025-06-15'
]


test('should allow users to add todo items', async ({ page }) => {
  await page.goto('http://localhost:3000'); 

  // create a new todo locator and fill in the 1st todo.

  const newTodo = page.getByLabel('Task');
  await newTodo.fill(TODO_ITEMS[0]);

  // select the date to fill and put in a date

  const newDate = page.getByLabel('Completion date');
  await newDate.fill('2021-12-31');

  // click the add button

  await page.getByTitle('Create a new todo').click();
  await expect(page.locator('ul > li')).toContainText(TODO_ITEMS[0]);
});

test('pressing delete button removes list item', async ({page}) => {
  test.setTimeout(3000);

  await page.goto('http://localhost:3000');
  // create a new todo locator
  const newTodo = page.getByLabel('Task');

  // Create 1st todo.
  await newTodo.fill(TODO_ITEMS[0]);
  const newDate = page.getByLabel('Completion date');
  await newDate.fill(DATES[0]);
  await page.getByTitle('Create a new todo').click();

  // click on the delete button next to the first item in the list

  await page.getByRole('button').nth(1).click();

  //make sure the first item on the list is no longer there
  await expect(page.locator('ul > li')).not.toContainText([TODO_ITEMS[0]]);

});

test('whether the todo item will still be there after refreshing', async ({page}) => {
  test.setTimeout(3000);

  await page.goto('http://localhost:3000');
  // create a new todo locator
  const newTodo = page.getByLabel('Task');

  // Create 1st todo
  await newTodo.fill(TODO_ITEMS[0]);
  const newDate = page.getByLabel('Completion date');
  await newDate.fill(DATES[0]);
  await page.getByTitle('Create a new todo').click();

  //click on the refresh button
  await page.reload();

  //make sure the first item on the list is still there
  await expect(page.locator('ul > li')).toContainText([TODO_ITEMS[0]]);

});


test('testing codegen test generator', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.getByPlaceholder('Enter a task...').click();
  await page.getByPlaceholder('Enter a task...').fill('Wash the cat');
  await page.getByLabel('Completion date').fill('2023-05-05');
  

  await page.getByRole('button', { name: '➕ Create!' }).click();
  await expect(page.locator('ul > li')).toContainText(['Wash the cat']);
});


