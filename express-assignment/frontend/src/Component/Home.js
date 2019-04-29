import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import '../App.css'

class Home extends Component{
    constructor(){
        super();
        this.state = {
            users : []
        };
    axios.get("http://localhost:3001/")
        .then(response=>{
            console.log(response.data , "~~~~~~ .get method")
            this.setState({
                users: response.data
            });
            console.log(response.data)
        })
    }

    handleDelete=(id)=>{
        console.log(id , " <<<< id to delete")
        axios.delete("http://localhost:3001/"+id)
            .then(response=>{
                this.setState({
                    users : response.data
                })
            })
    };

    render() {
        return(
            <div className="col-6 mx-auto col-md-6 mt-4 text-center">
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Contact Number</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.state.users.map((item)=> {
                            return(
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.contact}</td>
                                    <td><span className="mx-2 text-danger cursor-pointer" onClick={()=>this.handleDelete(item.id)}>
                                <i className="fa fa-trash" ></i></span>
                                    </td>
                                </tr>
                                )
                        })}

                    </tbody>
                </table>
            </div>
        );
    }
}
export default Home