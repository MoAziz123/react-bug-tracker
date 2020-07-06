import React  from 'react'
import {Form, Button, Alert} from 'react-bootstrap'
import {Router,Redirect} from 'react-router'
import Axios from 'axios'
import crypto from  'crypto-js'
export class RegisterForm extends React.Component
{
    constructor()
    {
        super()
        this.state=
        {
            redirect:null,
            message: null,
            bugs:[],
            user:
            {
                username:null,
                password:null,
                email:null,
                address:null
                
            },
            validate:
            {
                username:null,
                password:null,
                email:null,
                address:null
            }

        }
        
    }
    
    
   
    handleSubmit(e)
    {
        e.preventDefault()
        let password = crypto.MD5(this.state.user.password).toString()
        Axios.post("http://localhost:8080/login/new",
        {
            username: this.state.user.username,
            password:password,
            email:this.state.user.email,
            address:this.state.user.address

        })
        .then((response)=>
        {
            this.setState({message:response.data.message})
            if(response.data.success)
            {
                this.setState({redirect:"../pages/LogInPage.js"})
            }
            
        })
      

    }
    render()
    {
      
        if(this.state.redirect)
        {
            return (<Redirect to={this.state.redirect}></Redirect>)
        }
        return (
            <div className="user-form">
                <Form>
                    <h1>Register Form</h1>
                    Username:
                    <Form.Control type="text" onChange={(e) => this.setState({user:{name:e.target.value}})}></Form.Control>
                    <p>{this.state.validate.username}</p>
                    Email:
                    <Form.Control type="email" onChange={(e)=>this.setState({user:{email:e.target.value}})}></Form.Control>
                    <p>{this.state.validate.email}</p>
                    Password:
                    <Form.Control type="password"  onChange={(e) => this.setState({user:{password:e.target.value}})}></Form.Control>
                    <p>{this.state.validate.password}</p>
                    Address:
                    <Form.Control type="text"  onChange={(e) => this.setState({user:{address:e.target.value}})}></Form.Control>
                    <p>{this.state.validate.address}</p>
                    <Button type="button" onClick={(e)=>this.handleSubmit(e)}>Register</Button>
                </Form>
            </div>

        )
    }
}