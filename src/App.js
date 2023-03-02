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
  let [check,setCheck]=useState(false)
  let [check1,setCheck1]=useState(false)
  let [check2,setCheck2]=useState(false)
  let [check3,setCheck3]=useState(false)
  let postData =()=>{
    if(check&&check1&&check2&&check3===true){
fetch('https://northwind.vercel.app/api/suppliers',{
      method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(data)
  
  })
    }else{
      alert("məlumat düzgün deyil")
    }
    
  }
  console.log(data);
  let [conpani, setConpani] = useState("")
  let [contac, setContac] = useState("")
  let [city, setCity] = useState("")
  let [country, setCountry] = useState("")

  return (
    <div className="App">

      <div className='mainDiv'>
        <h1>POST DATA</h1>
        <div className='secondDiv'>
        <form>
        <label htmlFor="fname">Conpani name:</label>
        <input required onChange={(e) => e.target.value.length < 5 ?setConpani("min length 5"):setData({...data,conpaniName:e.target.value})&setConpani('')&setCheck(true) } type="text"  />
        <p>{conpani}</p>
        <label htmlFor="lname">Contac name:</label>
        <input required onChange={(e) => e.target.value.includes("@")?setContac("dont write @"): setData({...data,contacName:e.target.value})&setContac("")&setCheck1(true) } type="text"  />
        <p>{contac}</p>
        <label htmlFor="contacTitle">Contac Title:</label>
        <input required className='contacTitle' onChange={(e)=>setData({...data,contactTitle:e.target.value.toUpperCase()})} type="text" id="contacTitle" name="contacTitle" /><br/>
        <label htmlFor="city">City:</label>
        <input required  onChange={(e) => e.target.value.includes(" ")?setCity("empty"): setData({...data,adress:{city:e.target.value}})&setCity("")&setCheck2(true) } type="text" id="city"  />
        <p>{city}</p>
        <label htmlFor="country">Country:</label>
        <input required onChange={(e) => e.target.value.includes(" ")?setCountry("empty"): setData({...data,adress:{...data.adress,country:e.target.value}})&setCity("")&setCheck3(true) } type="text" id="country" />
        <p>{country}</p>
        <button onClick={(e)=>postData()}>Send</button>
      </form>
        </div>
        
      </div>
      
    </div>
  );
}

export default App;
