import React, {useState} from 'react'
import axios from 'axios'
import './Form.css'
import api from '../../services/api'
export default function Form() {
    const [name, setName] = useState('');
    const [weight, setWeight] = useState('')
    const [address, setAddress] = useState({})
    const [latitude, setLatitude] = useState('')
    const [longitude, setlongitude] = useState('')
    async function handleClick(event){
        event.preventDefault();
         //const response = await api.post('/sessions', { email });
         try {
            const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(address)}&key=AIzaSyAJwTL_WQK7sIhlccPw7XhSLL_uoqlu_ic`)
            console.log(response.data.results[0])
            const lng = response.data.results[0].geometry.location.lng
            const lat = response.data.results[0].geometry.location.lat
            //const address = response.data.results[0];
            const route = response.data.results[0]
            setlongitude(lng)
            setLatitude(lat)
            setAddress( 
                {
                    numberStreet: route.address_components[0].long_name,
                    street: route.address_components[1].long_name,      
                    district: route.address_components[2].long_name,
                    complement: '',
                    city: route.address_components[3].long_name,
                    state: route.address_components[4].short_name,
                    country: route.address_components[5].short_name,
                    geolocation: {
                        lat: route.geometry.location.lat,
                        lg:  route.geometry.location.lng
                    }
                } 
            )
         } catch (error) {
             console.error(`Erro na requisição -> ${error}`)
         } 
      }
    async function handleSubmit(event){
        event.preventDefault();
       
         try {
            /* setAddress({
                "street": "Rua Alameda B",
                "numberStreet": 225,
                "district": "Jardins",
                "complement": "Cond Regent Garden",
                "city": "Aracaju",
                "state": "Sergipe",
                "country": "Brasil",
                "geolocation": {
                    "lat": "-2151.5",
                    "lg": "+21651.4"
                } )*/
             await api.post('/delivery', {name, weight, address})
          
         } catch (error) {
             console.error(`Erro ao salvar delivery -> ${error}`)
         } 
    }

    return (
        <div id="card">
            <form onSubmit={handleSubmit}>
                <label htmlFor="Name">
                    <input className="data" 
                            type="text" 
                            name="name" id="name" 
                            required placeholder="Nome do Cliente"  
                            onChange={event => setName(event.target.value)}/>
                </label>
                <label htmlFor="weight of Delivery">
                    <input className="data" 
                            type="text" 
                            name="weight" 
                            id="weight" 
                            required placeholder="Peso da Entrega"
                            onChange={event => setWeight(event.target.value)}/>
                </label>
                <label htmlFor="Address">
                    <input className="data" 
                            type="text" name="address" 
                            id="address" 
                            required placeholder="Endereço Cliente"
                            onChange={event => setAddress(event.target.value)}/>
                    <button type="submit" className="btnSearch" onClick={handleClick}>Buscar</button>
                </label>
                <label htmlFor="geo-long">
                    <input className="geo" id="long" value={longitude}  type="text" name="long" disabled required placeholder="Longitude"/>
                </label>
                <label htmlFor="geo-lat">
                    <input className="geo" type="text" value={latitude} name="lat" id="weight" disabled required placeholder="Latitude"/>
                </label>
                <button  className="btn" style={{backgroundColor: '#3CBC8D', marginTop: '20px'}}>Cadastrar Cliente</button>
                <button  className="btn"  style={{backgroundColor: '#e10000', marginTop: '15px'}}>Resetar Cadastro</button>
            </form>
        </div>
    )
}