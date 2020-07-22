import React, { Component } from 'react';
import {Nav, Navbar, Form, FormControl, Button} from 'react-bootstrap'
import {ButtonContainer} from "./Button"; 
import {Link} from 'react-router-dom';
import logo from '../logo.svg';
import '../App.css'
class Menu extends Component{
    render(){
        return <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home"><img src={logo} alt="store"/></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>    
             
          </Nav>
          <Nav className="mr-sm-2">
          <Link to="/cart">
            <ButtonContainer>
                <span>
                    <i className="fa fa-cart-plus"/> My Cart
                </span>
            </ButtonContainer>
        </Link>  
          </Nav>
  
        </Navbar.Collapse>
      </Navbar>
    }
}
export default Menu