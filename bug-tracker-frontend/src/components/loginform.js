import React  from 'react'
import {Form, Button, Alert} from 'react-bootstrap'
import {Redirect} from 'react-router'
import Axios from 'axios'
import crypto from'crypto-js'

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
        if(this.state.email !=null && this.state.password != null){
            e.preventDefault()
            let password = crypto.MD5(this.state.password).toString()
            Axios.post("http://localhost:8080/login/submit",{
                headers:
                {
                    'x-access-token':localStorage.getItem("token")
                },
                email:this.state.email,
                password:password
                
            })
            .then((response)=>{
                this.setState({message: response.data.message})
                if(response.data.token){
                    localStorage.setItem("token", response.data.token)
                    localStorage.setItem("user_id",crypto.MD5("SALTYSALT" +response.data.user.address + response.data.user.username).toString())
                    window.location.assign("http://localhost:3000/bugs")
                  
                }
            })
            .catch(error=>console.error(error))
        }
        else
        {
            this.setState({message:"Please fill in the fields below."})
        }
    }
    render()
    {
        if(localStorage.getItem("token")){
            return(<Redirect to="/bugs"></Redirect>)
        }
        return (
            <div className="user-form auth-form">
                <Alert type="success">{this.state.message}</Alert>
                <Form>
                    <h1 className="logo" title="track">bug</h1>
                    <h4 className="tagline">Login</h4>
                    Email:
                    <Form.Control type="text" onChange={(e)=>this.setState({email:e.target.value})}></Form.Control>
                    Password:
                    <Form.Control type="password"onChange={(e)=>this.setState({password:e.target.value})}></Form.Control>
                    <Button type="button" onClick={(e)=>this.handleSubmit(e)}>Log In</Button>
                    <text>or</text>
                    <Button type="button" onClick={(e)=>window.location.assign("http://localhost:3000/register")}>Register</Button>
                </Form>
            </div>

        )
    }
}