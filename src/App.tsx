import { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import './App.css';
import { get } from './services';

interface ITodo {
  title: string;
  completed: boolean;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    get(`todos`).then((res: AxiosResponse<any>) => setTodos(res.data.data));
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
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Todo" />
              <button className="btn btn-outline-success" type="button">
                Submit
              </button>
            </div>
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
                      <td></td>
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
