import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import { on } from 'events';
import Select from "react-dropdown-select";



const items = [
  { 
    value: 1,
    label: "GET"
  },
  {
    value:  2,
    label: "POST"
  },
  {
    value:  3,
    label: "PUT"
  },
  {
    value:  4,
    label: "DELETE"
  }
];
const Popup = ({ onClose }) => {
  const [token, setToken] = useState('');
  const [description, setDescription] = useState('');
  const [validation,validationChange]=useState(false);
  const [endpoint,setEndpoint]=useState('')
  const [method,setMethod]=useState('')
  const [filePath,setFilePath]=useState('')
  const [http,setHttp]=useState(false);

  const handleFilePathChange=(event)=>{
    setFilePath(event.target.value)
  }
  const togglehttp = () => {
    setHttp(!http)
  }

  const handleEndpointChange=(event)=>{
    setEndpoint(event.target.value)
  };
  const handleTokenChange = (event) => {
    setToken(event.target.value);
  };

  const handleValidationChange = (event) =>{
    validationChange(event.target.value);
  }
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(method[0].label)
    const requestBody={
      endpoint:endpoint,
      method:method,
      description:description,
      file_path:filePath
    }
    try {
      const response = await fetch('http://localhost:9002/v1/endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody),
      });
      console.log(JSON.stringify(requestBody))
      //console.log(description);
      if (response.ok) {
        onClose();
        console.log((description));
      } else {
        throw new Error('Network response was not ok.');
        //console.log(description);
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <div className="popup-background">
    <div className="popup-container">
      <div className="popup-content" >
      <div className="titleCloseBtn">
          <button onClick={onClose} id="close-btn">
            X
          </button>
        </div>
        <h2>Add Endpoint</h2>
        <form onSubmit={handleSubmit} className="popup-element">
          <label>
            Token:
            <input type="text" value={token}  onChange={handleTokenChange}  />
          </label>
          <br />
          <label>
            Endpoint:
            <input required type="text" value={endpoint} onChange={handleEndpointChange}/>
            <br/>
          </label>
          <br/>
          <label className="select-method">
            Method:
            <Select options={items} style={{width:'130px',position: 'relative'}} onChange={(values) => setMethod(values[0].label)}  />
            {/* <DropDownButtonComponent items={items} select={handleMethodChange} iconCss='ddb-icons e-folder' cssClass='e-vertical' iconPosition='Top'>Move</DropDownButtonComponent> */}
          </label>
          <br/>
          <label>
            File Path:
            <input required type="text" value={filePath} onChange={handleFilePathChange}/>
            <br/>
          </label>
          <br/>
          <label>
            Description:
            <input required value={description} onMouseDown={handleValidationChange} onChange={handleDescriptionChange} />
            <br />
            {description.length===0 && validation && <span className="text-danger">Enter the Description</span>}
          </label>
          <br />
          <div className='popup-footer'>
          <button type="submit" className='btn btn-primary'>Add</button>
          <button type="button" className='btn btn-danger' style={{marginInlineStart:true}} onClick={onClose}>Cancel</button>
        </div>
        </form>
         
      </div>
    </div>
    </div>
  );
};

export default Popup;
