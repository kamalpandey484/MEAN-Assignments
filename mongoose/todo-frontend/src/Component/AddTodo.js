import axios from 'axios';
import React, { Component } from 'react';
import '../App.css';
import uuid from 'uuid';
// import { browserHistory } from 'react-router';


class AddTodo extends Component {
    constructor() {
        super();
        this.state = {
            newTodo: '',
            users: []
        };

        // this.apiUrl = 'https://5cc0347182ec6a00149f3971.mockapi.io/users';
        this.apiUrl = 'http://localhost:3001/';

        this.addTodo = this.addTodo.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            newTodo: event.target.value
        });
    }

    async addTodo(e) {
        e.preventDefault();
        const response = await axios.post(`${this.apiUrl}`, {
            id: uuid(),
            name: this.state.newTodo
        });
        console.log(response);
        const users = this.state.users;
        users.push(response.data);
        this.props.history.push('/')
    }
    render() {
        return (
            <div className="App `col-6 mx-auto col-md-6`">
                <header className="App-header">
                    <h1 className="App-title text-center mt-3">Add Todo</h1>
                </header>
                <div className="container">
                    <form onSubmit={this.addTodo}>
                        <input
                                id="todoInput"
                                type="text"
                                name="todo"
                                className="my-4 form-control"
                                placeholder="Add a new todo"
                                onChange={this.handleChange}
                                value={this.state.newTodo}
                                required
                            />
                            <button
                                className="btn-success mb-3 form-control"
                            >Add todo
                            </button>
                    </form>
                </div>
            </div>
        );
    }
}

export default AddTodo;