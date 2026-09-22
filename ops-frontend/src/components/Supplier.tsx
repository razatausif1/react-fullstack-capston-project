import { useState, useEffect } from 'react'
import axios from 'axios'

const Supplier = () => {

    // const [supplierData, setSupplierData] = useState([{ id: 1, name: "Tom", address: "Pune" }]);
    const [supplierData, setSupplierData] = useState([]);

    const fetchData = async () => {
        console.log("Fetching Suppliers")
        const response = await axios.get('http://localhost:5000/api/suppliers');
        setSupplierData(response.data);
        console.log(response);
    }

    const handleDelete = async(name:String) =>{
        console.log("Deleting Supplier")
        const response = await axios.delete('http://localhost:5000/api/suppliers/' + name );
        console.log(response);
    }

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <>
            <div>Supplier List</div>
            <div>
                {
                    supplierData.map((curEle: any) => {
                        return (
                            <div key={curEle._id}>
                                <div> <b>{curEle.name} </b> -
                                    <span> {curEle.address} </span>
<button onClick={ ()=> axios.delete('http://localhost:5000/api/suppliers/'+curEle.name )}>Delete</button>
<button onClick={ ()=> handleDelete(curEle.name)}>Delete V2</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Supplier