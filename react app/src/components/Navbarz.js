import React from "react"
import { Nav, Navbar } from 'react-bootstrap';
import styled from 'styled-components';



const Styles = styled.div`
  .navbar{
      background-color: #242424;
  }
  a, .navbar-brand, .navbar-nav .nav-link {
      color: white;
      &:hover {
        color: white;
      }
    }
  `;
export default function Navbarz() {

  return (
    <>
      <Styles>
        <Navbar expand="lg">
          <Navbar.Brand href="/">
            <img
              alt=""
              src="./icn.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}Googol Pois
                  </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Item>
                <Nav.Link href="/">Home</Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link href="/login">Login/Logout</Nav.Link>
              </Nav.Item>
              {/* <Nav.Item>
                  <Nav.Link href="/reg">Register</Nav.Link>
                </Nav.Item> */}

              <Nav.Item>
                <Nav.Link href="/Profile">Profile</Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link href="/Canvas">Map</Nav.Link>
              </Nav.Item>

            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Styles>
    </>
  )


}