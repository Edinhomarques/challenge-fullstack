import React, {useState, useEffect} from 'react';
import './App.css';
import Header from './components/Header/Header';
import Form from './components/Form/Form';
import Map from './components/Map/Map';
import Table from './components/Table/Table';
import api from './services/api'
function App() {
  const [totalPedidos, setTotalPedidos ] = useState({totalClient: 0, totalWeight: 0, ticketMedio: 0})
  const [deliveries, setDeliveries ] = useState([])

  
  useEffect(() => {
        
        loadClient()
  }, []);


  const loadClient = async () => {
    try {
      const client = await api.get('/deliveries')
     
      const data = client.data
      //console.log(data)
      if(data.length){
        const total = data.length
        const peso =  data.map(index => index.weight)
                          .reduce( (crr, next) => { return crr +  next } )
        
        setTotalPedidos({
          totalClient: total,
          totalWeight: peso,
          averageticket: peso / total
          }
        )
        setDeliveries(
          data
        ) 
     
      } else{
        setDeliveries([])
        setTotalPedidos({
          totalClient: 0,
          totalWeight: 0,
          averageticket: 0 
          }
        )
      }
    } catch (error) {
      console.error('Erro na requisição get -> ' + error)
    }
    
  }
  
  
  async function removeRow(id){
    console.log(id)
    await api.delete(`/deliveries/:id?id=${id}`)
    
    return loadClient()
    
  }
  
  return (
    <div className="App">
      <Header/>
      <Form createNewList={loadClient}/>
      <Map/>
      <Table totalClient={totalPedidos.totalClient} totalWeight={parseFloat(totalPedidos.totalWeight).toFixed(2)} averageticket={parseFloat(totalPedidos.averageticket).toFixed(2)}>
       {deliveries.map((deliveries, index) => {
         return (
           <tr key={index}>
             <td>{deliveries.name}</td>
             <td>{deliveries.address.street }</td>
             <td>{deliveries.address.city }</td>
             <td>{deliveries.address.country }</td>
             <td>{deliveries.weight }</td>
             <td>{deliveries.address.geolocation.lat }</td>
             <td>{deliveries.address.geolocation.lg }</td>
             <td><button onClick={() => removeRow(deliveries._id)}>Remover</button></td>
           </tr>
         )
       })}
      </Table>
        
    </div>
  );
}

export default App;
