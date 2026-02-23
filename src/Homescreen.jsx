import React from 'react'
import { Navbar, Nav, Tab, Row, Col, Button, Container, Image } from 'react-bootstrap'
import { FaArrowRight } from "react-icons/fa";


function Homescreen() {
  return (
    <div className='h-100 mw-100' style={{
        backgroundImage: `url("https://res.cloudinary.com/dgjbvgwiv/image/upload/v1771746626/sided-view-hand-filling-document_66_lwkdoc.jpg")`,
        backgroundRepeat:'no-repeat',
        backgroundSize: "cover",
        height: '100vh',
        width: '100vw',
        overflowX:'hidden'
    }}>
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            zIndex:0
        }} />
            <Navbar style={{height:'60px', width:'100vw', backgroundColor:'rgba(0, 0, 0, 0.5)', borderBottom:'none', position: 'relative', 
    zIndex: 1  }}>
                <Container className='py-2'>
                <Navbar.Brand> 
                        <Image src="https://res.cloudinary.com/dgjbvgwiv/image/upload/v1771749230/2224becb-5b0b-45ee-a370-61053f8e71cb_zbbm9l.png" 
                        style={{height: '50px', width: '70px'}}
                        />
                    </Navbar.Brand>
                    
                    <Nav style={{color:'white', justifyContent:'center', width:'100%', gap:'20px'}} className='me-auto'>

                        <Nav.Link style={{
                            color: 'white', 
                            fontSize: '20px',
                        }}>About</Nav.Link>
                        <Nav.Link style={{
                            color: 'white', 
                            fontSize: '20px',
                        }}>Features</Nav.Link>
                        <Nav.Link style={{
                            color: 'white', 
                            fontSize: '20px',
                        }}>Contact Us</Nav.Link>

                    </Nav>
                </Container>
                
            </Navbar>

            <Col style={{
                height:'calc(100vh - 60px)',
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
                position: 'relative', 
                zIndex: 1  

            }}>
                <div>
                    <h1 style={{display:'flex',flexDirection:'column',justifyContent:'center' ,color:'white', fontWeight:'bold', textShadow: '2px 2px black', textAlign:'center'}}>Predicting Floods,
                    <br />
                        Protecting Barangays</h1>
                    <p className='my-4'style={{color:'white', textAlign:'center', textShadow: '2px 2px black',fontSize:'20px'}}>A data-driven flood monitoring and forecasting system</p>
                    <div style={{display:'flex',justifyContent:'center'}}>
                        <Button href="/login" variant='outline-primary' size='lg' style={{color:'white', width:'300px', borderRadius:'24px', borderWidth:'1px'}}>
                            Login <FaArrowRight />

                        </Button>
                    </div>
                </div>
            </Col>
 
            

    </div>
  )
}

export default Homescreen