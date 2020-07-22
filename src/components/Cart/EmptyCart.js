import React from 'react'
import { Redirect } from 'react-router-dom'
export default function EmptyCart() {

    return (
        <div>
            {alert('Your cart is empty')}
            {<Redirect to="/" />}
        </div>
    )

}