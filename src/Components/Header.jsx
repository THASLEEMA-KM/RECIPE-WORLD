import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { Button } from 'react-bootstrap';
import logoimg from '../assets/logo1.png'

function Header() {
  const renderTooltipOne = (props) => (
    <Tooltip id="button-tooltip" {...props}>
    Add Your Recipe
    </Tooltip>
  );
  const renderTooltipTwo = (props) => (
    <Tooltip id="button-tooltip" {...props}>
   Favourites
    </Tooltip>
  );
  const renderTooltipThree = (props) => (
    <Tooltip id="button-tooltip" {...props}>
   Home
    </Tooltip>
  );
  return (
    <div>
        <Navbar expand="lg" className='bg-warning'>
            <Container >
               <Link to={'/'} style={{textDecoration:'none'}} className='fw-bolder' >
                    <Navbar.Brand style={{color:'black'}} className='fs-2 '><img
                  alt=""
                  src={logoimg}
                  width="80"
                  height="80"
                  className="d-inline-block"
                />RecipeWorld</Navbar.Brand>
               </Link>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                    {/* <Nav.Link active>Home</Nav.Link>
                    <Nav.Link active>Link</Nav.Link>
                    <Nav.Link active>Favourites</Nav.Link>
                    <NavDropdown active title="Category" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                        Another action
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">
                        Separated link
                    </NavDropdown.Item>
                    </NavDropdown> */}
                    <Nav.Link active>
                    <OverlayTrigger
                      placement="bottom"
                      delay={{ show: 250, hide: 400 }}
                      overlay={renderTooltipThree}>
                      <Link to={'/'}><Button  variant="info"><i className="fa-solid fa-home fs-4"></i></Button></Link>
                    </OverlayTrigger>
                     </Nav.Link>
                    <Nav.Link active>
                    <OverlayTrigger
                      placement="bottom"
                      delay={{ show: 250, hide: 400 }}
                      overlay={renderTooltipOne}>
                      <Link to={'/add'}><Button variant="success"><i className="fa-solid fa-plus fs-4"></i></Button></Link>
                    </OverlayTrigger>
                     </Nav.Link>
                     <Nav.Link active>
                    <OverlayTrigger
                      placement="bottom"
                      delay={{ show: 250, hide: 400 }}
                      overlay={renderTooltipTwo}>
                      <Link to={'/favourites'}><Button  variant="danger"><i className="fa-solid fa-heart fs-4"></i></Button></Link>
                    </OverlayTrigger>
                     </Nav.Link>

                    {/* <Nav.Link active>
                    <i className="fa-solid fa-heart fs-4 "></i>
                    </Nav.Link> */}
                    
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </div>
  )
}

export default Header