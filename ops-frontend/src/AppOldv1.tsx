import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios';
import Login from './components/Login';
import Supplier from './components/Supplier';

function App() {
  // const [data, setData] = useState(["ele1", "ele2"])
  const [data, setData] = useState([])
  // const url = "https://jsonplaceholder.typicode.com/users";
  const url = "http://localhost:5000/users";
  const url2 = "http://localhost:5000/create-cookie";
  async function fetchData() {
    console.log(" I want to fetch data from " + url);
    //To perform crud ops/ to access the api, we need axios library
    const response = await axios.get(url);
    await axios.get(url2, { withCredentials: true });
    // credentials: true has to be added in the backend to allow cookies to be sent from the frontend to the backend
    //It should be added in the backend in the cors middleware


    setData(response.data)
    console.log(response);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h1 className="legacy-app-title">OPS</h1>
      <Supplier />
      
    <Login />
    <hr></hr>


      <p>  {2 + 3} </p>
      {/* { data } */}
      {/* { JSON.stringify(data)} */}
      {
        data.map((curEle: any) => {
          return (
            <div className="legacy-user-card" key={curEle.id}>
              <h1> {curEle.name} </h1>
              {/* <div> {curEle.address.street}  {curEle.address.zipcode} </div>
              <h6> {curEle.company.name} </h6> */}
            </div>
          )
        })
      }
      
    </>
  )
}

export default App
