import React, { useState } from 'react';
import axios from 'axios';
import { on } from 'events';


const DeleteStatusCodePopUp = ({ onClose, record }) =>  {  
  console.log(record)
  const [data,setData] = useState([])
  const [responseDelete,setResponseDELETE]= useState('')
    console.log(record);

  

    const handleSubmitDELETE = async (e) => {
        e.preventDefault();
        try {
          const res = await fetch(`http://localhost:9002/v1/status-codes/${record}`,{
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
          });
            const data = await res.json();
            console.log(data);
            setResponseDELETE(JSON.stringify(data));
      }catch (error) { 
        console.error(error);
        setResponseDELETE('An error occurred while submitting the form');
      }
    };
    
  return (
    <div className="popup-background">
    <div className="popup-container" >
      <div className="popup-content">
        <div className="titleCloseBtn">
        
          <button onClick={onClose} id="close-btn">
            X
          </button>
        </div>
        <h2>Delete</h2>
        <form onSubmit={handleSubmitDELETE}>
          <p>Are you sure You want delete this StatusCode id {record}</p>
          <div className='popup-footer'>
          <button type="submit" className='btn btn-primary'style={{marginLeft:'90px'}}>Yes</button>
          <button type="button" className='btn btn-danger' onClick={onClose}>No</button></div>
        </form>
      </div>
    </div>
    </div>
  );
};
export default DeleteStatusCodePopUp;
