import React  from 'react'
import {Form, Button, Alert} from 'react-bootstrap'
import {Router} from 'react-router'
import Axios from 'axios'

export class LogInForm extends React.Component
{
    constructor()
    {
        super()
        this.state=
        {
            message: null
        }
        
    }
    componentDidMount()
    {
        Axios.get("/bugs", (response)=>
        {
            this.setState(this.state.bugs, response.data)
            
        })
    }
    handleSubmit(e)
    {
        e.preventDefault()
        Axios.post("http://localhost:8080/login/submit")
        .then((response)=>
        {
            this.setState(this.state.message, response.data.message)
        })

    }
    render()
    {
        return (
            <div class="user-form">
                <Form>
                    <h1>Log In Form</h1>
                    Email:
                    <Form.Control type="text"></Form.Control>
                    Password:
                    <Form.Control type="password"></Form.Control>
                    <Button type="submit" onSubmit='handleSubmit'>Log In</Button>
                </Form>
            </div>

        )
    }
}