import React from 'react';
import Footer from '../layout/Footer';
import Nav from '../layout/Nav';
import { Link } from 'react-router-dom';

const About = () => {
  return <div>
      <Nav/>
      <section class="text-center container mx-auto">
        <div class="row py-lg-5">
          <div class="col-lg-8 col-md-10 mx-auto">
            <h1 class="fw-light">About Our Company</h1>
            <p class="lead text-muted text-wrap-wrap">...................................................................................................................................................................................................................................................................................... </p>
            <p>
              <Link to="/signup" class="btn btn-primary my-2">Sign up now.</Link>
              <Link to="/signin" class="btn btn-secondary my-2">Continue to login page.</Link>
            </p>
          </div>
        </div>
      </section>
    <div class="container mb-5 mx-auto">
        <h1 class="fw-light text-center mb-4">Our Team</h1>
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 ">
            <div class="col">
                <div class="card shadow-sm text-center">
                    <img src={2} class="rounded-circle mt-3 mx-auto" style={{'height':' 300px', 'width': '90%'}}/>
                        

                    <div class="card-body">
                        <div class="card-title h3">Mr. abc abc</div>
                        <p class="card-text">MD,  Co.</p>
                        <div class="d-flex justify-content-between align-items-center">
                            
                        </div>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card shadow-sm text-center">
                    <img src={1 } class="rounded-circle mt-3 mx-auto" style={{'height':' 300px', 'width': '90%'}}/>
                        

                    <div class="card-body">
                        <div class="card-title h3">Mr. abc abc</div>
                        <p class="card-text">CEO,  Co.</p>
                        <div class="d-flex justify-content-between align-items-center">
                            
                        </div>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card shadow-sm text-center">
                    <img src={ 1} class="rounded-circle mt-3 mx-auto" style={{'height':' 300px', 'width': '90%'}}/>
                        

                    <div class="card-body">
                        <div class="card-title h3">Mr. abc abc</div>
                        <p class="card-text">Marketing Head,  Co.</p>
                        <div class="d-flex justify-content-between align-items-center">
                            
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
      <Footer/>
  </div>;
};

export default About;
