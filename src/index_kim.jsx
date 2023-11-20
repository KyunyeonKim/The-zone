import React from 'react';
import CreateEmployee from "./component/kim/component/CreateEmployee";
import {render} from "react-dom";
document.addEventListener('DOMContentLoaded', function () {
    render(<CreateEmployee/>, document.body.appendChild(document.createElement('div')))
})

