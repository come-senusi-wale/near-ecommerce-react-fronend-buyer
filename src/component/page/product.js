import { useState, useEffect, useContext } from "react";

import wale from "./../../img/port_one.jpg"

import { pagenated_product, total_product,  add_to_cart } from "./../../near/utils";

import { Apcontext } from "./../../context";

export let Products = () => {

    let {searchProducts, from, limit} = useContext(Apcontext);

    let [product, setProduct] = useState([]);


    // function to fetch product
    let loadProduct = async () => {

        let products = await pagenated_product();
        let totalProduct = await total_product();
        setProduct(products)
        
    }


     // function to fetch specific nunber of product
     let loadpaginatedProduct = async() => {
        let products = await pagenated_product(parseInt(from), parseInt(limit));
        setProduct(products)
        
    }


    //function to add product to cart
    let addProductToCart = async (e) => {

        let item_id = e.target.getAttribute('data-id');
       // console.log(item_id);

        let add_product_to_cart = await add_to_cart(parseInt(item_id))
        
    }


    useEffect(() => {
        loadProduct();
        
    }, [])

    useEffect(() => {
        loadpaginatedProduct()
    }, [searchProducts])


    return(
        <>
            <div className="container mt-3">
                
                <div className="card border-info">
                    <div className="card-header bg-info opacity-50">Products</div>

                    <div className="card-body">

                    <div className="row">

                        {
                            product.map((item) => {

                                return(

                                    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 " key={item.id}>
                                        <div className="card border-info">

                                            <div className="card-header bg-info opacity-50">
                                                <span className="opacity-100">{item.name}</span>
                                            </div>

                                            <div className="card-body">
                                                <div className="row">
                                                    
                                                    <div className="col-2 col-sm-2 col-md-2 col-lg-2">
                                                    </div>

                                                    <div className="col-8 col-sm-8 col-md-8 col-lg-8">
                                                        <img src={item.image} className="img-flui" height="200px" width="100%"  alt={item.name} />
                                                    </div>

                                                    <div className="col-2 col-sm-2 col-md-2 col-lg-2">
                                                    </div>
                                                    
                                                </div>
                                            </div>

                                            <div className="card-footer bg-info opacity-50">

                                                <span>
                                                    Near {item.price}.00
                                                    <button className="btn btn-danger float-end" data-id={item.id} onClick={(e) => addProductToCart(e)}>AddToCart</button>
                                                </span>

                                            </div>

                                        </div>
                                    </div>

                                )
                            })
                        }

                        

                        
                    </div>

                    </div> 
                    
                </div>
            </div>
        </>
    )
}