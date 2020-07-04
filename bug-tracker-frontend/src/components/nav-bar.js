import React  from 'react'
import {Navbar, Nav} from 'react-bootstrap'

export class Navigation extends React.Component
{
    render()
    {
        return (<Navbar bg="dark" className="navbar">
            <Navbar.Brand>react-bug-tracker</Navbar.Brand>
            <div className="links">
            <Nav.Link className="link" href="http://localhost:3000/login">Log In</Nav.Link> 
            <Nav.Link href="http://localhost:3000/register">Register</Nav.Link>
            </div>
            </Navbar>)
            
            
    }
}
