import React  from 'react'
import  {Alert} from 'react-bootstrap'
import Axios from 'axios'
import {AddForm} from  './addform'
import {EditForm} from './editform'
import {DeleteForm} from  './deleteform'

export class Table extends React.Component
{
    constructor(){
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
    /**
     * componentWillMount()
     * @args - none
     * @description - loads table data by sending a GET request to /bugs
     * @since 1.0.0
     */
     componentWillMount = async() =>{
        let id=localStorage.getItem("user_id")
        await Axios.get('http://localhost:8080/bugs/'+id,{
            headers:{
            'x-access-token':localStorage.getItem("token")
        }})
        .then((response)=>{   
            this.setState(
                {
                    message: response.data.message,
                    bugs:  response.data.bugs,
                    user_id:id
                }
            )  
        })
        .catch((error)=>{console.log("ERROR")})
    }
    /**
     * checkMessage()
     * @args - none
     * @description - checks if message was succesful
     * @since 1.0.0
     */
    checkMessage(success){
        if(success)
            return 
    }
     /**
     * convertResolved()
     * @args - value
     * @description - converts a mongoDB bool into a string readable by input type - radio
     * @since 1.0.0
     */
    convertResolved=item=>{
        if(item) return "Yes"
        else return "No"
    }
   /**
     * convertDate()
     * @args - date
     * @description - converts a mongoDB date into a readable format
     * @since 1.0.0
     */
    convertDate = date=>{
        return new Date(date).toLocaleDateString()
    }
    /**
     * handleQuery()
     * @args - event
     * @description - gets the bugs data of user, and then filters through it and selects the values that contain the query
     *  @since 1.0.0
     */
    handleQuery = async (e) => 
    {
        var query = e.target.value
        if(query != null){
            await Axios.get("http://localhost:8080/bugs/"+this.state.user_id,{
                headers:{
                'x-access-token':localStorage.getItem("token")
                }
            })
            .then((response) =>{
                var array = response.data.bugs.filter((item) =>{
                    if(item.title.startsWith(query)){                    
                        return item
                    }
                })
                this.setState({bugs:array})
            })
            .catch((error) =>console.error(error))
        }
        else{
            await Axios.post("http://localhost:8080/bugs",{
                headers:{
                'x-access-token':localStorage.getItem("token")
                },
                user_id:this.state.user_id
            })
            .then((response) =>{
                this.setState({message:response.data.bugs})
            })
            .catch((error)  => console.error(error))
        }
    }
    render()
    {
        if(this.state.bugs.length === 0){
            return(
            <div className="table-error">
            <Alert type="error">No bugs found</Alert>
            <div className="search-bar">
                <label>Search:</label>
                <input type="text" autocomplete="on" onChange={(e) => this.handleQuery(e)}></input>
                </div>
            <AddForm show={false}></AddForm>
            </div>
            )
        }

        return (
            <div className="table">
                <h1>Your Bugs</h1>
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
                <div class="bug-page-buttons">
                    <AddForm show={false}></AddForm>
                    </div>
        </div>)
    }
}