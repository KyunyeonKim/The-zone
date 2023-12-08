import React from 'react'

import {stateStore} from "../../../index";
import ModalContainer from "./ModalContainer";
import Dashboard from "../dashboard/Dashboard";

export default class EmployeeMainContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modalShow: false, innerContainerName: '', initDate: new Date()
    }
    this.callMakeJsx = this.makeJsx.bind(this)
    console.log('constructor')
    this.toggleModalShow = this.toggleModalShowFunction.bind(this)
    this.userType= props.userType
  }
  userType
  callMakeJsx
  toggleModalShow

  toggleModalShowFunction(innerContainerName, ...args) {
    if (stateStore.modalContainerStateSet !== undefined) {
      console.log("toggleModalShow")
      console.log(`${JSON.stringify(stateStore)}`)
      alert(`${innerContainerName} modal On! args=${args}`)
      stateStore.modalContainerStateSet.setState(innerContainerName,...args)
    }
  }

  makeJsx() {
    console.log('makeJsx() of ')
    return (<>
        <ModalContainer></ModalContainer>
        <Dashboard toggleModalShowing={this.toggleModalShowFunction} userType={this.userType}>
        </Dashboard>
      </>)
  }

  render() {
    return (this.makeJsx())
  }
}
