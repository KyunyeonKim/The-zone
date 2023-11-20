import React, {Component} from 'react';
import {stateStore} from "../index";

class ModalContainer extends Component {
  constructor() {
    super();
    console.log(`ModalContainer constructor`)
    this.state = {
      modalShow : false,
      innerContainerName : '',
    }
    stateStore.push(this.state)
    function closeModal(innerContainerName){
      this.setState({
        modalShow : !this.state.modalShow,
        innerContainerName : innerContainerName,
      })
    }
    stateStore.push(closeModal.bind(this))
    this.toggleModal=closeModal.bind(this)
  }

  toggleModal;

  render() {
    let innerContainerName = this.state.innerContainerName
    let close = this.toggleModal
    const modalStyle = {
      overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0, 0, 0, 0.5)', // 반투명한 배경
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000, // 모달이 상위에 나타나도록 함
      },
      content: {
        background: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
        position: 'relative',
        zIndex: 1001, // 모달 내용이 상위에 나타나도록 함
      },
      close: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        fontSize: '20px',
        cursor: 'pointer',
      },
    };

    if(this.state.modalShow){
      console.log(`modal Toggled. current status : ${this.state.modalShow}`)
      return (
          <div>
            <div style={modalStyle.overlay} className="modal">
              <div style={modalStyle.content} className="modal-content">
              <span style={modalStyle.close} className="close" onClick={close}>&times;</span>
                  <p>This is {innerContainerName} the modal content.</p>
                </div>
              </div>
          </div>
        );
    }
    return <></>
  }
}

export default ModalContainer;
