import React  from 'react'
import {Form, Button, Alert} from 'react-bootstrap'
import {Redirect} from 'react-router'
import Axios from 'axios'
import crypto from'crypto-js'
import 'jsonwebtoken'

export class LogInForm extends React.Component
{
    constructor()
    {
        super()
        this.state=
        {
            email:null,
            password:null,
            authenticated:false,
            message:null
        }
        
    }
    /**handleSubmit()
     * @args - event
     * @description -sends email and pass to be authenticated by server via
     * JWT
     * @since 1.1.0
    */    
    handleSubmit(e)
    {
        e.preventDefault()
        let password = crypto.MD5(this.state.password).toString()
        console.log(this.state.email,this.state.password)
        Axios.post("http://localhost:8080/login/submit",
        {
            email:this.state.email,
            password:password
            
        })
        .then((response)=>
        {
            this.setState({message: response.data.message})
            if(response.data.token){
                localStorage.setItem("token", response.data.token)
                localStorage.setItem("user_id",crypto.MD5("SALTYSALT" +response.data.user.address + response.data.user.username).toString())
                window.location.assign("http://localhost:3000/login")
            }
        })
    }
    render()
    {
        if(localStorage.getItem("token")){
            return(<Redirect to="/bugs"></Redirect>)
        }
        return (
            <div class="user-form">
                <Alert type="success">{this.state.message}</Alert>
                <Form>
                    <h1>Log In Form</h1>
                    Email:
                    <Form.Control type="text" onChange={(e)=>this.setState({email:e.target.value})}></Form.Control>
                    Password:
                    <Form.Control type="password"onChange={(e)=>this.setState({password:e.target.value})}></Form.Control>
                    <Button type="button" onClick={(e)=>this.handleSubmit(e)}>Log In</Button>
                </Form>
            </div>

        )
    }
}