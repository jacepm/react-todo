import React, { useEffect, useState, FormEvent } from 'react';
import './App.css';
import { create, get, remove, update } from './services';

interface ITodo {
  title: string;
  completed: boolean;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

function App() {
  const [todos, setTodos] = useState([]);
  const [body, setBody] = useState({ title: '', completed: false });

  async function getItems(): Promise<void> {
    const res = await get(`todos`);
    return setTodos(res.data.data);
  }

  async function createItem(body: any): Promise<void> {
    await create(`todos`, body);
    return getItems();
  }

  async function updateItem(body: any): Promise<void> {
    await update(`todos/${body._id}`, body);
    return getItems();
  }

  async function removeItem(id: string): Promise<void> {
    await remove(`todos/${id}`);
    return getItems();
  }

  function onSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    setBody(body);
    !(body as any)._id ? createItem(body) : updateItem(body);
    setBody({ title: '', completed: false });
  }

  function editItem(todo: ITodo): void {
    setBody(todo);
  }

  function toggleComplete(todo: ITodo): void {
    updateItem(todo);
  }

  useEffect(() => {
    getItems();
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div className="row my-5">
          <div className="col-12">
            <h1>TODO App</h1>
          </div>
        </div>
        <div className="row my-5">
          <div className="col-12">
            <form id="form" onSubmit={(e) => onSubmit(e)}>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Todo"
                  name="title"
                  value={body.title}
                  required
                  onChange={(e) => setBody({ ...body, title: (e.target as any).value })}
                />
                <button className="btn btn-outline-success" type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="row my-5">
          <div className="col-12">
            <h4 className="text-center" hidden={todos.length !== 0}>
              No todo(s) found...
            </h4>

            <table className="table table-dark table-hover" hidden={todos.length === 0}>
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Title</th>
                  <th scope="col">Completed</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {todos.map((todo: ITodo, i: number) => {
                  return [
                    <tr key="{todo}">
                      <th scope="row">{i + 1}</th>
                      <td>{todo.title}</td>
                      <td onClick={(e) => toggleComplete({ ...todo, completed: !todo.completed })}>{!todo.completed ? 'no' : 'yes'}</td>
                      <td>
                        <button type="button" className="btn btn-sm btn-primary me-1" onClick={(e) => editItem(todo)}>
                          edit
                        </button>
                        <button type="button" className="btn btn-sm btn-danger ms-1" onClick={(e) => removeItem(todo._id)}>
                          delete
                        </button>
                      </td>
                    </tr>,
                  ];
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
