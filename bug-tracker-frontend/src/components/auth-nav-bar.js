import React  from 'react'
import {Navbar, Nav} from 'react-bootstrap'
import {Redirect} from  'react-router'

export class AuthNavigation extends React.Component
{
    constructor()
    {
        super()
        this.state={redirect:null}
    }
    /**
     * handleLogOut()
     * @args - none
     * @description - logs out the user by deleting the token from localstorage
     * @since 1.0.0
     */
    handleLogOut =()=>{
        localStorage.removeItem("token")
        window.location.assign("http://localhost:3000/login")

    }
    render()
    {
        return (<Navbar bg="dark" className="navbar">
            <Navbar.Brand>react-bug-tracker</Navbar.Brand>
            <div className="links">
            <Nav.Link className="link" onClick={()=>{this.setState({redirect:"/bugs"})}}>Bugs</Nav.Link> 
            <Nav.Link className="link"onClick={()=>{this.handleLogOut()}}>Log Out</Nav.Link>
            <Redirect to={this.state.redirect}></Redirect>
            </div>
            </Navbar>)
            
            
    }
}
