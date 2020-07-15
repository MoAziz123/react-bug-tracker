import React  from 'react'
import {Form, Button, Alert} from 'react-bootstrap'
import {Router,Redirect} from 'react-router'
import Axios from 'axios'
import crypto from  'crypto-js'
export class RegisterForm extends React.Component
{
    constructor(){
        super()
        this.state=
        {
            redirect:null,
            message: null,
            bugs:[],
            user:{
                username:null,
                password:null,
                email:null,
                address:null  
            },
            validate:{
                username:null,
                password:null,
                email:null,
                address:null
            },
        }   
    }
    /**
     * checkValidate()
     * @args - none
     * @description - validates the fields by checking for null in each validation message
     * @since 1.0.0
     */
    checkValidate = ()=>{
        if(this.state.validate.email === null && this.state.validate.password === null && this.state.validate.username === null)
            return true
    }
    /**
     * handleSubmit()
     * @args - event
     * @description - triggered on form submit, it checks for validated fields, and then sends all the fields' values to create a new account
     * if successful, it will create an account in the backend and redirect to login
     * @since 1.0.0
     *  
     */
    handleSubmit=(e)=>{
        e.preventDefault()
        if(this.checkValidate()){
            let password = crypto.MD5(this.state.user.password).toString()
            Axios.post("http://localhost:8080/login/new",{
                username: this.state.user.username,
                password:password,
                email:this.state.user.email,
                address:this.state.user.address
            })
            .then((response)=>{
                this.setState({message:response.data.message})
                if(response.data.auth)
                window.location.assign("http://localhost:3000/login") 
            })
        }
        else
            this.setState({message:"Please ensure your details are     correct"})
    }

    /**
     * update<field>()
     * @args - event
     * @description - these functions update all the fields with their current values - to ensure that integrity is maintained when sent to backend - also performs validation vai regex
     * @since 1.0.0.
     */
    updateUsername=(e)=>{
        if(e.target.value.match(/[A-z]+/) && e.target.value.length < 50)
        this.setState(
            {
                user:
                {
                    username:e.target.value,
                    password:this.state.user.password,
                    email:this.state.user.email,
                    address:this.state.user.address
                },
                validate:
                {
                    username:null,
                    password:this.state.validate.password,
                    email:this.state.validate.email,
                    address:this.state.validate.address
                } 
            }
        )
        else{
            this.setState({
                user:
                {
                    username:e.target.value,
                    password:this.state.user.password,
                    email:this.state.user.email,
                    address:this.state.user.address
                },
                validate:
                {
                    username:"Please ensure that the name is less than 50 characters",
                    password:this.state.validate.password,
                    email:this.state.validate.email,
                    address:this.state.validate.address
                }
            })
        }

    }
    updatePassword(e)
    {
        if(e.target.value.match(/([!"£$%^&#*(){}@~:><<\.]+)([A-z]+)([0-9]+)/) && e.target.value.length > 12)
        this.setState(
            {
                user:
                {
                   
                    username:this.state.user.username,
                    password:e.target.value,
                    email:this.state.user.email,
                    address:this.state.user.address
                },
                validate:
                {
                    username:this.state.validate.username,
                    password:null,
                    email:this.state.validate.email,
                    address:this.state.validate.address
                }
            }
        )
        else
        {
            this.setState({
                user:
                {
                   
                    username:this.state.user.username,
                    password:e.target.value,
                    email:this.state.user.email,
                    address:this.state.user.address
                },
                validate:
                {
                    username:this.state.validate.username,
                    password:"Please ensure that your password contains the following: - 1 special character \n - 1 capital letter \n - 1 number \n - greater than 12 characters in length ",
                    email:this.state.validate.email,
                    address:this.state.validate.address
                }
            })
        }

    }
    updateEmail(e)
    {
        if(e.target.value.match(/^([A-z0-9]+)@([A-z0-9]+)\.([A-z0-9\.]+)$/))
        this.setState(
            {
                user:
                {
                   
                    username:this.state.user.username,
                    password:this.state.user.password,
                    email:e.target.value,
                    address:this.state.user.address
                },
                validate:
                {
                    username:this.state.validate.username,
                    password:this.state.user.password,
                    email:null,
                    address:this.state.validate.address
                }
            }
        )
        else
        {
            this.setState({
                user:
                {
                   
                    username:this.state.user.username,
                    password:this.state.user.password,
                    email:e.target.value,
                    address:this.state.user.address
                },
                validate:
                {
                    username:this.state.validate.username,
                    password:this.state.user.password,
                    email:"Please ensure your email is valid - containing an @ and a mail server domain",
                    address:this.state.validate.address
                }
            })
        }
    }
    updateAddress(e)
    {
        if(e.target.value)
        this.setState(
            {
                user:
                {
                    username:this.state.user.username,
                    password:this.state.user.password,
                    email:this.state.user.email,
                   address:e.target.value

                }
            }
        )

    }
    render()
    {
      
        if(this.state.redirect)
        {
            return (<Redirect to={this.state.redirect}></Redirect>)
        }
        return (
            <div className="user-form">
                <Alert>{this.state.message}</Alert>
                <Form>
                    <h1>Register Form</h1>
                    Name:
                    <Form.Control type="text" onChange={(e) => this.updateUsername(e)}></Form.Control>
                    <p>{this.state.validate.username}</p>
                    Email:
                    <Form.Control type="email" onChange={(e)=>this.updateEmail(e)}></Form.Control>
                    <p>{this.state.validate.email}</p>
                    Password:
                    <Form.Control type="password"  onChange={(e) => this.updatePassword(e)}></Form.Control>
                    <p>{this.state.validate.password}</p>
                    Address:
                    <Form.Control type="text"  onChange={(e) => this.updateAddress(e)}></Form.Control>
                    <p>{this.state.validate.address}</p>
                    <Button type="button" onClick={(e)=>this.handleSubmit(e)}>Register</Button>
                </Form>
            </div>

        )
    }
}