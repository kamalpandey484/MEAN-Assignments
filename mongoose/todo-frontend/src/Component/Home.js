import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import '../App.css'

class Home extends Component{
    constructor(){
        super();
        this.state = {
            todo : [],
        };
    }

    componentDidMount() {
        axios.get("http://localhost:3001/")
            .then(response=>{
                this.setState({
                    todo: response.data
                });
                console.log(response.data)
            })
    }

    handleDelete=(id)=>{
        let tempTodos=this.state.todo;
        let filteredTodos= tempTodos.filter(item=>item._id!==id);
        axios.delete("http://localhost:3001/"+id)
            .then(console.log('Successfully deleted!'))
            .then(
                this.setState(
                    {
                        todo:filteredTodos
                    }
                    )
            )
    };

    render() {
        console.log(this.state.todo);
        return(
            <div className="col-6 mx-auto col-md-6 mt-4 text-center">
               <p>Home Component!</p>
                <ul className="list-group my-3">
                    {this.state.todo.map((item)=> {
                       return(
                           <li className="list-group-item text-capitalize d-flex justify-content-between my-2"
                               key={item._id}>
                            <h5>{item.name}</h5>
                            <div className="todo-icon">
                                <span className="mx-2 text-danger cursor-pointer" onClick={()=>this.handleDelete(item._id)}>
                                    <i className="fa fa-trash" ></i>
                                </span>
                            </div>
                        </li>)
                    })}
                 </ul>
            </div>
        );
    }
}
export default Home