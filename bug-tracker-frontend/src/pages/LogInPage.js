import React  from 'react'
import {LogInForm}  from  '../components/loginform'
export class LogInPage extends React.Component
{
    render()
    {
        return (
            <div className="login-page">
                <LogInForm></LogInForm>
            </div>
        )
    }
}