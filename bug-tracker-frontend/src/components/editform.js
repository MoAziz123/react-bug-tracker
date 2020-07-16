import React  from 'react'
import {Form, Button, Alert, Modal} from 'react-bootstrap'
import {Router} from 'react-router'
import Axios from 'axios'
import moment from 'moment'

export class EditForm extends React.Component        
{
    constructor(props)
    {
        super(props)
        this.state=
        {
            bugs:null,
            show: this.props.show,
            dataset:
            {
                id:this.props.dataset._id,
                title: this.props.dataset.title,
                description:this.props.dataset.description,
                resolved:this.props.dataset.resolved,
                log_date:this.props.dataset.log_date

            },
            message:
            {
                title:null,
                description:null,
                log_date:null

            }
        }
    }
    
    /**
     *handleSubmit()
     *@args - event
     *@description - sends form data for updating in database
     *@since 1.0.0
     */
    handleSubmit=e=>{
        e.preventDefault()
        console.log(this.props.dataset._id)
        Axios.put("http://localhost:8080/bugs/update", {
            headers:
            {
                'x-access-token':localStorage.getItem("token")
            },
            
                id:this.props.dataset._id,
                title:this.state.dataset.title,
                description:this.state.dataset.description,
                resolved:this.state.dataset.resolved,
                log_date:this.state.dataset.log_date
            
        },(response)=>{
            if(!response.data.auth){
                localStorage.removeItem("token")
                window.location.assign("http://localhost:3000/login")
            }
            this.setState(this.state.message, response.data.message)
        })
        this.setState({show:false})
        window.location.assign("")
    }
    /**
     * convertDate()
     * @args - date
     * @description - converts a mongoDB date into a readable format
     * @since 1.0.0
     */
    convertDate=date=>{
        var temp = new Date(date).toISOString()
        return temp.substring(0, 10)
    }
    /**
     * convertResolved()
     * @args - value
     * @description - converts a mongoDB bool into a string readable by input type - radio
     * @since 1.0.0
     */
    convertResolved=value=>{
        if(value === true)
            return "checked"
        return 
    }
    /**update<field>()
     * @args - event
     * @description - updates the form field whilst also checking for validity
     * @since 1.0.0
     *  
     */
    updateTitle(e)
    {
        if(e.target.value.length < 10){
            this.setState({
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
            this.setState({message:{title:"Please ensure your title is less than 10 characters", description:this.state.message.description, log_date:this.state.message.log_date}})
        }
    }

    updateDesc=e=>{
        if(e.target.value.length < 50){
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
            this.setState({message:{title:this.state.message.title, description:"Please ensure your description is less than 50 characters", log_date:this.state.message.log_date}})
        }
    }
   
    updateResolved=e=>{
        this.setState({
            dataset:
            {
                title:this.state.dataset.title,
                description:this.state.dataset.description,
                resolved:e.target.checked,
                log_date:this.state.dataset.log_date
            }
        })
    }

    updateLogDate=e=>{
        let now = Date.now()
        if(new Date(e.target.value).getTime() >=  Date.now()){
            this.setState(
                {
                    dataset:
                    {
                        title:this.state.dataset.title,
                        description:this.state.dataset.description,
                        resolved:this.state.dataset.resolved,
                        log_date:e.target.value
                    },
                    message:{title:this.state.message.title, description:this.state.message.description, log_date:null}
                })}
        else{
            this.setState({
                message:
                {
                    
                    title:this.state.message.title, 
                    description:this.state.message.description, 
                    log_date:"Please ensure your date is not in the past."
                }
            })}
    }
    
    render(){
        return (
                <div>
                <Modal className="user-form" show={this.state.show} onHide={(e) =>  this.setState({show:false})}>
                <Modal.Header><h2>Edit Form</h2></Modal.Header>
                <Modal.Body>
                <Form >
                    Title:
                    <Form.Control type="text" value={this.state.dataset.title} onChange={(e) => this.updateTitle(e)}></Form.Control>
                    <p>{this.state.message.title}</p>
                    Description:
                    <Form.Control as="textarea" value={this.state.dataset.description} onChange={(e) => this.updateDesc(e)}></Form.Control>
                    <p>{this.state.message.description}</p>
                    Resolved:
                    <Form.Control type="radio" checked={this.convertResolved(this.state.dataset.resolved)} onChange={(e) => this.updateResolved(e)}>
                      </Form.Control>
                    Log Date:
                    <Form.Control type="date" value={this.convertDate(this.state.dataset.log_date)} onChange={(e) => this.updateLogDate(e)}></Form.Control>
                    <p>{this.state.message.log_date}</p>
                    <Button type="submit" onClick={(e)=>this.handleSubmit(e)}>Update</Button>
                </Form>
                </Modal.Body>
                </Modal>
                <Button type="button"  onClick={() => this.setState({show:true})}>Update</Button>
                </div>
        )
    }
}
