import React, {Component} from 'react';
import Student from './student';
import './main.css';

class Studentslist extends Component {
    constructor(props){
        super(props);
        this.state = {
            data : [],
            newData : []
        }
    }
    componentDidMount() {
        fetch("http://localhost:4000/data")
            .then(res => {
                return res.json();
            })
            .then(result => {
                console.log(result);
                this.setState({
                    data: result,
                    newData : result
                });
            })
            .catch(err => {
                console.log(err);
            });
    }

    handleClick = (option)=>{
        let filteredData = this.state.data.filter(item=>{
            return item.branchName === option;
        })
        this.setState({
            data : filteredData
        })
    };
    handleChange = (e)=>{
        // console.log(e.target.value);
        if(e.target.value.length>3){
            console.log(e.target.value);
            this.search(e.target.value);
        }
        else{
            this.setState({
                data : this.state.newData,
            })
        }

    };
    search = (text)=>{
        let newData= [];
        newData=this.state.data.filter(item=>{
            console.log(item.username+"herer"+text);
            return item.username.startsWith(text);
        });
        this.setState({
            data: newData
        })
    };

    render() {
        return (
            <div style={{"text-align":"center"}}>
                <h2>Student Data</h2>
                <h5>Filter data on the basis of branch name</h5>
                <button onClick={()=>{this.handleClick("CSE")}}>CSE</button>
                <button onClick={()=>{this.handleClick("ECE")}}>ECE</button>
                <button onClick={()=>{this.handleClick("EEE")}}>EEE</button>
                <h5>Search Data</h5>
                <input onChange={this.handleChange} name={"search"} type={"text"} />
                <table>
                    <tr>
                        <th>Name</th>
                        <th>BranchName</th>
                        <th>User name</th>
                        <th>Email</th>
                        <th>Password</th>
                    </tr>
                    {this.state.data.map(item => {
                        return <Student key={item.email} data={item} />;
                    })}
                </table>
            </div>
        );
    }
}

export default Studentslist;