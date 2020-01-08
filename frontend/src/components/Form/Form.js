import React from 'react'
import './Form.css'
export default function Form() {
    return (
        <div id="card">
            <form action="">
                <label htmlFor="Name">
                    <input type="text" name="name" id="name" placeholder="Nome do Cliente"/>
                </label>
                <label htmlFor="weight of Delivery">
                    <input type="text" name="weight" id="weight" placeholder="Peso da Entrega"/>
                </label>
                <label htmlFor="Address">
                    <input type="text" name="address" id="weight" placeholder="Endereço Cliente"/>
                </label>
            </form>
        </div>
    )
}