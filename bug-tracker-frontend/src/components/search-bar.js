import React  from 'react'
import {Button} from 'react-bootstrap'
import Axios from 'axios'

export class SearchBar extends React.Component
{
    constructor(props){
        super(props)
        this.state=
        {
            message: null,
            bugs:this.props.dataset,
            value: null
        }
    }
    

    handleClick = (e) => {
        var query = this.state.value
        Axios.get("http://localhost:8080/bugs", {title:this.state.value})
        .then((response)=>{
            if(!response.data.auth){
                localStorage.removeItem("token")
                window.location.assign("http://localhost:3000/login")
            }
            this.setState({bugs:response.data.bugs})
            this.state.bugs.filter((item) =>{
                if(item.title.startsWith(query))
                    console.log(item)
                return item
            })   
        })
    }
    render()
    {
        return(
            <div className="search-bar">
                <label>Search:</label>
                <input type="text" autoComplete="on" onChange={(e) => this.setState({value:e.target.value})}/>
                <Button type="submit" onClick={(e)=>this.handleClick(e)}>Search</Button>
            </div>
        )

    }
}
