import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';

import {
  Dropdown,
} from '../../components';

const listDropdowns = [
  {
    name: 'Name 1'
  },
  {
    name: 'Name 2',
  },
  {
    name: 'Name 3',
  },
  {
    name: 'Name 4'
  },
];

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: listDropdowns,
      modal: false,
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    // this.setState({
    //   modal: !this.state.modal
    // });
    this.props.changeStateModal();
  }

  isContentDropdown = (item, index) => {
    const users = [...this.state.users];
    users[index].isOpen = !users[index].isOpen;
    console.log('Users', users);
    this.setState({
      users,
    });
  }

  addUser = () => {
    // console.log('Add USER click', this.props);
    this.props.addUser(this.userInput.value);
    this.userInput.value = '';
  }

  deleteUser = () => {
    this.props.deleteUser(this.deleteInput.value);
    this.deleteInput.value = '';
  }

  render() {
    console.log('-------', this.props.isOpenModal);
    return (
      <div className='about'>
        <div className="about__header">
          <h1>About Page</h1>
        </div>
        <input type='text' ref={(input) => {this.deleteInput = input}} />
        <button onClick={this.deleteUser}>Удалить пользователя</button>
        <div className="about__content">
        <div>
          <Button color="danger" onClick={this.toggle}>Добавить пользователя</Button>
          <Modal isOpen={this.props.isOpenModal} toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle}>Заполните поля</ModalHeader>
            <ModalBody>
            <input type='text' ref={(input) => {this.userInput = input}} />
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={() => {this.toggle();this.addUser()}}>Do Something</Button>{' '}
              <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
          </Modal>
      </div>
          <div className="wrapDropDown">
            {
              this.props.users.map((item, index) => {
                return (
                  <Dropdown
                    key={index}
                    isOpenDropdown={item.isOpen}
                    isContentDropdown={() => this.isContentDropdown(item, index)}
                    title={item}
                  />
                );
              })
            }
          </div>
        </div>
      </div>
    );
  }
}
// function MapStateToProps(state) {
//   return {
//     testStore: state.users,
//   }
// }

export default connect(
  state => ({
    users: state.users,
    isOpenModal: state.modal,
  }),
  dispatch => ({
    addUser: (userName) => {
      dispatch({ type: 'ADD_USER', usersName: userName })
    },
    deleteUser: (userName) => {
      dispatch({ type: 'DELETE_USER', usersName: userName })
    },
      changeStateModal: () => {
        dispatch({ type: 'IS_OPEN_MODAL'})
    },
  })
)(About);