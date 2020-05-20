import React, {Component} from 'react';
import {Modal, Row, Col, Form} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import SnackBar from '@material-ui/core/Snackbar';
import IconButton from "@material-ui/core/IconButton";
import axios from 'axios';
import qs from 'querystring';

export default class AddDrinkModal extends Component{

    constructor(props){
        super(props);
        this.state = {categories:[], snackBaropen: false, snackBarMessage: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        fetch('https://localhost:44399/api/Category/getAll')
        .then(res=> res.json())
        .then(data=>{
            this.setState({categories: data});
        })
    }

    snackBarClose=(event)=>{
        this.setState({snackBaropen: false});
    }

    handleSubmit=(event)=>{
        event.preventDefault();
        /*fetch('https://localhost:44385/api/Drink',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                id:null,
                name:event.target.name.value,
                category:event.target.category.value,
                volume:event.target.volume.value,
                firstPrice:event.target.firstPrice.value,
                markUp:event.target.markUp.value,
                price:event.target.price.value
            })
        })
        .then(res=> res.json())
        .then((result)=>{
            this.setState({snackBaropen: true, snackBarMessage: 'Added successfully'});
        },
        (error)=>{
            this.setState({snackBaropen: true, snackBarMessage: 'Failed added'});
        })*/

        axios.post(`https://localhost:44399/api/Drink/create?${qs.stringify({
            Name: event.target.name.value,
            CategoryId: event.target.category.value,
            Volume: event.target.volume.value,
            FirstPrice: event.target.firstPrice.value,
            MarkUp: event.target.markUp.value,
            Price: event.target.price.value
        })}`)
        .then(res=> {
            this.setState({snackBaropen: true, snackBarMessage: 'Added successfully'});
        })
        .catch(error=> {
            console.log(error);
            this.setState({snackBaropen: true, snackBarMessage: 'Failed added'});
        });
    }

    render(){
        return(
            <div className='container'>
                <SnackBar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={this.state.snackBaropen}
                autoHideDuration={1000}
                onClose={this.snackBarClose}
                message={<span id='message-id'>{this.state.snackBarMessage}</span>}
                action={[
                    <IconButton key='close' aria-label="close" color='inherit'
                    onClick={this.snackBarClose}></IconButton>
                ]}/>

                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Adding drink
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="name">
                                        <Form.Label>Drink name</Form.Label>
                                        <Form.Control 
                                        type="text"
                                        name="name"
                                        required
                                        placeholder="Drink name"/>
                                    </Form.Group>
                                    <Form.Group controlId="category">
                                        <Form.Label>Drink category</Form.Label>
                                        <Form.Control as="select">
                                            {this.state.categories.map(cat=>
                                                <option key={cat.id}>{cat.id}</option>
                                            )}
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="volume">
                                        <Form.Label>Drink volume</Form.Label>
                                        <Form.Control 
                                        type="text"
                                        name="volume"
                                        required
                                        placeholder="Drink volume"/>
                                    </Form.Group>
                                    <Form.Group controlId="firstPrice">
                                        <Form.Label>Drink first price</Form.Label>
                                        <Form.Control 
                                        type="text"
                                        name="firstPrice"
                                        required
                                        placeholder="Drink first price"/>
                                    </Form.Group>
                                    <Form.Group controlId="markUp">
                                        <Form.Label>Drink mark up</Form.Label>
                                        <Form.Control 
                                        type="text"
                                        name="markUp"
                                        required
                                        placeholder="Drink mark up"/>
                                    </Form.Group>
                                    <Form.Group controlId="price">
                                        <Form.Label>Drink price</Form.Label>
                                        <Form.Control 
                                        type="text"
                                        name="price"
                                        required
                                        placeholder="Drink price"/>
                                    </Form.Group>
                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Add drink
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
          
                    </Modal.Body>
                    <Modal.Footer>

                        <Button variant="primary" onClick={this.props.onHide}>
                            Close
                        </Button>

                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}