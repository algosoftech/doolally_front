import React, { Component } from "react";
import Slider from "react-slick";



export default class foodOrderBanner extends Component {
    render() {
      const settings = {
        dots: false,
        autoplay: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1
      };
      return (
  
  <div>
          <Slider {...settings}>
          <div>
    
          <div className="slideHangOut">
<div className="d_product_box ">

    <figure className="d_product_img mb-0" >

        <img src={process.env.PUBLIC_URL + "/images/w6.jpg"} alt=""/>
    </figure>

    <p className="d_product_title">Evening</p>

    <a  className="d_overlay">

        <p>Explore more</p>

    </a>
</div>
</div>
  
  
            </div>
            <div className="slideHangOut">
          
            <div className="d_product_box ">

<figure className="d_product_img mb-0" >

    <img src={process.env.PUBLIC_URL + "/images/wh3.jpeg"} alt=""/>
</figure>

<p className="d_product_title">English Breakfast</p>

<a  className="d_overlay">

    <p>Explore more</p>

</a>
</div>
            </div>
            <div className="slideHangOut">
            <div className="d_product_box ">

<figure className="d_product_img mb-0" >

    <img src={process.env.PUBLIC_URL + "/images/w4.jpg"} alt=""/>
</figure>

<p className="d_product_title">Hefeweizen</p>

<a  className="d_overlay">

    <p>Explore more</p>

</a>
</div>
  
            </div>
            </Slider>
            </div>
  
      );
    }
  }




 