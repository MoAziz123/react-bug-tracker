import React  from 'react'
import {Form, Button, Alert, Modal} from 'react-bootstrap'
import Axios from 'axios'

export class DeleteForm extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {

            show:this.props.show,
           


        }
    }
    handleDelete()
    {
        Axios.post("http://localhost:8080/bugs/delete",{id:this.props.dataset._id})
        this.setState({show:false})
    }
    render()
    {
           return( 
            <div>
           <Modal className="user-form"  show={this.state.show} onHide={(e) => this.setState({show:false})}>
                <Modal.Header><h2>Confirmation</h2></Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete this item?</p>
                    <Button type="button" onClick={() => {this.handleDelete()}}>OK</Button>
                    <Button type="button" onClick={() => {this.setState({ show:false})}}>Cancel</Button>
                </Modal.Body>
            </Modal>
            <Button type="button" onClick={()=>this.setState({show:true})}>Delete</Button>
            </div>
            
            )


    }
}