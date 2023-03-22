import React, { Component } from "react";
import Slider from "react-slick";
// import './tesq.css';

class Review extends Component {
  render() {
    const settings = {
      dots: false,
      autoplay: false,
      infinite: true,
      speed: 2000,
      slidesToShow: 1.5,
      slidesToScroll: 0.5,
      rtl: false,
      cssEase: "linear",
      arrows: false,
      initialSlide: 1.5,
    };
    return (
      <div>
        <Slider {...settings}>
          <div>
            <div className="review_mobile_view poppins">
              <p
                style={{
                  padding: "5%",
                  color: "# 5b5b5b",
                  opacity: "100%",
                  height: "166px",
                }}
              >
                Some quick example text to build on the card title date and time
                stamp time stamp time stamp
              </p>
              <div
                className="d-flex justify-content-between"
                style={{ marginTop: "-15px" }}
              >
                <p
                  href="#"
                  style={{
                    fontStyle: "italic",
                    fontWeight: "600",
                    color: "black",
                    padding: "5%",
                    fontSize: "15px",
                  }}
                >
                  Alexender
                </p>

                <img
                  src={process.env.PUBLIC_URL + "/images/icons/quotation.png"}
                  style={{
                    width: "20px",
                    height: "15px",
                    marginTop: "-1px",
                    marginLeft: "-25px",
                  }}
                />
                <img
                  className="review_pic"
                  src={process.env.PUBLIC_URL + "/images/icons/user2.jpg"}
                  alt="Card image cap"
                  style={{ marginRight: "8px" }}
                />
              </div>
            </div>
          </div>

          <div>
            <div className="review_mobile_view poppins">
              <p
                style={{
                  padding: "5%",
                  color: "# 5b5b5b",
                  opacity: "100%",
                  height: "166px",
                }}
              >
                Some quick example text to build on the card title date and time
                stamp time stamp time stamp
              </p>
              <div
                className="d-flex justify-content-between"
                style={{ marginTop: "-15px" }}
              >
                <p
                  href="#"
                  style={{
                    fontStyle: "italic",
                    fontWeight: "600",
                    color: "black",
                    padding: "5%",
                    fontSize: "15px",
                  }}
                >
                  Alexender
                </p>

                <img
                  src={process.env.PUBLIC_URL + "/images/icons/quotation.png"}
                  style={{
                    width: "20px",
                    height: "15px",
                    marginTop: "-1px",
                    marginLeft: "-25px",
                  }}
                />
                <img
                  className="review_pic"
                  src={process.env.PUBLIC_URL + "/images/icons/user2.jpg"}
                  alt="Card image cap"
                  style={{ marginRight: "8px" }}
                />
              </div>
            </div>
          </div>

          <div>
            <div className="review_mobile_view poppins">
              <p
                style={{
                  padding: "5%",
                  color: "# 5b5b5b",
                  opacity: "100%",
                  height: "166px",
                }}
              >
                Some quick example text to build on the card title date and time
                stamp time stamp time stamp
              </p>
              <div
                className="d-flex justify-content-between"
                style={{ marginTop: "-15px" }}
              >
                <p
                  href="#"
                  style={{
                    fontStyle: "italic",
                    fontWeight: "600",
                    color: "black",
                    padding: "5%",
                    fontSize: "15px",
                  }}
                >
                  Alexender
                </p>

                <img
                  src={process.env.PUBLIC_URL + "/images/icons/quotation.png"}
                  style={{
                    width: "20px",
                    height: "15px",
                    marginTop: "-1px",
                    marginLeft: "-25px",
                  }}
                />
                <img
                  className="review_pic"
                  src={process.env.PUBLIC_URL + "/images/icons/user2.jpg"}
                  alt="Card image cap"
                  style={{ marginRight: "8px" }}
                />
              </div>
            </div>
          </div>

          {/* <div>
<div className="review_mobile_view poppins">
  <p style={{padding:"5%", color:"# 5b5b5b"}}>
  Some quick example text to build on the card title date and time stamp time stamp time stamp , referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable
  </p>
  <div className="d-flex justify-content-between">

  <p href="#"  style={{fontStyle: "italic", fontWeight:"600",color:"black", padding:"5%"}}>Alexender</p>

  <img  src={process.env.PUBLIC_URL + "/images/icons/quotation.png"} style={{width:"20px", height:"15px", marginTop:"-1px"}}/>
  <img className="review_pic" src={process.env.PUBLIC_URL + "/images/icons/user2.jpg"} alt="Card image cap" />


  </div>
</div>

</div> */}

          {/* <div>
<div className="review_mobile_view poppins">
  <p style={{padding:"5%", color:"# 5b5b5b"}}>
  Some quick example text to build on the card title date and time stamp time stamp time stamp , referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable
  </p>
  <div className="d-flex justify-content-between">

  <p href="#"  style={{fontStyle: "italic", fontWeight:"600",color:"black", padding:"5%"}}>Alexender</p>

  <img  src={process.env.PUBLIC_URL + "/images/icons/quotation.png"} style={{width:"20px", height:"15px", marginTop:"-1px"}}/>
  <img className="review_pic" src={process.env.PUBLIC_URL + "/images/icons/user3.jpg"} alt="Card image cap" />


  </div>
</div>

</div> */}

          {/* <div >
        <div class="card col-4" id="testimonial-desktop"style={{width: "13rem"}}>
 
 <div class="card-body">
  
  
   <p class="card-text poppins">Some quick example text to build on the card title date and time stamp time stamp time stamp , referring/exit pages, and possibly the number of clicks.  </p>
   <a href="#" class="btn btn-primar poppins" style={{fontStyle: "italic", fontWeight:"600"}}>Alexender</a>
   <img className="review_pic" src={process.env.PUBLIC_URL + "/images/review.jpg"} alt="Card image cap" />
             
 </div>

 
</div>
</div> */}

          {/* <div>
        <div class="card col-4" id="testimonial-desktop"style={{width: "12rem"}}>
 
 <div class="card-body">
   <h5 class="card-title">"</h5>
  
   <p class="card-text">Some quick example text to build on the card title date and time stamp time stamp time stamp , referring/exit pages, and possibly the number of clicks.  </p>
   <a href="#" class="btn btn-primar">Alizender</a>
   <img className="review_pic" src={process.env.PUBLIC_URL + "/images/review.jpg"} alt="Card image cap" />
             
 </div>

 
</div>
</div> */}
          {/* <div>
<div class="card col-4" id="testimonial-desktop"style={{width: "12rem"}}>
 
 <div class="card-body">
   <h5 class="card-title">"</h5>
  
   <p class="card-text">Some quick example text to build on the card title date and time stamp time stamp time stamp , referring/exit pages, and possibly the number of clicks.  </p>
   <a href="#" class="btn btn-primar">Alizender</a>
   <img className="review_pic" src={process.env.PUBLIC_URL + "/images/review.jpg"} alt="Card image cap" />
             
 </div>
</div>
 </div> */}
        </Slider>
      </div>
    );
  }
}
export default Review;
