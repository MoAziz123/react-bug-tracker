import React  from 'react'
import {Navbar, Nav} from 'react-bootstrap'
import {Redirect} from  'react-router'

export class AuthNavigation extends React.Component
{
    constructor()
    {
        super()
        this.state=
        {
            redirect:null
        }
    }
    handleLogOut()
    {
        localStorage.removeItem("token")
        this.setState({redirect:"/login"})

    }
    render()
    {
        return (<Navbar bg="dark" className="navbar">
            <Navbar.Brand>react-bug-tracker</Navbar.Brand>
            <div className="links">
            <Nav.Link className="link" href="http://localhost:3000/bugs">Bugs</Nav.Link> 
            <Nav.Link onClick={()=>{this.handleLogOut()}}>Log Out</Nav.Link>
            <Redirect to={this.state.redirect}></Redirect>
            </div>
            </Navbar>)
            
            
    }
}
