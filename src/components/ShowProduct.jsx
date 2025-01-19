import { useEffect, useState } from "react"
import Card from "./Card"
import axios from "axios";
import { spiral,tailChase } from 'ldrs'

spiral.register()
tailChase.register()
// Default values shown


function ShowProduct() {

const [ products,setPrducts]=useState([]);
const [ loading,setLoading]=useState(true);
useEffect(()=>{
    const fetchProducts =async()=>{
        try {
            const response = await axios.get('http://localhost:5000/api/products/');
            console.log(response.data);
            setPrducts(response.data.data);    
        } catch (error) {
            console.log(error);
            alert("Failed to fetch products");
        }finally{
            setLoading(false);
        }
       
        
    };
    fetchProducts();

},[]);

if(loading){
    // return <p>Loading Products...</p>
    // return (<div className="flex justify-center mt-64"><l-spiral size="72" speed="0.7" color="gray" ></l-spiral></div>)
    return (<div className="flex justify-center mt-64">
        <l-tail-chase
          size="40"
          speed="1.75" 
          color="gray" 
        ></l-tail-chase></div>)
}

  return (
    <div className="py-20 flex gap-3 justify-center  flex-wrap">
        {
          products.length===0?(<p>No products available</p>):  products.map((product,index)=>(
                <div key={index}>
                        <Card data={product}/>
                </div>

            ))
        }
    </div>
  )
}

export default ShowProduct