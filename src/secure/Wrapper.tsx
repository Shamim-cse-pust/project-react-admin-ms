import React, { Component } from 'react'
import Nav from './components/Nav'
import Menu from './components/Menu'
import axios from 'axios'
import { Navigate } from 'react-router-dom'
export default class Wrapper extends Component {

  state = {
      redirect: false
  }
  componentDidMount = async () => {
      try {
          const response = await axios.get('profile');
          console.log(response);
      } catch {
          this.setState({
              redirect: true
          })
      }
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to={'/login'}/>;
    }
    return (
      <>
        <Nav/>
        <div className="container-fluid">
          <div className="row">
            <Menu />
            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
                {this.props.children}
            </main>
          </div>
        </div>
      </>
    )
  }
}
