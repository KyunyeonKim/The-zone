import React, {Component} from 'react';
import axios from "axios";

class VacationRequest extends Component{
    componentDidMount() {
        axios.get('')
            .then(function(response){
                console.log(response);
            }).catch(function(error){
            console.log(error);
        })
    }

    render(){
        return(
            <div>

            </div>
        )
    }
}

export default VacationRequest;