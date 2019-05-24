import React from "react";
import Container from "./Container";
import { Link } from "gatsby";
import logo from "../../assets/images/tsc-logo.svg"

export default (props) => {
  return (
    <footer id="location-hours">
        <div className="footer-area pt-60 pb-40 bg-primary-light">
            <div className="container">
                <div className="row">
                    <div className="col-xl-3 col-lg-3 col-md-6">
                        <div className="footer-wrapper mb-30">
                            <div className="footer-logo">
                                <Link to="/"><img src={logo} alt="Trinity Square Cafe" className="img-fluid" /></Link>
                            </div>
                            <div className="footer-text">
                                <p>We help people recovering from serious mental illness live full lives by building key skills in a respectful, supportive community.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-6">
                        <div className="footer-wrapper pl-40 mb-30">
                            <div className="footer-title">
                                <h4>Cafe Hours</h4>
                            </div>
                            <ul className="fotter-menu">
                                <li>Monday: 11:00am - 2:30pm</li>
                                <li>Tuesday: 11:00am - 2:30pm</li>
                                <li>Wednesday: 11:00am - 2:30pm</li>
                                <li>Thursday: 11:00am - 2:30pm</li>
                                <li>Friday: 11:00am - 2:30pm</li>
                                <li>Saturday: Closed</li>
                                <li>Sunday: Closed</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-6">
                        <div className="footer-wrapper pl-35 mb-30">
                            <div className="footer-title">
                                <h4>Contact Info</h4>
                            </div>
                            <ul className="fotter-link">
                                <li>
                                    <h5><i className="far fa-paper-plane"></i> Location</h5>
                                    <p>19 Trinity Square, Toronto, ON</p>
                                </li>
                                <li>
                                    <h5><i className="far fa-envelope-open"></i> Email us</h5>
                                    <p>hello@trinitysquarecafe.ca</p>
                                </li>
                                <li>
                                    <h5><i className="fas fa-headphones"></i> Call Us</h5>
                                    <p>(416) 598-2010</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-6">
                        <div className="footer-wrapper pl-35 mb-30">
                            <div className="footer-title">
                                <h4>Support Us</h4>
                            </div>
                            <ul className="fotter-link">
                                <li>
                                    <a href=""><i className="fab fa-paypal"></i> Make a donation</a>
                                </li>
                                <li>
                                    <a href=""><i className="fab fa-instagram"></i> Follow us on Instagram</a>
                                </li>
                                <li>
                                    <a href=""><i className="fab fa-yelp"></i> Leave us a review</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
  );
};


