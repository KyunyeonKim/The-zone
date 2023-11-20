import React from 'react'
import { render } from 'react-dom'

import './index.css'
import MainEndPoint from "./jang/MainEndPoint";

export const stateStore=[]
document.addEventListener('DOMContentLoaded', function() {
  render(
    <MainEndPoint/>,
    document.body.appendChild(document.createElement('div'))
  )
})
