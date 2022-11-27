import { useState, useEffect } from "react";

import { FaRegTrashAlt, FaMinus, FaPlus } from "react-icons/fa";
import wale from "./../../img/port_one.jpg"

import {increase_product_in_cart, decrease_product_in_cart, remove_product_from_cart, pay_for_product_in_cart, total_cost, list_product, single_product } from "./../../near/utils";

export let Cart = () => {

    let [items, setItems] = useState([]);
    let [totalAmount, setTotalAmount] = useState('');

    let count = 0;


    //function to get customer product in cart list
    let productInCartlist = async () => {

        let cart_list_product = await list_product()
        //console.log(cart_list_product);

        let products = [];


        for (let i = 0; i < cart_list_product.length; i++) {

            const product = cart_list_product[i];

            let list = {};

            let item =  await single_product(parseInt(product.id));

            list.id = product.id;
            list.qty = product.qty;
            list.cost = product.cost;
            list.name = item.name;
            list.description = item.description;
            list.image = item.image;

            products.push(list);
            
        }


        setItems((oldItem) => {
            return products;
        });
       

        
    }


    // function to set total amount of product in cart list
    let totalCost = async () => {

        let total_amout = await total_cost();
        setTotalAmount(total_amout)
        
    }

    // function for increase product in cart list
    let increaseProduct = async (e) => {

        let item_id = e.target.getAttribute('data-id');
        //console.log(item_id);
        let increase_product = await increase_product_in_cart(parseInt(item_id));
    }



    // function to decrease product in cart list
    let decreaseProduct = async (e) => {

        let item_id = e.target.getAttribute('data-id');
        //console.log(item_id);
        let decrease_product = await decrease_product_in_cart(parseInt(item_id));
    }


    //function to remove product from cart list
    let removeProduct = async (e) => {

        let item_id = e.target.getAttribute('data-id');
        //console.log(item_id);
        let remove_product = await remove_product_from_cart(parseInt(item_id));

        alert('product successfully remove from cart list');

        window.location.reload();
    }

    

    //function to pay for product in carlist
    let payForProduct = async (e) => {

        let amount = e.target.getAttribute('data-amount');
        console.log(amount);

        let pay_for_product = await pay_for_product_in_cart(amount);

    }


    useEffect(() => {

        productInCartlist();
        totalCost();

    }, [])

    return(
        <>

        <div className="container mt-3">
        
        <div className="card border-primary">
            <div className="card-header bg-primary">
                <h2 className="text-white">Cart Checkout</h2>
            </div>

            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-striped table-hover">
                        <thead>
                        <tr>
                            <th>S/N</th>
                            <th>product Name</th>
                            <th>Product Description</th>
                            <th>Product Image</th>
                            <th>Product Qty</th>
                            <th>Product Price</th>
                            <th>Action</th>
                            <th>Delete</th>
                        </tr>
                        </thead>
                        <tbody>

                            {
                                items.map((item) =>{

                                    count++;
                                   
                                    return(

                                        <tr key={item.id}>
                                            <td>{count}</td>
                                            <td>{item.name}</td>
                                            <td>{item.description}</td>
                                            <td><img src={item.image} alt={item.name} width="80px" height="50px"/></td>
                                            <td>{item.qty}</td>
                                            <td>{item.cost}</td>
                                            <td>
                                                <div className="btn-group">
                                                <button type="button" className="btn btn-success" data-id={item.id} onClick={(e) => decreaseProduct(e)}><FaMinus data-id={item.id} onClick={(e) => decreaseProduct(e)}></FaMinus></button>
                                                <button type="button" className="btn btn-primary" data-id={item.id} onClick={(e) => increaseProduct(e)}><FaPlus data-id={item.id} onClick={(e) => increaseProduct(e)}></FaPlus></button>
                                                
                                                </div>
                                            </td>

                                            <td>
                                                <button type="button" className="btn btn-danger" data-id={item.id} onClick={(e) => removeProduct(e)}><FaRegTrashAlt data-id={item.id} onClick={(e) => removeProduct(e)}></FaRegTrashAlt></button>                                    
                                            </td>
                                        </tr>

                                    )
                                })
                            }

                            


                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>Total</td>
                                <td>{totalAmount}</td>
                                <td>
                                    <div className="btn-group">
                                    <button type="button" className="btn btn-success" data-amount={totalAmount} onClick={(e) => payForProduct(e)}>Checkout</button>
                                    
                                    
                                    </div>
                                </td>

                                <td>
                                                                    
                                </td>
                            </tr>





                            
                        </tbody>
                    </table>
                </div>
    
            </div> 

            
        </div>
        </div>

        </>
    )
}