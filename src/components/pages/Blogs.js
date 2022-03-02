import React from 'react';
import Footer from '../layout/Footer';
import Nav from '../layout/Nav';

const Blogs = () => {
  return <div>
      <Nav/>
      <div className="container p-5 mx-auto">
    <div className="blog d-flex shadow-lg p-5 my-3 blog-border">
      <div className="blog_img">
        <img src={{}} alt="" style={{'height': '200px','width': '200px','border-radius': '50%'}} />
      </div>
      <div className="blog-body p-5">
        <div className="blog-title h3">Blog Title 1</div>
        <div className="blog-content">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit aliquid enim, dolor voluptatum culpa amet excepturi fugiat voluptate expedita cumque maxime possimus ex! Doloribus a neque quidem vero, praesentium non at consectetur laudantium sapiente eum minima delectus ut velit beatae alias quos eveniet labore aliquid ducimus? Magnam quis natus placeat.
        </div>
      </div>
    </div>

    <div className="blog d-flex shadow-lg p-5 my-3 blog-border">
      <div className="blog-body p-5">
        <div className="blog-title h3">Blog Title 2</div>
        <div className="blog-content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae modi accusamus similique commodi odit sunt reprehenderit, fugit nesciunt perferendis. Officia alias iste veritatis aperiam quaerat totam laudantium veniam possimus ipsam eos, neque omnis quam voluptatum?
        </div>
      </div>
      <div className="blog_img">
      <img src={{}} alt="" style={{'height': '200px','width': '200px','border-radius': '50%'}} />
      </div>
    </div>

    <div className="blog d-flex shadow-lg p-5 my-3 blog-border">
      <div className="blog_img">
      <img src={{}} alt="" style={{'height': '200px','width': '200px','border-radius': '50%'}} />
      </div>
      <div className="blog-body p-5">
        <div className="blog-title h3">Blog Title 3</div>
        <div className="blog-content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, vitae dignissimos earum voluptas odit amet delectus sint! Est iure natus nam sit quaerat eos quia iusto magnam. Fuga voluptatibus repellendus excepturi incidunt autem neque vitae ipsa ab dolor dolores? Aliquid?
        </div>
      </div>
    </div>

    <div className="text-end custom_link">See more...</div>


  </div>
      <Footer/>
  </div>;
};

export default Blogs;
