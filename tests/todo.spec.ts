import { test, expect, type Page } from '@playwright/test';

const TODO_ITEMS = ['Go to KMIT', 'go back in time', 'learn Playwrite'];

test.beforeEach(async ({ page }) => {
// Load the TodoMVC application
    await page.goto('/');
  
  });
  
  

test.describe('Initial state', () => {
  test('should be empty with focused input', async ({ page }) => {
    
    const todoList = page.getByTestId('todo-list');

    // Make sure the list only has no items
    await expect(todoList).toBeEmpty();

    const todoInput = page.getByTestId('text-input');

    // Make sure the input is focused
    await expect(todoInput).toBeFocused();
  });
});

test.describe('New Todo', () => {
    test('should allow me to add todo items', async ({ page }) => {
  
      // create a new todo locator
      const todoList = page.getByTestId('todo-list');

      const todoInput = page.getByTestId('text-input');
  
      await todoInput.fill(TODO_ITEMS[0]);
      await todoInput.press('Enter');
  
      // Make sure the list only has one todo item.
      await expect(page.getByTestId('todo-item-label')).toHaveText([
        TODO_ITEMS[0],
      ]);
  
      // Create 2nd todo.
      await todoInput.fill(TODO_ITEMS[1]);
      await todoInput.press('Enter');
  
      // Make sure the list now has two todo items.
      await expect(page.getByTestId('todo-item-label')).toHaveText([
        TODO_ITEMS[0],
        TODO_ITEMS[1],
      ]);
    });
  });

  test.describe('Visual comparison', () => {
    test('initial state', async ({ page }) => {
      await expect(page).toHaveScreenshot();
    });
  });
  
