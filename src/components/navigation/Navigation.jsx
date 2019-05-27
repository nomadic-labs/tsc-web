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

const isClient = typeof window !== 'undefined';


class Navigation extends React.Component {
  state = { sticky: false }

  componentDidMount() {
    if (isClient) {
      window.addEventListener('scroll', this.setStickyHeader);
    }
  }

  componentWillUnmount() {
    if (isClient) window.removeEventListener('scroll', this.setStickyHeader);
  }

  setStickyHeader = () => {
    this.setState({ sticky: (window.scrollY > 100) });
  }

  render() {
    return (
      <header>
        <div id="sticky-header" className={`header-transparent d-none d-lg-block ${this.state.sticky ? 'sticky' : ''}`}>
            <div className="container">
                <div className="row justify-content-space-between">
                    <div className="col-xl-5 col-lg-5">
                        <div className="main-menu">
                            <nav>
                                <ul className="text-left">
                                    <li><Link to="/about">About Us</Link></li>
                                    <li><Link to="/program">Program & Referrals</Link></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-2 d-flex align-items-stretch">
                        <div className="header-logo text-left text-lg-center">
                            <Link to="/">
                              <img src={logo} alt="Trinity Square Cafe" />
                            </Link>
                        </div>
                    </div>
                    <div className="col-xl-5 col-lg-5">
                        <div className="main-menu">
                            <nav>
                                <ul className="text-right">
                                    <li><Link to="/cafe">Cafe</Link></li>
                                    <li><Link to="/cafe/#location-hours">Location & Hours</Link></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <nav id="sticky-header" className={`navbar navbar-expand-lg navbar-dark d-flex d-lg-none ${this.state.sticky ? 'sticky' : ''}`}>
        <Link to="/" className="navbar-brand">
          <img src={logo} alt="Trinity Square Cafe" style={{ maxHeight: "40px" }} />
        </Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link className="nav-item nav-link" to="/about">About Us</Link>
              <Link className="nav-item nav-link" to="/program">Program & Referrals</Link>
              <Link className="nav-item nav-link" to="/cafe">Cafe</Link>
              <Link className="nav-item nav-link" to="/cafe/#location-hours">Location & Hours</Link>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}

export default Navigation;
