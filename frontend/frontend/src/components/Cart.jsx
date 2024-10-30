import React, { useEffect, useState } from 'react'
import CartCard from './CartCard'
import { useSelector } from 'react-redux'
import { set } from 'react-hook-form'
import { FaUser, FaPhone, FaAddressCard, FaCity } from 'react-icons/fa';
import { removeFromCart, updateQuantity } from '../redux/slices/cartSlice';
import { useDispatch } from 'react-redux'
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { MdCancel } from "react-icons/md";


const Cart = () => {
  let  {cartItem} = useSelector((state)=>state.cart)
  const [totalSum , setTotalsum] = useState(0);

  const handleSubmit = async(e)=>{
    e.preventDefault();

    const formData = new FormData(e.target);
    
    const userDetails = {
      customerName : formData.get('customerName'),
      contactNumber : formData.get('customerContactNumber'),
      Address : `${formData.get('address')}, ${formData.get('city')} , 
                  ${formData.get('state')}`,
      pincode : formData.get('pinCode'),
      products : cartItem
    }

    console.log(userDetails);

    try {
      const stripe = await loadStripe("pk_test_51Q8hiu077VUKfCgzbfrt6jh6CSe1y0IUuCrgbomY3Zez5tiHhhKyOYsI0s6ygQGIhVkfN6coRxuhtmhB9bIvEhkB00nS8Jzw4o");
      const response = await axios.post(`http://localhost:3000/create-checkout-session`, userDetails);
      const result = stripe.redirectToCheckout({ sessionId: response.data.id });
      if (result.error) {
        console.log(result.error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const dispatch = useDispatch();
  const handleRemoveItem = (removeItem)=>{
      dispatch(removeFromCart(removeItem._id));
  }

  const handleReduceQuantity= (item)=>{
      dispatch(updateQuantity({id : item.id , quantity : item.quantity-1}))
    // cartItem = cartItem.map((item)=>item.id === i.id ? {...item,quantity : item.quantity + 1} : item);
    // console.log(cartItem)
  }

  const handleIncreaseQuantity = (item)=>{
    dispatch(updateQuantity({id : item.id , quantity : item.quantity + 1}));
  } 
  

  useEffect (()=>{
    const totalPrice = cartItem.reduce((acc,item)=> acc + item.price * item.quantity, 0);
    setTotalsum(totalPrice)
  },[cartItem])

  return (
    <div className=" mx-auto p-4">
    <div className="grid grid-cols-2 gap-4">

      <div className="cart-items overflow-y-auto h-[530px] p-4">
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
        <div className="mb-4">
          {cartItem.map((item, index) => (
            <div key={index} className="flex justify-between items-center p-2 border-b">
             
              <div className='flex w-1/3'>
              <img
                src={`http://localhost:3000/${item.productURL}`}
                alt={item.name}
                className="w-16 h-16 object-cover mr-4"
              />
              
              <div className=" ">
                <div>{item.name}</div>
                <div>Rs. {item.price}</div>
              </div>
              </div>

              <div className='flex'>
                <button className='bg-gray-300 px-2 mr-2 rounded' disabled ={item.quantity <=1} onClick={()=>{
                  handleReduceQuantity(item);
                }}>-</button>
                <p>{item?.quantity}</p>
                <button  className='bg-gray-300 px-2 ml-2 rounded' 
                   onClick={()=>{
                    handleIncreaseQuantity(item);
                  }}
                >+</button>
              </div>
              <div>
                <button onClick={()=>{
                    handleRemoveItem(item)
                  }}><MdCancel />
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>

    
      <div className=" bg-gray-100 p-4 rounded">
        <h2 className="text-2xl font-bold mb-4">Checkout</h2>
        <div className="font-bold mb-4">Total: Rs. {totalSum}</div>
        <form onSubmit={(e)=>handleSubmit(e)} className="space-y-4">
          <div className="flex items-center border p-2 rounded">
            <FaUser className="mr-2" />
            <input
              type="text"
              name="customerName"
              placeholder="Customer Name"
              required
              className="flex-1 p-2 border rounded"
            />
          </div>
          <div className="flex items-center border p-2 rounded">
            <FaPhone className="mr-2" />
            <input
              type="text"
              name="customerContactNumber"
              placeholder="Customer Phone Number"
              required
              className="flex-1 p-2 border rounded"
            />
          </div>
          <div className="flex items-center border p-2 rounded">
            <FaAddressCard className="mr-2" />
            <input
              type="text"
              name="address"
              placeholder="Address"
              required
              className="flex-1 p-2 border rounded"
            />
          </div>
          <div className="flex items-center border p-2 rounded">
            <FaCity className="mr-2" />
            <input
              type="text"
              name="city"
              placeholder="City"
              required
              className="flex-1 p-2 border rounded"
            />
          </div>
          <div className="flex items-center border p-2 rounded">
            <FaCity className="mr-2" />
            <input
              type="text"
              name="state"
              placeholder="State"
              required
              className="flex-1 p-2 border rounded"
            />
          </div>
          <div className="flex items-center border p-2 rounded">
            <FaCity className="mr-2" />
            <input
              type="text"
              name="pinCode"
              placeholder="Pin Code"
              required
              className="flex-1 p-2 border rounded"
            />
          </div>
          <div className="text-right">
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
            >
              Pay Now
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
    
  )
}

export default Cart

{/* <div className='w-[98%]  flex flex-col items-end justify-end gap-2'> */}
    //   <div className='font-medium text-xl mr-[5%]'><p>Your cart items</p></div>
    //   <div className='w-[30%] flex flex-col gap-3 justify-end items-end '>
    //       {cartItem.map((item)=>{
    //         // setTotalsum((prev)=> prev + item.price);
    //         // console.log(sum)
    //         return <CartCard product = {item}/>
    //       })}
    //   </div>
    //   <div>
    //     {/* {setTotalsum(sum)}; */}
    //     <p>Total : {totalSum} </p>
    //   </div>
    // </div>