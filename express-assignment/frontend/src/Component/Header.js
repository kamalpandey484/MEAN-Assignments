import React, { Component } from "react";
import {Route, Link, BrowserRouter as Router} from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav } from "react-bootstrap";
import Home from "./Home";
import Users from "./AddUser";
import About from "./About";

import {createBrowserHistory} from "history";
const history = createBrowserHistory();

class Header extends Component {
    render() {
        return (
               <Router history={history}>
                <Navbar bg="light" variant="light" className="justify-content-between">
                    <Navbar.Brand>
                        <Link to="/">Home</Link>
                    </Navbar.Brand>
                    <Nav>
                        <Link to="/adduser" className={"mr-4"}>
                            AddUser
                        </Link>
                        <Link to="/about" className={"mr-4"}>
                            About
                        </Link>
                    </Nav>
                </Navbar>

                   <Route exact path="/" component={Home} />
                   <Route path="/adduser" component={Users} />
                   <Route path="/about" component={About} />
               </Router>
        );
    }
}
export default Header;
