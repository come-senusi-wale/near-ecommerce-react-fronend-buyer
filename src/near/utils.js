//import { connect, Contract, keyStores, WalletConnection } from 'near-api-js'
//import getConfig from './config'


import { CONTRACT_NAME, getConfig } from "./config";

const nearConfig = getConfig('development');

// Initialize contract & set global variables
export async function initContract () {
  // Initialize connection to the NEAR testnet
  //const near = await connect(Object.assign({ deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() } }, nearConfig))
    let near = await window.nearApi.connect(nearConfig);

  // Initializing Wallet based Account. It can work with NEAR testnet wallet that
  // is hosted at https://wallet.testnet.near.org
  window.walletConnection = new window.nearApi.WalletConnection(near);

  // Getting the Account ID. If still unauthorized, it's just empty string

  window.account = await window.walletConnection.account()

  // Initializing our contract APIs by contract name and configuration

  window.contract =  new window.nearApi.Contract(
    window.account, 
    CONTRACT_NAME, {
    // View methods are read only. They don't modify the state, but usually return some value.
    viewMethods: ['items_list_total_supply', 'single_item', 'items_list', 'cost', 'customer_cart_list'],
    // Change methods can modify the state. But you don't receive the returned value when called.
    changeMethods: ['add_to_cart', 'increase_product', 'decrease_product', 'remove_from_cart', 'pay_for_product'],
  })
}; 


// for checking if account is loging
export const isLogging = () => {
    return window.walletConnection.isSignedIn();
}


// for getting signer account
export const getAccount = () => {
    return window.walletConnection.getAccountId();
    
}


// for loging out user 
export function logout() {

    if (isLogging()) {

        window.walletConnection.signOut();
        window.location.reload();
        // reload page
        //window.location.replace(window.location.origin + window.location.pathname)
        
    } else {

        alert('already logout');
        
    }

}


// for logig in user
export async function login() {
  // Allow the current app to make calls to the specified contract on the
  // user's behalf.
  // This works by creating a new access key for the user's account and storing
  // the private key in localStorage.

  if (!isLogging()) {
    window.walletConnection.requestSignIn(CONTRACT_NAME);
  } else {
    //let me = await getAccount()
    alert(`already login please as ${getAccount()}`);
  }

  //window.walletConnection.requestSignIn(CONTRACT_NAME);
  
  
}


// function for getting user near token balance
export async function balances () {
    if (isLogging()) {

        //let nearConnection = await window.connect(Object.assign({ deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() } }, nearConfig));

        let nearConnection =await window.nearApi.connect(nearConfig);
        const account = await nearConnection.account(getAccount());
        let acc = await account.getAccountBalance();

        return acc;
        
    } else {
        
        return false;
    }

}



//function to add product to cart

export async function add_to_cart(item_id){

  if (isLogging()) {

    let adding_to_cart = await window.contract.add_to_cart(
      
      {
       item_id
      
      },
      "300000000000000", // attached GAS (optional)
      "7330000000000000000000"
    );

    return adding_to_cart;
    
  } else {

      return false;

  }
}



// function for increasing product in cart 
export let increase_product_in_cart = async(item_id,) => {

  if (isLogging()) {


    let inreasing_product = await window.contract.increase_product(
        
      {
        item_id
      },
      "300000000000000", // attached GAS (optional)
      "7330000000000000000000"
    );

    

    return inreasing_product;
  
  } else {

      return false;

  }

}



// function for decreasing product in cart 
export let decrease_product_in_cart = async(item_id,) => {

  if (isLogging()) {


    let dereasing_product = await window.contract.decrease_product(
        
      {
        item_id
      },
      "300000000000000", // attached GAS (optional)
      "7330000000000000000000"
    );

    

    return dereasing_product;
  
  } else {

      return false;

  }

}



// function for removing product from cart 
export let remove_product_from_cart = async(item_id,) => {

  if (isLogging()) {


    let removing_product = await window.contract.remove_from_cart(
        
      {
        item_id
      }
    );

    

    return removing_product;
  
  } else {

      return false;

  }

}




// function for paying for product 
export let pay_for_product_in_cart = async(amount) => {

  if (isLogging()) {

    // converts NEAR amount into yoctoNEAR (10^-24)
    const amountInYocto = await window.nearApi.utils.format.parseNearAmount(amount);

    console.log(amountInYocto);

    let paying_for_product = await window.contract.pay_for_product(
        
      {
       
      },
      "300000000000000", // attached GAS (optional)
      amountInYocto
    );

    

    return paying_for_product;
  
  } else {

    return false;

  }

}










// function for getting total product 
export let total_product = async () => {

  //if (isLogging()) {

    let totaling_product = await window.contract.items_list_total_supply();

    return totaling_product;
  
  // } else {

  //     return false;

  // }

}



// function for getting single product product 
export let single_product = async (item_id) => {

  if (isLogging()) {

    let singling_product = await window.contract.single_item(
      {
        item_id
      }
    );

    return singling_product;
  
  } else {

      return false;

  }

}


// function for getting pagenated of items
export let pagenated_product = async (from_index = '', limit = '') => {

  //if (isLogging()) {

    let paging_product = ''; 

    if (from_index == '' || limit == '') {

      paging_product = await window.contract.items_list(
        {
          from_index : 0,
          
        }
      );
      
    }else{
      paging_product = await window.contract.items_list(
        {
          from_index,
          limit
        }
      );
    }


    return paging_product;
  
  // } else {

  //     return false;

  // }

}



// function for getting total product cost of customer in cart list
export let total_cost = async () => {

  if (isLogging()) {

    let account = await getAccount();

    let totaling_cost = await window.contract.cost(
      {
        account
      }
    );

    return totaling_cost;
  
  } else {

      return false;

  }

}


// function for getting list products of customer in cart list
export let list_product = async () => {

  if (isLogging()) {

    let account = await getAccount();

    let listing_product = await window.contract.customer_cart_list(
      {
        account,
        from_index: 0,
        limit: 4
      }
    );

    return listing_product;
  
  } else {

      return false;

  }

}



