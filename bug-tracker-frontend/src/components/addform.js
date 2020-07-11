import React  from 'react'
import {Form, Button, Alert, Modal} from 'react-bootstrap'
import Axios from 'axios'
import crypto from 'crypto-js'
import jwt from 'jsonwebtoken'
import {Redirect}from 'react-router'

export class AddForm extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            dataset:
            {
                title: null,
                description: null,
                resolved:null,
                log_date:null
            },
            show: this.props.show,
            message:
            {
                title:null,
                description:null,
                log_date:null
            },
            user_id:localStorage.getItem("user_id"),
            added:false
        }
    }

   /**
    * handleSubmit()
    * @args - event
    * @description - sends form data to add to db
    * @since 1.0.0
    */
    handleSubmit=e=>{
        e.preventDefault()
        Axios.post("http://localhost:8080/bugs/new", {
            user_id:this.state.user_id,
            title:this.state.dataset.title,
            description:this.state.dataset.description,
        })
        .then((response)=>
        {
            this.setState({message:response.data.message,added:true})
        })
        .catch((error) =>{console.log(error)})
        
        this.setState({dataset:{title:null, description:null, resolved:null, log_date:null}, show:false})
    }
    /**update<field>()
     * @args - event
     * @description - updates the form field whilst also checking for validity
     * @since 1.0.0
     *  
     */
    updateTitle=e=>{
        if(e.target.value.length < 100){
            this.setState(
                {
                    dataset:
                    {
                        title:e.target.value,
                        description:this.state.dataset.description,
                        resolved:this.state.dataset.resolved,
                        log_date:this.state.dataset.log_date
                    },
                    message:
                    {
                        title:null,
                        description:this.state.message.description,
                        log_date:this.state.message.log_date
                    }
                })}
        else{
            this.setState({message:{title:"Please ensure your title is less than 100 characters", description:this.state.message.description, log_date:this.state.message.log_date}})
        }
    }

    updateDesc(e){
        if(e.target.value.length < 500){
            this.setState({
                    dataset:
                    {
                        title:this.state.dataset.title,
                        description:e.target.value,
                        resolved:this.state.dataset.resolved,
                        log_date:this.state.dataset.log_date
                    },
                    message:
                    {
                        title:this.state.message.title,
                        description:null,
                        log_date:this.state.message.log_date
                    }
                })}
        else{
            this.setState({message:{title:this.state.message.title, description:"Please ensure your description is less than 500 characters", log_date:this.state.message.log_date}})
        }
    }
    render()
    {
        return (
            <div>
                <Modal className="user-form"  show={this.state.show} onHide={(e) => this.setState({show:false})}>
                <Modal.Header><h2>Add Form</h2></Modal.Header>
                <Modal.Body>
                <Form>
                    Title:
                    <Form.Control type="text" value={this.state.dataset.title} onChange={(e) => this.updateTitle(e)}></Form.Control>
                    <p>{this.state.message.title}</p>
                    Description:
                    <Form.Control as="textarea" value={this.state.dataset.description} onChange={(e) => this.updateDesc(e)}></Form.Control>
                    <p>{this.state.message.description}</p>
                    <Button type="submit" onClick={(e)=>this.handleSubmit(e)}>Add</Button>
                </Form>
                </Modal.Body>
                </Modal>
                <Button type="button"  onClick={() => this.setState({show:true})}>Add</Button>
                </div>

        )
    }
}