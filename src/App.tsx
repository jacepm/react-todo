import React, { useEffect, useState } from 'react';
import './App.css';
import { create, get, remove } from './services';

interface ITodo {
  title: string;
  completed: boolean;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

function App() {
  const [todos, setTodos] = useState([]);

  async function getItems(): Promise<void> {
    const res = await get(`todos`);
    return setTodos(res.data.data);
  }

  async function createItem(body: any): Promise<void> {
    await create(`todos`, body);
    return getItems();
  }

  async function removeItem(id: string): Promise<void> {
    await remove(`todos/${id}`);
    return getItems();
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
            <form>
              <div className="input-group">
                <input type="text" className="form-control" placeholder="Todo" name="title" required />
                <button className="btn btn-outline-success" type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="row my-5">
          <div className="col-12">
            <table className="table table-dark table-hover">
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
                      <td>{!todo.completed ? 'no' : 'yes'}</td>
                      <td>
                        <button type="button" className="btn btn-sm btn-success mx-2">
                          edit
                        </button>
                        <button type="button" className="btn btn-sm btn-danger mx-2" onClick={(e) => removeItem(todo._id)}>
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
