import React  from 'react'
import {Container, Button} from 'react-bootstrap'

export class StartPage extends React.Component
{
    render()
    {
        return (
            <div className="start-page">
                <Container>
                    <h1>Welcome to this React app</h1>
                    <p>This is a sample bug application using the MERN Stack</p>
                    <p>This appplication connects to an API backend written in Node/Express</p>
                    <Button type="button" onClick={()=>window.location.assign("http://localhost:3000/login")}>Click me!</Button>
                </Container>
             
            </div>
        )
    }
}