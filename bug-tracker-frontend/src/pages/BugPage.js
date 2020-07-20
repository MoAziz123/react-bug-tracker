import React  from 'react'
import {Table} from '../components/table'

export class BugPage extends React.Component
{
    render()
    {
        if(!localStorage.getItem("token")){
            return <p>You are not authenticated</p>
        }
        else
        {
            return (
                <div className="bug-page">
                    
                    <Table></Table>
                </div>
            )
        }
       
    }
}