import React from "react";
import { ReactComponent as Logotyp } from "../sv.svg";

const Footer = () => {

    const footerStyles = {
        width: '100%',
        backgroundColor: '#0b0b0b',
        color: 'white',
        padding: '6rem 0 3rem 0',
        fontFamily: "'Inter', sans-serif"
    };

    return <React.Fragment>
<style>{`
    .footer-logo path {
        fill: white !important;
        stroke: none !important;
    }
`}</style>
<footer style={footerStyles} className="text-center text-lg-start">
  <section className="">
    <div className="container text-center text-md-start">
      <div className="row">
        <div className="col-md-6 col-lg-5 col-xl-4 mb-4 text-start">
          <div style={{ marginBottom: '2rem' }}>
             <Logotyp className="footer-logo" style={{ width: '60px', height: 'auto' }} />
          </div>
          <h2 style={{ color: 'white', fontWeight: 700, fontSize: '3.5rem', lineHeight: 1, marginBottom: '2rem', letterSpacing: '-0.02em' }}>
            REAL ALWAYS WINS
          </h2>
          <p style={{ color: '#888', fontSize: '1rem', maxWidth: '350px', lineHeight: 1.5 }}>
            Будьте в курсе. Узнавайте первыми о наших последних работах, интересных обновлениях и обо всем остальном.
          </p>
        </div>

        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4 text-start">
          <h6 className="text-uppercase fw-bold mb-4" style={{ color: '#444', fontSize: '0.75rem', letterSpacing: '0.1em' }}>
            (СОЦСЕТИ)
          </h6>
          <p><a href="#!" className="text-reset" style={{ textDecoration: 'none', fontSize: '1.1rem', fontWeight: 500 }}>INSTAGRAM</a></p>
          <p><a href="#!" className="text-reset" style={{ textDecoration: 'none', fontSize: '1.1rem', fontWeight: 500 }}>VIMEO</a></p>
          <p><a href="#!" className="text-reset" style={{ textDecoration: 'none', fontSize: '1.1rem', fontWeight: 500 }}>FACEBOOK</a></p>
        </div>

        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4 text-start">
          <h6 className="text-uppercase fw-bold mb-4" style={{ color: '#444', fontSize: '0.75rem', letterSpacing: '0.1em' }}>
            (КОНТАКТЫ)
          </h6>
          <p><a href="mailto:yad@yadde.ru" className="text-reset" style={{ textDecoration: 'none', fontSize: '1.1rem', fontWeight: 500 }}>YAD@YADDE.RU</a></p>
          <p style={{ color: 'white', fontSize: '1.1rem', fontWeight: 500 }}>РОСТОВ-НА-ДОНУ, РФ</p>
        </div>
      </div>
    </div>
  </section>
  <div className="container mt-5 pt-5" style={{ borderTop: '1px solid #222' }}>
    <div className="d-flex justify-content-between align-items-center" style={{ color: '#444', fontSize: '0.8rem' }}>
        <div>© 2025 SLLC</div>
        <div className="text-uppercase">Креативная продакшн-компания</div>
    </div>
  </div>
</footer>
    </React.Fragment>
}

export default Footer;
