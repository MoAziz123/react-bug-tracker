/** React */
import React from 'react'

/** React Bootstrap */
import  { Alert, Button } from 'react-bootstrap'

/**Components */
import { EditForm } from './editform'
import { DeleteForm } from  './deleteform'

/** Modules */
import Axios from 'axios'
import crypto from 'crypto-js'

export class Table extends React.Component {
    constructor() {
        super()
        this.state = {
            bugs: [],
            search: [],
            message: null,
            success: null,
            value: null
        }
    }

    componentWillMount() {
        let user_id = localStorage.getItem("user_id")

        Axios.get("http://localhost:8080/bugs", { data: { user_id } })
        .then(response => {
            this.setState({
                message: response.data.message,
                bugs:  response.data.bugs,
                user_id
            })
        })
        .catch(error => { console.log(error) })
    }

    convertDate = date => {
        return new Date(date).toLocaleDateString()
    }
    
    convertResolved = item => {
        if(item) return 'Yes'
        else return 'No'
    }

    checkMessage = success => {
        if(success) return 
    }

    handleQuery = (e) => {
        let query = e.target.value
        console.log(query.length)

        let { user_id } = this.state

        if(query != null) {
            Axios.get("http://localhost:8080/bugs", { data: { user_id } })
            .then(response => {
                let array = response.data.bugs.filter(item => {
                    if(item.title.startsWith(query)) return item
                })
                this.setState({ bugs: array})

            })
            .catch((error) =>console.error(error))
        } else {
            let { user_id } = this.state
            Axios.get("http://localhost:8080/bugs", { user_id })
            .then(response => {
                this.setState({ bugs:response.data.bugs })
            })
            .catch((error)  => console.error(error))
        }
    }
    
    render() {
        if(this.state.bugs.length == 0) return <Alert type="error">No bugs found</Alert>

        return (
            <>
                <Alert variant="success">{this.state.message || ""}</Alert>

                <div className="table">
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
                        {
                            this.state.bugs.map(item => {
                                if(!item.resolved) return (
                                    <tr>
                                        <td>{item.title}</td>
                                        <td>{item.description}</td>
                                        <td>{this.convertResolved(item.resolved)}</td>
                                        <td>{this.convertDate(item.log_date)}</td>
                                        <td><DeleteForm show={false} dataset={item}></DeleteForm></td>
                                        <td><EditForm show={false} dataset={item}></EditForm></td>
                                    </tr>
                                )
                            })
                        }
                    </table>
                </div>
            </>
        )
    }
}