// This file contains helper functions for interacting with the todos REST API. Except there is no API in this case, so these functions basically just "simulate" an API by manipulating and returning dummy data.

/**
 * Defining the endpoint in one place so that if it needs to be changed,
 * it only needs to be changed here.
 *
 * A relative url (as opposed to an absolute url) is used. The assumption
 * is that the same backend/origin is handling the REST API and
 * serving the frontend.
 */
const todosApiEndpoint = "/api/todos";

/**
 * A function for creating a unique id for each todo. Normally, a database/API might handle creating unique ids.
 */
export function createUniqueId() {
  return window.crypto?.randomUUID?.() ?? Math.random().toString(16).slice(2);
}

/**
 * Should get all todos.
 *
 * @example
 * ```
 * // Should contain an array of todo objects.
 * const todos = await getAllTodos();
 * ```
 */
export async function getAllTodos() {
  sessionStorage.todos ??= "[]";
  return JSON.parse(sessionStorage.todos);
}

/**
 * Should create a new todo.
 *
 * @example
 * ```
 * const task = "Water the plants";
 * const completionDate = "2025-03-01";
 * // Should contain the newly created todo object (or null if creation failed).
 * const created = await createTodo({ task: task, completionDate: completionDate });
 * ```
 */
export async function createTodo(newTodo) {
  const created = {
    id: createUniqueId(),
    task: newTodo.task,
    completionDate: newTodo.completionDate,
  };

  const todos = JSON.parse(sessionStorage.todos);
  todos.push(created);
  sessionStorage.todos = JSON.stringify(todos);

  return created;
}

/**
 * Should delete a particular todo.
 *
 * @example
 * ```
 * const idToDelete = "523c1ffb-2dce-4052-84de-bd7a4c48960d";
 * // Should contain the deleted todo object (or null if deletion failed)
 * const deleted = await deleteTodo(idToDelete);
 * ```
 */
export async function deleteTodo(todoId) {
  const todos = JSON.parse(sessionStorage.todos);
  const deletionIndex = todos.findIndex((todo) => todo.id === todoId);

  if (-1 === deletionIndex) {
    return null;
  }

  const [removed] = todos.splice(deletionIndex, 1);
  sessionStorage.todos = JSON.stringify(todos);
  return removed;
}
