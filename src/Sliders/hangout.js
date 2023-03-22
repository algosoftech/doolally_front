import React, { Component } from "react";
import Slider from "react-slick";
// import './tesq.css';
import HangoutC from "../components/Sliding/hangoutC";
 class hangout extends Component {


  state = {
    display: true,
    // width: '700'
  };
  render() {
    const settings = {
        autoplay:true,
    //   dots: true,   
      arrows:false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    
    };
    return (
      <div>
        
        <div
          style={{
            width: this.state.width + "px",
            display: this.state.display ? "block" : "none"
          }}
        >
          <Slider{...settings}>
       <div> <HangoutC image={process.env.PUBLIC_URL + "/images/h5.png"} title={"Buy A Mug Club Membership" }/></div>
       <div> <HangoutC image={process.env.PUBLIC_URL + "/images/h6.png"} title={"Buy A Mug Club Membership" }/></div>
       <div> <HangoutC image={process.env.PUBLIC_URL + "/images/h9.png"} title={"Buy A Mug Club Membership" }/></div>
{/* <HangoutC image={process.env.PUBLIC_URL + "/images/h1.png"}/>
<HangoutC image={process.env.PUBLIC_URL + "/images/h1.png"}/> */}
    {/* <div class="d_product_box">
        <img src={process.env.PUBLIC_URL + "/images/h1.png"} />


        <p class="d_product_title">Craft beer and cider</p>
    </div> */}





          </Slider>
        </div>
      </div>
    );
  }
}
export default hangout;