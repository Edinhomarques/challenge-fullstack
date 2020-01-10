import React, {useState} from 'react'
import axios from 'axios'
import './Form.css'
import api from '../../services/api'
export default function Form(props) {
    const [name, setName] = useState('');
    const [weight, setWeight] = useState('')
    const [address, setAddress] = useState({})
    const [addressString, setAddressString] = useState('')
    const [latitude, setLatitude] = useState('')
    const [longitude, setlongitude] = useState('')
    
    async function handleClick(event){
        event.preventDefault();
        try {
            const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(addressString)}&key=AIzaSyAJwTL_WQK7sIhlccPw7XhSLL_uoqlu_ic`)
            //console.log(response.data.results[0])
            const lng = response.data.results[0].geometry.location.lng
            const lat = response.data.results[0].geometry.location.lat
            
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
             alert('Adicione um endereço completo, rua, bairro, cidade, estado')
         } 
      }
    async function handleSubmit(event){
        event.preventDefault();
    
         try {
            await api.post('/deliveries', { name, weight, address})
                setName('')
                setWeight('')
                setAddressString('')
                setLatitude('')
                setlongitude('')
                
                return  props.createNewList();
         } catch (error) {
             console.error(`Erro ao salvar delivery -> ${error}`)
         } 
    }

    async function resetClick(event){
        event.preventDefault();
       
         try {
             await api.delete('/deliveries')
             setName('')
             setWeight('')
             setAddressString('')
             setLatitude('')
             setlongitude('')
             return props.createNewList()
         } catch (error) {
             console.error(`Erro ao Deletar todos delivery -> ${error}`)
         } 
    }


    return (
        <div id="card">
            <form onSubmit={handleSubmit}>
                <label htmlFor="Name">
                    <input className="data" 
                            type="text" 
                            name="name" id="name" 
                            value={name}
                            required placeholder="Nome do Cliente"  
                            onChange={event => setName(event.target.value)}/>
                </label>
                <label htmlFor="weight of Delivery">
                    <input className="data" 
                            type="text" 
                            name="weight" 
                            id="weight" 
                            value={weight}
                            required placeholder="Peso da Entrega"
                            onChange={event => setWeight(event.target.value)}/>
                </label>
                <label htmlFor="Address">
                    <input className="data" 
                            type="text" name="address" 
                            id="address"
                            value={addressString} 
                            required placeholder="Endereço Cliente"
                            onChange={event => setAddressString(event.target.value)}/>
                    <button type="submit" className="btnSearch" onClick={handleClick}>Buscar</button>
                </label>
                <label htmlFor="geo-long">
                    <input className="geo" id="long" value={longitude}  type="text" name="long" disabled required placeholder="Longitude"/>
                </label>
                <label htmlFor="geo-lat">
                    <input className="geo" type="text" value={latitude} name="lat" id="lat" disabled required placeholder="Latitude"/>
                </label>
                <button  className="btn" style={{backgroundColor: '#3CBC8D', marginTop: '20px'}}>CADASTRAR CLIENTE</button>
                <div id="resetCard">
                    <button  className="btn-reset"  style={{backgroundColor: '#e10000', marginTop: '15px'}} onClick={resetClick}>RESETAR CADASTRO</button>
                </div>
            </form>
        </div>
             
    )
}