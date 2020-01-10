import React from 'react';
import './Table.css'

function Table(props){
    
    return (
        <main id="container"> 
            <span>Total de clientes: {props.totalClient};</span> <span>Peso total: {props.totalWeight} Kg;</span> <span>Ticket Médio*:{props.averageticket}</span>
            <table id="table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Rua</th>
                        <th>Cidade</th>
                        <th>País</th>
                        <th>Peso</th>
                        <th>Lat</th>
                        <th>Lng</th>
                    </tr>
                </thead>
               
                <tbody>
                    {props.children}
                </tbody>
            </table>
        </main>
    )
} 

export default Table;