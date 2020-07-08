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
            user:
            {
                email:null,
                password:null,
            },
            authenticated:false,
            message:null
        }
        
    }
    componentWillMount()
    {
        if(localStorage.getItem("token"))
        {
            let token = localStorage.getItem("token")
            
            this.setState({authenticated:true})

        }
    }
    
    //sends email and pass to be authenticated by server via JWT
    handleSubmit(e)
    {
        e.preventDefault()
        let password = crypto.MD5(this.state.password).toString()
        Axios.post("http://localhost:8080/login/submit",
        {
            username:this.state.user,
            password:password
            
        })
        .then((response)=>
        {
            this.setState({message: response.data.message})
            if(response.data.token)
            {
                localStorage.setItem("token", response.data.token)
            }
            localStorage.setItem("user_id",()=>
            {
                let hash_string = "SALTYSALT" +response.data.user.address + response.data.user.username
                return crypto.MD5(hash_string).toString()
                

            })
        })
    }
    render()
    {
        if(this.state.authenticated)
        {
            return(<Redirect to="/bugs"></Redirect>)
        }
        return (
            <div class="user-form">
                <Alert type="success">{this.state.message}</Alert>
                <Form>
                    <h1>Log In Form</h1>
                    Email:
                    <Form.Control type="email" onChange={(e)=> this.setState({user:{email:e.target.value}})}></Form.Control>
                    Password:
                    <Form.Control type="password"onChange={(e)=>this.setState({user:{password:e.target.value}})}></Form.Control>
                    <Button type="button" onClick={(e)=>this.handleSubmit(e)}>Log In</Button>
                </Form>
            </div>

        )
    }
}