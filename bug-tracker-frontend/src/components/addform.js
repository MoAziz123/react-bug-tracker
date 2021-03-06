import React  from 'react'
import {Form, Button,  Modal} from 'react-bootstrap'
import Axios from 'axios'


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
            added:false,
            err_message:null
        }
    }
    /**
     * @method - checkFields
     * @description - checks the val message for null, if all are then continue else reject
     * @since 1.0.1
     */
    checkFields = ()=>
    {
        if(this.state.message.title == null && this.state.message.description == null){
            return true
        }
    }
   /**
    * handleSubmit()
    * @args - event
    * @description - sends form data to add to db
    * @since 1.0.0
    */
    handleSubmit=async e=>{
        e.preventDefault()
        if(this.checkFields())
        {
            await Axios.post("http://localhost:8080/bugs/new", {
            
                user_id:this.state.user_id,
                title:this.state.dataset.title,
                description:this.state.dataset.description
            },{headers:
            {
                'x-access-token':localStorage.getItem("token")
            }})
            .then((response)=>
            {
                if(!response.data.auth){
                    localStorage.removeItem("token")
                    window.location.assign("http://localhost:3000/login")
    
                }
                this.setState({message:response.data.message,added:true})
            })
            .catch((error) =>{console.log(error)})
            this.setState({dataset:{title:null, description:null, resolved:null, log_date:null}, show:false})
            window.location.assign("")
        }
        else
        {
            this.setState({err_message:"Please fill in all fields."})
        }
        
    }
    /**update<field>()
     * @args - event
     * @description - updates the form field whilst also checking for validity
     * @since 1.0.0
     *  
     */
    updateTitle=e=>{
        if(e.target.value.length < 10){
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
            this.setState({dataset:
                {
                    title:e.target.value,
                    description:this.state.dataset.description,
                    resolved:this.state.dataset.resolved,
                    log_date:this.state.dataset.log_date
                },message:{title:"Please ensure your title is less than 10 characters", description:this.state.message.description, log_date:this.state.message.log_date}})
        }
    }

    updateDesc(e){
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
            this.setState({dataset:
                {
                    title:this.state.dataset.title,
                    description:e.target.value,
                    resolved:this.state.dataset.resolved,
                    log_date:this.state.dataset.log_date
                },message:{title:this.state.message.title, description:"Please ensure your description is less than 50 characters", log_date:this.state.message.log_date}})
        }
    }
    render()
    {
        return (
            <div>
                <Modal className="user-form"  show={this.state.show} onHide={(e) => this.setState({show:false})}>
                <Modal.Header><h2>Add Form</h2></Modal.Header>
                <Modal.Body>
                <p>{this.state.err_message}</p>
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
