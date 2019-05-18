import React from "react";
import { Link } from "gatsby";
import logo from "../../assets/images/tsc-logo-white.svg"


const styles = {
  button: {
    padding: '6px 25px',
  },
  fullWidth: {
    width: '100%'
  }
}


class Navigation extends React.Component {

  render() {
    return (
      <header>
        <div id="sticky-header" className="header-transparent">
            <div className="container">
                <div className="row justify-content-space-between">
                    <div className="col-xl-5 col-lg-5">
                        <div className="main-menu">
                            <nav id="mobile-menu">
                                <ul className="text-left">
                                    <li><a href="/">About Us</a></li>
                                    <li><a href="/">Our Model</a></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-2 d-flex align-items-stretch">
                        <div className="header-logo text-left text-lg-center">
                            <a href="/">
                              <img src={logo} alt="Trinity Square Cafe" />
                            </a>
                        </div>
                    </div>
                    <div className="col-xl-5 col-lg-5">
                        <div className="main-menu">
                            <nav id="mobile-menu">
                                <ul className="text-right">
                                    <li><a href="/">Cafe</a></li>
                                    <li><a href="/">Location & Hours</a></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="mobile-menu"></div>
                    </div>
                </div>
            </div>
        </div>
      </header>
    );
  }
}

export default Navigation;
