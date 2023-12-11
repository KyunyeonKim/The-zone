import React from 'react'
import { render } from 'react-dom'

import './index.css'
import MainEndPoint from "./component/jang/page/MainEndPoint";
import ErrorBoundary from "./component/jang/page/ErrorBoundary";

export const stateStore={}

export const chartDataStore = {store: {
    '1': [], '2': [], '3': [],
    '4': [], '5': [], '6': [],
    '7': [], '8': [], '9': [],
    '10': [], '11': [], '12': []
  }, appendData: (store,data, month) => {
    store[month]={...store[month],...data}//이전에 있던 data, 새로 입력된 data를 merge
  },updateChart:undefined}

document.addEventListener('DOMContentLoaded', function() {
  render(
      <ErrorBoundary>
        <MainEndPoint/>
      </ErrorBoundary>,
    document.body.appendChild(document.createElement('div'))
  )
})
