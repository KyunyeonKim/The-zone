import React from 'react';
import CreateEmployee from "./component/kim/ModalPage/CreateEmployee";
import {render} from "react-dom";
document.addEventListener('DOMContentLoaded', function () {
    render(<CreateEmployee/>, document.body.appendChild(document.createElement('div')))
})

