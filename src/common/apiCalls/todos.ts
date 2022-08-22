import { addTodoUrl } from "../../config/urls.config";
import { TodoInterface } from "../../todos/interfaces/todo.interface";

const createTodo = async (form: Omit<TodoInterface, 'id' | 'done'>) => {
    const responseRaw = await fetch(addTodoUrl(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })
    const response = await responseRaw.json();
    if (response.ok)
      return Promise.resolve(response);
    return Promise.reject(response);
}
  
export {
  createTodo,
};

