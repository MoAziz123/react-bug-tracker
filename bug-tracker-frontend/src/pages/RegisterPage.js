import React  from 'react'
import {RegisterForm}  from  '../components/registerform'
export class RegisterPage extends React.Component
{
    
  
    render()
    {
        return (
            <div className="login-page">
                <RegisterForm></RegisterForm>
            </div>
        )
    }
}