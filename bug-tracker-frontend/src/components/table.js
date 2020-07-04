import React  from 'react'
import  {Alert, Button} from 'react-bootstrap'
import Axios from 'axios'
import { SearchBar } from './search-bar'
import {EditForm} from './editform'
import {DeleteForm} from  './deleteform'

export class Table extends React.Component
{
    constructor()
    {
        super()
        this.state = 
        {
            bugs:[],
            search:[],
            message:null,
            success: null,
            value:null
        }
    }
    componentWillMount()
    {
        Axios.get("http://localhost:8080/bugs")
        .then((response)=>
        {
            this.setState(
                {
                    message: response.data.message,
                    bugs:  response.data.bugs
                }
            )
         
            
        })
        .catch((error)=>
        {
            console.log("ERROR")

        })
      
    }
    checkMessage(success)
    {
        if(success)
        {
            return 
        }
        
    }
    
   
    
    convertResolved(item)
    {
        if(item) return "Yes"
        else return "No"

    }
    convertDate(date)
    {
        return new Date(date).toLocaleDateString()
 

    }
    handleQuery = (e) => 
    {
        var query = e.target.value
        console.log(query.length)
        if(query != null)
        {
            Axios.get("http://localhost:8080/bugs")
            .then((response) =>
            {
                var array = response.data.bugs.filter((item) =>
                {
                    if(item.title.startsWith(query))
                    {                    
                        return item
                    }
                })
                this.setState({bugs:array})

            })
            .catch((error) =>console.error(error))
        }
        else
        {
            Axios.get("http://localhost:8080/bugs")
            .then((response) =>
            {
                this.setState({bugs:response.data.bugs})
            })
            .catch((error)  => console.error(error))
        }
       
        

    }
    render()
    {
        let  {bugs} = this.state
        if(bugs.bugs.length == 0)
        {
            return(
            <Alert type="error">No bugs found</Alert>
            )
        }
        return (
            <div className="table">
                <Alert variant="success">{this.state.message || ""}</Alert>
                <div className="search-bar">
                <label>Search:</label>
                <input type="text" autocomplete="on" onChange={(e) => this.handleQuery(e)}></input>
                </div>
                <table>
                    <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Resolved</th>
                    <th>Log Date</th>
                    </tr>
                    {this.state.bugs.map((item)=>{
                    if(!item.resolved)
                    return(
                        <tr>
                            <td>{item.title}</td>
                            <td>{item.description}</td>
                            <td>{this.convertResolved(item.resolved)}</td>
                            <td>{this.convertDate(item.log_date)}</td>
                            <td><DeleteForm show={false} dataset={item}></DeleteForm></td>
                            <td><EditForm show={false} dataset={item}></EditForm></td>
                        </tr>
                        )
                    
                 })}
                </table>
        
       
        </div>)
    }
}