import React from 'react'

import {stateStore} from "../../index";
import ModalContainer from "../ModalContainer";
import Dashboard from "../../dashboard/Dashboard";

export default class EmployeeMainContainer extends React.Component {

  constructor() {
    super();
    this.state = {
      modalShow: false, innerContainerName: '', initDate: new Date()
    }
    this.callMakeJsx = this.makeJsx.bind(this)
    console.log('constructor')
    this.toggleModalShow = this.toggleModalShowFunction.bind(this)

  }

  callMakeJsx
  toggleModalShow

  toggleModalShowFunction(innerContainerName, ...args) {
    if (stateStore[0] !== undefined) {
      console.log("toggleModalShow")
      console.log(`${JSON.stringify(stateStore)}`)
      alert(`${innerContainerName} modal On! args=${args}`)
      stateStore[1](innerContainerName)
    }
  }

  makeJsx() {
    console.log('makeJsx()')
    return (<>
        <ModalContainer></ModalContainer>
        <Dashboard toggleModalShowing={this.toggleModalShowFunction}>
        </Dashboard>
      </>)
  }

  render() {
    return (this.callMakeJsx())
  }
}
