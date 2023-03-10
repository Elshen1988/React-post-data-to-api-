import React, { useRef } from 'react'
import { useState } from 'react';
import './App.css';

function App() {
  let [data, setData] = useState({
    conpaniName: "",
    contacName: "",
    contactTitle: "",
    adress:{  
    city: "",
    country: ""
    }
  })
   let [conpani, setConpani] = useState("")
  let [contac, setContac] = useState("")
  let [city, setCity] = useState("")
  let [country, setCountry] = useState("")
  let[table,tableSet]=useState()
  let [check,setCheck]=useState(false)
  let [check1,setCheck1]=useState(false)
  let [check2,setCheck2]=useState(false)
  let [check3,setCheck3]=useState(false)
  let slide=useRef()
  let [postcheck,setpostCheck]=useState(true)
  let ref1=useRef()
  let ref2=useRef()
  let ref3=useRef()
  let ref4=useRef()
  let ref5=useRef()

  let postData =(e)=>{
    e.preventDefault() 
    if(check&&check1&&check2&&check3===true){
fetch('https://northwind.vercel.app/api/suppliers',{
      method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({data})
  })
    }else{
      alert("məlumat düzgün deyil")
    }
    ref1.current.value=""
    ref2.current.value=""
    ref3.current.value=""
    ref4.current.value=""
    ref5.current.value=""
  }
 console.log(data);
  let getData=(e)=>{
    e.preventDefault() 
    fetch('https://northwind.vercel.app/api/suppliers')
    .then((Promise)=>{
      return Promise.json()
      })
      .then((obj)=>{
        tableSet(obj)
      })
      if(postcheck){
slide.current.style.left="140px";
      }else{
        slide.current.style.left="1200px";
      }
  }
  
 
  return (
    <div className="App">

      <div className='mainDiv'>
        <h1>POST DATA</h1>
        <div className='secondDiv'>
        <form>
        <label htmlFor="fname">Conpani name:</label>
        <input ref={ref1} required onChange={(e) => e.target.value.length < 5 ?setConpani("min length 5"):
        setData({...data,conpaniName:e.target.value})&setConpani('')&setCheck(true) } type="text"  />
        <p>{conpani}</p>
        <label htmlFor="lname">Contac name:</label>
        <input ref={ref2}  required onChange={(e) => e.target.value.includes("@")?setContac("dont write @"):
         setData({...data,contacName:e.target.value})&setContac("")&setCheck1(true) } type="text"  />
        <p>{contac}</p>
        <label htmlFor="contacTitle">Contac Title:</label>
        <input ref={ref3}  required className='contacTitle' 
        onChange={(e)=>setData({...data,contactTitle:e.target.value.toUpperCase()})} type="text" id="contacTitle" name="contacTitle" /><br/>
        <label htmlFor="city">City:</label>
        <input  ref={ref4}  required  onChange={(e) => e.target.value.includes(" ")?setCity("empty"):
         setData({...data,adress:{city:e.target.value}})&setCity("")&setCheck2(true) } type="text" id="city"  />
        <p>{city}</p>
        <label htmlFor="country">Country:</label>
        <input ref={ref5}  required onChange={(e) => e.target.value.includes(" ")?setCountry("empty"):
         setData({...data,adress:{...data.adress,country:e.target.value}})&setCity("")&setCheck3(true) } type="text" id="country" />
        <p>{country}</p>
          <button onClick={(e)=>postData(e)}>Send</button>
          <button className='getDAta' onClick={(e)=>getData(e)&setpostCheck(!postcheck)}>Get</button>
      </form>
        </div>
        
      </div>
      <div className='tablediv' ref={slide}>
        {
      table?<div>
        <table>
          <thead>
            <tr>
            <th>ID</th>
            <th>Company Name</th>
            <th>Contact Name</th>
            <th>Contact Title</th>
            <th>City</th>
            <th>Country</th>
          </tr>
          </thead>
          <tbody>
            {table?.map((item,index)=><tr key={index}>
              <td>{item.id}</td>
              <td>{item.companyName}</td>
              <td>{item.contactName}</td>
              <td>{item.contactTitle}</td>
              {/* <td>{item.address.city}</td> */}
              {/* <td>{item.address.country}</td> */}
              </tr>)}
          </tbody>
        </table>
      </div>:null }
      </div>
      
    </div>
  );
}

export default App;
