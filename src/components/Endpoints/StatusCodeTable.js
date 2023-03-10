import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as ReactBootStrap from 'react-bootstrap';
import UpdateStatusCodePopUp from './UpdateStatusCodePopUp';
import DeleteStatusCodePopUp from './DeleteStatusCodePopUp';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';

const StatusCodeTable = ({record}) => {
    console.log('props recived statuscode' , record)
    
    const [results, setResults] = useState([]);
    const [modalUpdate,setModalUpdate]= useState();
    const [modalDelete,setModalDelete]= useState();
    const [entry,setEntry] =useState();

    const handleUpdateButtonClick = (value) =>{
      setEntry(value)
    }
    const toggleModalUpdate = ()=> {
      setModalUpdate(!modalUpdate)
    }
    const toggleModalDelete = ()=> {
      setModalDelete(!modalDelete)
    }

    // const uniqueIds = [...new Set(record.map(item => item.id))];
    console.log(record); 

    // useEffect(() => {
    //     // if (endpointValue) {
    //       axios.get(`http://localhost:9002/v1/status-codes/1`)
    //         .then(response => {
    //           setData(response.data);
    //           console.log(response.data)
    //         })
    //         .catch(error => {
    //           console.error(error);
    //         });
    //    // }
    //   }, []);

    // useEffect(() => {
    //     console.log("here statuscode");
    //      uniqueIds.forEach((id) => {
    //         // console.log("abcd")
    //         // const x=uniqueIds[0].toString();
    //         // console.log(x);
    //         fetch(`http://localhost:9002/v1/status-codes/${id}`)
    //             .then(response => response.json())
    //             .then(data => {
    //                 // setResults(data);
    //                 setResults(prevResults => [...prevResults, ...data]);
    //                 console.log(results);
    //             })
    //             .catch(error => console.error(error));
    //     }); 
    //   }, []);
      
    //   const filteredData = results.filter(item => item.endpoint_id === record);
    //   console.log(filteredData);
      console.log(results);

    return (
        <div className="table-responsive">
      <ReactBootStrap.Table striped bordered hover size="sm" className="table table-sm table-bordered">
      <thead className="bg-dark text-white">
        <tr>
          <th className='text-nowrap'>id</th>
          <th className='text-nowrap'>status_code</th>
          <th className='text-nowrap'>description</th>
          <th className='text-nowrap'>endpoint_id</th>
          <th className='text-nowrap'>response_body</th>
          <th className='text-nowrap'>created_at</th>
          <th className='text-nowrap'>updated_at</th>
          <th className='text-nowrap'>deleted_at</th>
          <th className='text-nowrap'>Action</th>
         
        </tr>
      </thead>
      <tbody>
      
        {record.map((item) => (
          <tr key={item.id}>
            <td className='text-nowrap'>{item.id}</td>
            <td className='text-nowrap'>{item.status_code}</td>
            <td >{item.description}</td>
            <td className='text-nowrap'>{item.endpoint_id}</td>
            <td >{JSON.stringify(item.response_body)}</td>
            <td >{item.created_at ? item.created_at.toString() : ''}</td>
            <td >{item.updated_at ? item.updated_at.toString() : ''}</td>
            <td >{item.deleted_at ? item.deleted_at.Time.toString() : ''}</td>
            <td >
              <div className='btn-group'>
              <ReactBootStrap.Button variant="primary" onClick={() => {handleUpdateButtonClick(item);toggleModalUpdate()}}><BsPencilSquare />{" "}</ReactBootStrap.Button>
            <ReactBootStrap.Button variant="danger" onClick={() => {handleUpdateButtonClick(item);toggleModalDelete()}}><BsTrash/>{" "}</ReactBootStrap.Button>
              </div>
            </td>

            {entry && modalUpdate && <UpdateStatusCodePopUp  onClose={toggleModalUpdate} record={entry} />}
            {entry && modalDelete && <DeleteStatusCodePopUp  onClose={toggleModalDelete} record={entry.id} />}

          </tr>
        ))}
        
      </tbody>
     
    </ReactBootStrap.Table>
    </div>
    );
};
export default StatusCodeTable;