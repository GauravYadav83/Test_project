import React, { Component } from 'react';
import { getUser, removeUserSession } from './../Utils/Common';
import axios from 'axios';

class Event extends Component{

    constructor(props){
        super(props);
        this.state ={
            events:[]
        }
    }

    componentDidMount = () =>{
        console.log(this.props)
        axios.get(`http://localhost:3000/events/?id=`+this.props.match.params.id).then((result)=>{
        if(result.data.length>0){
            this.setState({events: result.data})  
        }
        }).catch((err) =>{
            console.log(err)

        })
}

    render(){
        return(<div>
            <h2>Events List</h2>
            {this.state.events.length>0?    <div><table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">S no.</th>
                            <th scope="col">Event Name</th>
                            <th scope="col">Category</th>
                            <th scope="col">Day</th>
                            <th scope="col">Location</th>
                            <th scope="col">Details</th>
                        
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.events.map((listValue, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{listValue.name}</td>
                                    <td>{listValue.category}</td>
                                    <td>Day {listValue.day}</td>
                                    <td>{listValue.region}</td>
                                    <td>{listValue.description}</td>
                                    
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <button type="submit" className="btn btn-primary" onClick={()=> this.props.history.goBack()}>Go Back</button>
                </div>:
                <div className="container text-center" style={{display:'flex', flexDirection:'column', marginTop:40}}>
                    <h4>
                        No Products Added Yet !!
                        <br/>
                        </h4>
                        <h1> &#128577;</h1>  
                        <button type="submit" className="btn btn-primary" onClick={()=> this.props.history.goBack()}>Go Back</button>
                </div>
           }

        </div>)
    }
}



export default Event;