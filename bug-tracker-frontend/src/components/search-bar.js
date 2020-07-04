import React  from 'react'
import {Form, Button, Alert, Modal} from 'react-bootstrap'
import Axios from 'axios'
import  Select from  'react-select'

export class SearchBar extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state=
        {
            message: null,
            bugs:this.props.dataset,
            options: [{value:"hello", label:"hello"}],
            value: null
        }
    }
    

    handleClick = (e) => 
    {
        var query = this.state.value
        Axios.get("http://localhost:8080/bugs", {title:this.state.value})
        .then((response) =>
        {
            this.setState({bugs:response.data.bugs})
            this.state.bugs.filter((item) =>
            {
                if(item.title.startsWith(query))
                {
                    console.log(item)
                }
                return item
            })
            
        })
    }
    render()
    {
        return(
            <div className="search-bar">
                <label>Search:</label>
                <input type="text" autocomplete="on" onChange={(e) => this.setState({value:e.target.value})}></input>
                <Button type="submit" onClick={(e)=>this.handleClick(e)}>Search</Button>
            </div>
        )

    }
}
