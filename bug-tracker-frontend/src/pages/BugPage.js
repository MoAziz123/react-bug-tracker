import React  from 'react'
import {Navigation} from '../components/nav-bar'
import {AuthNavigation} from '../components/auth-nav-bar'
import {Table} from '../components/table'
import {Button} from 'react-bootstrap'
import {AddForm} from '../components/addform'
import{SearchBar} from '../components/search-bar'
import Axios from 'axios'

export class BugPage extends React.Component
{

    
    
    render()
    {
        if(!localStorage.getItem("token"))
        {
            return <p>You are not authenticated</p>
        }
        else
        {
            return (
                <div className="bug-page">
                    <h1>This is the BugPage</h1>
                    <Table></Table>
                    <div class="bug-page-buttons">
                    <AddForm show={false}></AddForm>
                    </div>
                </div>
            )
        }
       
    }
}