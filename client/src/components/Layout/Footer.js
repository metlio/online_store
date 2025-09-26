import React from "react";
import { ReactComponent as Logotyp } from "../sv.svg";
import styles from './Header.module.css';

const Footer = () => {
    // Simplified footer with fixed positioning at the bottom.
    // The zIndex ensures it stays on top of other content.
    const footerStyle = {
        width: '100%',
        position: 'fixed',
        bottom: '0',
        left: '0',
        zIndex: '1000', // High z-index to ensure it's on top
        backgroundColor: '#0b0b0b'
    };

    return (
        <footer style={footerStyle} className="text-center text-lg-start text-muted">
          <section className="d-flex justify-content-center justify-content-lg-between p-0">
            <div>
              <a href="" className="me-4 link-secondary">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="" className="me-4 link-secondary">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="" className="me-4 link-secondary">
                <i className="fab fa-google"></i>
              </a>
              <a href="" className="me-4 link-secondary">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="" className="me-4 link-secondary">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="" className="me-4 link-secondary">
                <i className="fab fa-github"></i>
              </a>
            </div>
          </section>
          <section className="">
            <div className="container text-center text-md-start mt-5">
              <div className="row mt-3">
                <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                  <h6 className="text-uppercase fw-bold mb-4">
                    <div style={{backgroundColor:'#0b0b0b', display:'flex',height:'5rem', justifyContent:'flex-start', alignItems:'center'}}>
                      <div style={{width:'50px'}}>
                        <Logotyp />
                      </div>
                    </div>
                  </h6>
                  <p style={{fontSize:'0.7rem', textAlign:'left'}}>
                    <b>Here you can use rows and columns to organize your footer content.</b> Lorem ipsum
                    dolor sit amet, consectetur adipisicing elit.
                    <br />
                    <br />
                    Lorem ipsum \n
                    dolor sit amet, consectetur adipisicing elit.
                  </p>
                </div>
                <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                  <h6 className="text-uppercase fw-bold mb-4">
                    Товары
                  </h6>
                  <p>
                    <a href="#!" className="text-reset">Angular</a>
                  </p>
                  <p>
                    <a href="#!" className="text-reset">React</a>
                  </p>
                  <p>
                    <a href="#!" className="text-reset">Vue</a>
                  </p>
                  <p>
                    <a href="#!" className="text-reset">Laravel</a>
                  </p>
                </div>
                <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                  <h6 className="text-uppercase fw-bold mb-4">
                    Ссылки
                  </h6>
                  <p>
                    <a href="#!" className="text-reset">Pricing</a>
                  </p>
                  <p>
                    <a href="#!" className="text-reset">Settings</a>
                  </p>
                  <p>
                    <a href="#!" className="text-reset">Orders</a>
                  </p>
                  <p>
                    <a href="#!" className="text-reset">Help</a>
                  </p>
                </div>
                <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                  <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                  <p><i className="fas fa-home me-3 text-secondary"></i> New York, NY 10012, US</p>
                  <p>
                    <i className="fas fa-envelope me-3 text-secondary"></i>
                    info@example.com
                  </p>
                  <p><i className="fas fa-phone me-3 text-secondary"></i> + 01 234 567 88</p>
                  <p><i className="fas fa-print me-3 text-secondary"></i> + 01 234 567 89</p>
                </div>
              </div>
            </div>
          </section>
          <div className="text-center p-4">
            © 2023 Copyright
            <a className="p-2 text-reset fw-bold" href="#">SLLC</a>
          </div>
        </footer>
    );
};

export default Footer;