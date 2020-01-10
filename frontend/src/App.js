import React, {useState, useEffect} from 'react';
import './App.css';
import Header from './components/Header/Header';
import Form from './components/Form/Form';
import Map from './components/Map/Map';
import Table from './components/Table/Table';
import api from './services/api'
function App() {
  const [totalPedidos, setTotalPedidos ] = useState({totalClient: 0, totalWeight: 0, ticketMedio: 0})
  const [delivery, setDelivery ] = useState([])

  
  useEffect(() => {
        const loadClient = async () => {
          try {
            const client = await api.get('/deliveries')
           
            const data = client.data
            console.log(data)
            const total = data.length
            const peso =  data.map(index => index.weight)
                              .reduce( (crr, next) => { return crr +  next } )
            
            setTotalPedidos({
              totalClient: total,
              totalWeight: peso,
              averageticket: peso / total
              }
            )
            setDelivery(
              data
            )
           

          } catch (error) {
            console.error('Erro na requisição get -> ' + error)
          }
          
        }
        loadClient()
  });

  return (
    <div className="App">
      <Header/>
      <Form/>
      <Map/>
      <Table totalClient={totalPedidos.totalClient} totalWeight={parseFloat(totalPedidos.totalWeight).toFixed(2)} averageticket={parseFloat(totalPedidos.averageticket).toFixed(2)}>
       {delivery.map((delivery, index) => {
         return (
           <tr key={index}>
             <td>{delivery.name}</td>
             <td>{delivery.address.street }</td>
             <td>{delivery.address.city }</td>
             <td>{delivery.address.country }</td>
             <td>{delivery.weight }</td>
             <td>{delivery.address.geolocation.lat }</td>
             <td>{delivery.address.geolocation.lg }</td>
           </tr>
         )
       })}
      </Table>
        
    </div>
  );
}

export default App;
