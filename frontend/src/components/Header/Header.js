import React from 'react'
import './Header.css'
import logo from '../../assets/routeasy-complex.png'
export default function Header( ){
    return (
        <header>
           <img id="logo"  src={logo} alt="logo-marca" srcset=""/>
           <span>Challenge</span>
        </header>
    )
}