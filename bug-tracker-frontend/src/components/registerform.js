import React  from 'react'
import {Form, Button, Alert} from 'react-bootstrap'
import {Router} from 'react-router'
import Axios from 'axios'

export class RegisterForm extends React.Component
{
    constructor()
    {
        super()
        this.state=
        {
            message: null,
            bugs:[]
        }
        
    }
    componentDidMount()
    {
        Axios.get("http://localhost:8080/bugs", (response)=>
        {
            
        })
    }
    handleSubmit(e)
    {
        e.preventDefault()
        
        Axios.get("http://localhost:8080/login/new", (response)=>
        {
            this.setState(this.state.message, response.data.message)
        })

    }
    render()
    {
        return (
            <div class="user-form">
                <Form>
                    <h1>Register Form</h1>
                    Username:
                    <Form.Control type="text"></Form.Control>
                    Password:
                    <Form.Control type="password"></Form.Control>
                    <Button type="submit" onSubmit={this.handleSubmit()}>Register</Button>
                </Form>
            </div>

        )
    }
}