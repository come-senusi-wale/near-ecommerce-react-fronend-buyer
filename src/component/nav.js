import React, {useState,  useContext } from "react";

import { Link } from "react-router-dom";

import { isLogging, logout, login } from "./../near/utils";

import { Apcontext } from "./../context";

export let Nav = () => {

    let {searchProducts} = useContext(Apcontext);

    let [froms, setFrom] = useState('');
    let [limits, setLimit] = useState('');

    let searchingForPRoducts = () => {
    
        searchProducts(froms, limits);

       
    }


     // function for login 
     let userlogin = () => {

        login()
    }



    // function for user logout
    let userlogout = () => {

        logout()
    }


    return(
        <>
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to='/'>Wale Store</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="mynavbar">
                <ul className="navbar-nav me-auto">
                    <li className="nav-item">
                    <div className="d-flex mt-2 mb-2">
                        <input className="form-control me-2" type="number" placeholder="from" style={{width: 80}} value={froms} onChange={(e) => setFrom(e.target.value)}/>
                        <input className="form-control me-2" type="number" placeholder="limit" style={{width: 80}} value={limits} onChange={(e) => setLimit(e.target.value)}/>
                        <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar" onClick={() => searchingForPRoducts() }>Search</button>
                    </div>
                    </li>
                </ul>

                <ul className="navbar-nav  navbar-right">
                    <li className="nav-item">
                   
                    <Link className="btn btn-primary" to='/cart'>Cart</Link>
                    </li>
                    <li className="nav-item">
                       
                         {isLogging() ?
                         <a className="nav-link" href="#" onClick={() => userlogout()}>Disconnect Wallet</a> :
                         <a className="nav-link" href="#" onClick={() => userlogin()}>Connect Wallet</a>}
                       
                    </li>
                </ul>
 
                </div>
            </div>
            </nav>

            
        </>
    )
}