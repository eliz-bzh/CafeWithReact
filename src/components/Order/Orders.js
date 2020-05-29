import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button, ButtonToolbar} from 'react-bootstrap';
import AddOrderModal from './AddOrderModal';
import EditOrderModal from './EditOrderModal';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';

export default class Orders extends Component{

    constructor(props){
        super(props);
        this.state = {orders: [],
             addModalShow: false, editModalShow: false, min: 0, max: 100000000};
    }

    componentDidMount(){
        this.refreshList();
    }

    deleteOrder(orderId){
        if(window.confirm('Are you sure?')){
            axios.delete(`https://localhost:44399/api/Order/delete/${orderId}`)
            .then(res=> {
                console.log(res.data);
            })
            .catch(error=> {
                console.log(error);
            });
        }
    }

    refreshList(){
        axios.get(`https://localhost:44399/api/Order/getAll`)
        .then(res=> {
            this.setState({orders: res.data})
        });
    }

    componentDidUpdate(){
        this.refreshList();
    }

    onChangeMax=(event)=>{
        this.setState({max: event.target.value});
    }

    onChangeMin=(event)=>{
        this.setState({min: event.target.value});
    }

    render(){
        const {orders, min, max, orderId, orderDate, orderNumberTable, orderWaiter, orderTotalPrice} = this.state;
        const addModalClose=()=>this.setState({addModalShow:false});
        const editModalClose=()=>this.setState({editModalShow:false});
        const filterOrders = orders.filter(order =>{
            if(order.price <= max && order.price >= min){
                return order;
            }
            return null;
        });
        return(
            <div>
                <input type="text" className="form-control" placeholder='Min price' onChange={this.onChangeMin}/>
                <input type="text" className="form-control" placeholder='Max price' onChange={this.onChangeMax}/>
                <Table className='mt-4' size='sm'>
                <thead>
                    <tr>
                        <th>Order number</th>
                        <th>Order date</th>
                        <th>Number table</th>
                        <th>Number of waiter</th>
                        <th>Order total price</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order=>
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{new Date(order.date).toLocaleDateString('en-GB')}</td>
                            <td>{order.numberTable}</td>
                            <td>{order.waiterId}</td>
                            <td>{order.totalPrice}</td>
                            <td>
                            <ButtonToolbar>
                                <Button 
                                variant="success" 
                                onClick={()=>this.setState({
                                    editModalShow: true, 
                                    orderId: order.id,
                                    orderDate: order.date,
                                    orderNumberTable: order.numberTable,
                                    orderWaiter: order.waiter,
                                    orderTotalPrice: order.totalPrice
                                    })}>
                                {<EditIcon/>}
                                </Button>

                                <div className="mr-2"></div>

                                <Button className="mr-2"
                                variant="secondary" 
                                onClick={()=>this.deleteOrder(order.id)}>
                                {<DeleteIcon/>}
                                </Button>

                                <EditOrderModal
                                show={this.state.editModalShow}
                                onHide={editModalClose}
                                orderid={orderId}
                                orderdate={orderDate}
                                ordernt={orderNumberTable}
                                orderwaiter={orderWaiter}
                                ordertp={orderTotalPrice}
                                />

                            </ButtonToolbar>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>

            <ButtonToolbar>
                <Button 
                variant="danger" 
                onClick={()=>this.setState({addModalShow: true})}>
                    {<AddIcon/>}
                    Add order
                </Button>

                <AddOrderModal
                show={this.state.addModalShow}
                onHide={addModalClose}/>
            </ButtonToolbar>
            </div>
        )
    }
}