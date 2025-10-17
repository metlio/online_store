import React from "react";
//import headerImg from '../../assets/av.jpg'
import { ReactComponent as Logotyp } from "../sv.svg";
import styles from './Header.module.css';
//import HeaderCartButton from "./HeaderCartButton";

const Footer = ({ isAnimated, isVisible }) => {

    const footerStyles = isAnimated ? {
        position: 'fixed',
        bottom: isVisible ? 0 : '-100%',
        left: 0,
        width: '100%',
        zIndex: 10,
        backgroundColor: '#0b0b0b',
        transition: 'bottom 0.5s ease-in-out'
    } : {
        width: '100%',
        zIndex: 10,
        backgroundColor: '#0b0b0b'
    };

    return <React.Fragment>
<footer style={footerStyles} className="text-center text-lg-start text-muted">

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
            {/* <NewComponent /> */}
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
            Библиотеки
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
            <a href="#!" className="text-reset">Admin Panel</a>
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
          <p><i className="fas fa-home me-3 text-secondary"></i> Rostov-on-Don, RO 344000, RU</p>
          <p>
            <i className="fas fa-envelope me-3 text-secondary"></i>
            yad@yadde.ru
          </p>
          <p><i className="fas fa-phone me-3 text-secondary"></i> + 7 951 546 29 29</p>
          <p><i className="fas fa-print me-3 text-secondary"></i> + 8 234 567 89</p>
        </div>
      </div>
    </div>
  </section>
  <div className="text-center p-4">
    © 2025 Copyright
    <a className="p-2 text-reset fw-bold" href="#">SLLC</a>
  </div>
</footer>
    </React.Fragment>
}

export default Footer;
