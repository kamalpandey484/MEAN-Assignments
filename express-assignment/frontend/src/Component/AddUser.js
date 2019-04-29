import axios from 'axios';
import React, { Component } from 'react';
import '../App.css';
import uuid from 'uuid';


class AddUser extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            contact: '',
            users: []
        };

        this.apiUrl = 'http://localhost:3001/';

        this.addTodo = this.addTodo.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name] : event.target.value
        });
    }

    async addTodo(e) {
        e.preventDefault();
        const response = await axios.post(`${this.apiUrl}`, {
            id: uuid(),
            name: this.state.name,
            email: this.state.email,
            contact: this.state.contact
        });
        console.log(response);
        const users = this.state.users;
        users.push(response.data);

        this.props.history.push('/')

    }
    render() {
        return (
            <div className="App col-6 col-md-6 mx-auto">
                <header className="App-header">
                    <h1 className="App-title text-center mt-3">Add User</h1>
                </header>
                <div className="container">
                    <form onSubmit={this.addTodo}>
                        <input
                            type="text"
                            name="name"
                            className="my-4 form-control"
                            placeholder="Add Name"
                            onChange={this.handleChange}
                            value={this.state.name}
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            className="my-4 form-control"
                            placeholder="Add Email"
                            onChange={this.handleChange}
                            value={this.state.email}
                            required
                        />
                        <input
                            type="text"
                            name="contact"
                            className="my-4 form-control"
                            placeholder="Add Contact Number"
                            onChange={this.handleChange}
                            value={this.state.contact}
                            required
                        />

                        <button className="btn-success mb-3 form-control">
                            Add todo
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

export default AddUser;