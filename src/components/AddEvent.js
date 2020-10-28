import React, { Component } from 'react';
import { getUser, removeUserSession } from './../Utils/Common';
import axios from 'axios';


const formValid = formErrors =>{
    let valid = true;
    Object.values(formErrors).forEach(value =>{
        value.length > 0 && ( valid = false)
    });
    return valid;
}

class AddEvent extends Component{

    constructor(props){
        super(props);
        this.state ={
            categories:[],
            event:{
                id: "",
                ev_name: "",
                loc: "",
                categ: "",
                day: "",
                desc: ""
            },
            formErrors:{
                id: "",
                ev_name: "",
                loc: "",
                categ: "",
                day: "",
                desc: ""
            }
        }
    }   

    componentDidMount = () =>{
        console.log(this.props)
        axios.get("http://localhost:3000/categories").then((result)=>{
        if(result.data.length>0){
            this.setState({categories: result.data})  
        }
        }).catch((err) =>{
            console.log(err)

        })
}

    handleSubmit = (event) =>{
        event.preventDefault();
        var count = null;
        if (formValid(this.state.formErrors)) {
            axios.get("http://localhost:3000/id_counter").then((result)=>{
            if(result.data.length>0){
                 count = result.data +1;
            }
            }).catch((err) =>{
                console.log(err)

            })

            var data={
                id:count, 
                name:this.state.event.ev_name, 
                region:this.state.event.loc, 
                category:this.state.event.categ,
                day:this.state.event.day,
                description:this.state.event.desc
            };
            console.log("Printing data for event");
            console.log(data);

            axios.post('http://localhost:3000/events',data ).
            then((result)=> {
                console.log("Added")
                alert("added")
                this.props.history.goBack();
            }).catch((err) =>{
                console.log(err)
            })
                    console.log("Form Valid");
            } else {
                    console.log("Form Invalid");
                }
        }

    handleChange = (event) =>{
        const {name, value} = event.target;
        let formErrors = this.state.formErrors;
        let eventval = this.state.event;
        switch(name){
            case "ev_name":
                eventval.ev_name = value;
                formErrors.ev_name = value.length < 5 && value.length > 0 ? "Minimum 5 characters are required" : "";
                break;
            case "loc":
                eventval.loc = value;
                formErrors.loc = value.length < 5 && value.length > 0 ? "Minimum 5 characters are required" : "";
                break;
            case "desc":
                eventval.desc = value;
                formErrors.desc = value.length < 15 && value.length > 0 ? "Minimum 15 characters are required" : "";
                break;
            case "day":
                eventval.day = value;
                formErrors.day = value<=0 && value.length > 0 ? "Minimum value is 1" : "";
                break;
            case "categ":
                eventval.categ = value;
                formErrors.categ = value.length < 5 && value.length > 0 ? "Minimum 15 characters are required" : "";
                break;
            default :
                break;
        }

        this.setState({formErrors,[name]:value})
        this.setState({eventval,[name]:value})
    }

    render(){
        const {formErrors} = this.state;
        return(<div>
            <h2>Add a New Event</h2>
            <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label htmlFor="eventName">Event Name</label>
                <input type="text" 
                name ="ev_name"
                class={`form-control ${formErrors.ev_name.length > 0 ? "is-invalid" : null}`} 
                placeholder="Enter Event Name"
                onChange={this.handleChange}
                formNoValidate/>
                {formErrors.ev_name.length>0 &&(<span>{formErrors.ev_name}</span>) }
                </div>
            <div className="form-group">
                <label htmlFor="location">location</label>
                <input type="text" 
                name = "loc"
                class={`form-control ${formErrors.loc.length > 0 ? "is-invalid" : null}`} 
                placeholder="Location Here"
                onChange={this.handleChange}
                formNoValidate/>
                {formErrors.loc.length>0 &&(<span>{formErrors.loc}</span>) }
            </div>
            <div class="form-group">
                <label for="exampleFormControlSelect1">Category</label>
                <select class="form-control" id="exampleFormControlSelect1">
                {this.state.categories.map((listValue, index) => {
                            return (
                                <option>{listValue.type}</option>
                            )
                        })}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="description">Day</label>
                <input type="number" 
                name ="day"
                class={`form-control ${formErrors.day.length > 0 ? "is-invalid" : null}`} 
                placeholder="Enter Day"
                onChange={this.handleChange}
                formNoValidate/>
                {formErrors.day.length>0 &&(<span>{formErrors.day}</span>) }
            </div>
            <div className="form-group">
                <label htmlFor="description">Description</label>
                <input type="text" 
                name ="desc"
                class={`form-control ${formErrors.desc.length > 0 ? "is-invalid" : null}`} 
                placeholder="Enter description"
                onChange={this.handleChange}
                formNoValidate/>
                {formErrors.desc.length>0 &&(<span>{formErrors.desc}</span>) }
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>)
    }
}



export default AddEvent;