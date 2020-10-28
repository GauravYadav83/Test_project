import React, { Component } from 'react';
import { getUser, removeUserSession } from './../Utils/Common';

class SearchBar extends Component{

    constructor(props){
        super(props);
        this.state ={
            event:{
                data:""
            },
            formErrors:{
                data:""
            }
        }
    }   

    handleChange = (event) =>{
        const {name, value} = event.target;
        let formErrors = this.state.formErrors;
        let eventval = this.state.event;
        switch(name){
            case "data":
                eventval.data = value;
                formErrors.data = value.length < 4 && value.length > 0 ? "Minimum 4 characters are required" : "";
                break;
            default :
                break;
        }

        this.setState({formErrors,[name]:value})
        this.setState({eventval,[name]:value})
    }

    render(){
        const {formErrors} = this.state;
        return(
            <div>
            <form class="form-inline my-2 my-lg-0">
            <input 
            class={`form-control mr-sm-2 ${formErrors.data.length > 0 ? "is-invalid" : null}`}
            type="text" 
            name ="data"
            onChange={this.handleChange}
            placeholder="Search" 
            aria-label="Search" />
            <button class="btn btn-secondary my-2 my-sm-0" 
                type="submit" 
                onClick={()=> this.props.history.push("/search/"+this.state.event.data)} >
                Search
                </button>
            </form>
            {formErrors.data.length>0 &&(<span>{formErrors.data}</span>) }
        </div>)
    }
}



export default SearchBar;