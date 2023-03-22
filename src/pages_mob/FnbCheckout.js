import React, { useState ,useEffect} from "react";

import Footer from "./Footer";

import Header from "../Header";


const FnbCheckout=()=>{

    const [couponOffer,setCouponOffer]=useState([]);

    
    useEffect(()=>{
        getData();
    })
    const getData= async()=>{
        // here Api call for fnb checkout
        let result=await fetch('http//localhost:3000/fnbcheckout');
        result=await result.json();
        setCouponOffer(result.dataforCouponSection);
      
    }
    return(<>

<Header/>
     <section class="d_main_panel checkout_page mb-4 pb-4 d_margin">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-3 d-flex mb-lg-0 mb-4">
                    <div class="d_left_panal box_padding gray_bg_color coupon_panel w-100">
                        <div class="d_title_box">
                            <h3 class="d_main_title">Doolally coupon & offer</h3>
                        </div>
{couponOffer.map((item,key)=>




                        <div class="d_right_panal">
                            <div class="d_order_summry">
                                <div class="d_sub_total d-flex align-items-center box_padding d_order_border_btm">
                                    <div class="d_card_icon position-relative">
                                        <img src={item.image}alt=""/>
                                    </div>
                                    <div class="d_sub_total_cnt text-start">
                                        <h5><span>{item.discount}</span></h5>
                                        <p class="member">{item.member}</p>
                                    </div>
                                </div>
                                <div class="coupon_code">
                                    <span class="poppins">copy code: {item.discountCode}</span>
                                </div>
                            </div>
                        </div>

)}
                        


                    </div>
                </div>
                <div class="col-lg-6 d-flex mb-lg-0 mb-4">
                    <div class="gray_bg_color box_padding w-100">
                        <div class="d_add_new_product d_right_panal mb-3">
                            <div class="d_order_summry">
                                <div class="d_sub_total d-flex align-items-center box_padding d_order_border_btm">
                                    <div class="d_title_box mb-0">
                                        <h3 class="d_main_title mb-0">Address Details</h3>
                                    </div>
                                </div>
                                <div class="box_padding">
                                    <div class="row">
                                        <div class="col-md-2 poppins">
                                            <label class="d_custome_raido"><span class="d_paid monster">Home</span>
                                                <input type="radio" checked="checked" name="radio"/>
                                                <span class="checkmark"></span>
                                            </label>
                                        </div>
                                        <div class="col-md-10 poppins">
                                            <label class="d_custome_raido"><span class="d_paid monster">Office</span>
                                                <input type="radio" name="radio"/>
                                                <span class="checkmark"></span>
                                            </label>
                                        </div>
                                        <div class="col-md-12 poppins">
                                            <div class="form-group">
                     <input type="text" class="form-control p_gray" id="formGroupExampleInput" placeholder="G13, Sector-6, Noida (U.P.) 201301"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="d_add_new_product d_right_panal mb-3">
                            <div class="d_order_summry">
                                <div class="d_sub_total d-flex align-items-center box_padding d_order_border_btm">
                                    <div class="d_title_box mb-0">
                                        <h3 class="d_main_title mb-0">You have any offers</h3>
                                    </div>
                                </div>
                                <div class="box_padding">
                                    <div class="row">
                                        <div class="col-md-12 poppins">
                                            <div class="form-group input-group redeem_code">
                                                <input type="text" class="form-control p_gray" id="formGroupExampleInput" placeholder="Enter your promo code"/>                  <button class="btn btn-outline-secondary" type="button">Redeem</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="d_add_new_product d_right_panal">
                            <div class="d_order_summry">
                                <div class="d_sub_total d-flex align-items-center box_padding d_order_border_btm">
                                    <div class="d_title_box mb-0">
                                        <h3 class="d_main_title mb-0">Payment options</h3>
                                    </div>
                                </div>
                                <div class="box_padding">
                                    <div class="poppins">
                                        <label class="d_custome_raido"><span class="d_paid monster">Credit Card/Debit
                                                Card/Netbanking (Razorpay)</span>
                                            <input type="radio" name="radio"/>
                                            <span class="checkmark"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 d-flex mb-4 pb-4">
                    <div class="d_add_new_product d_right_panal w-100">
                        <div class="d_order_summry">
                            <div class="d_sub_total d-flex align-items-center box_padding d_order_border_btm">

                                <div class="d_title_box mb-0">
                                    <h3 class="d_main_title mb-0">Product Summary</h3>
                                </div>
                            </div>
                            <div class="box_padding check_out_table">
                                <table class="table table-borderless mb-0">
                                    <tbody>
                                        <tr>
                                            <td class="d_total_name">Total item</td>
                                            <td class="text-end"><strong>03</strong></td>

                                        </tr>
                                        <tr>
                                            <td class="d_total_name">Subtotal</td>
                                            <td class="text-end"><strong>Rs.1500.00</strong></td>
                                        </tr>
                                        <tr>
                                            <td class="d_total_name">Delivery Charges</td>
                                            <td class="text-end"><strong>Rs 100.00</strong></td>
                                        </tr>
                                        <tr>
                                            <td class="d_total_name">Round off</td>
                                            <td class="text-end"><strong>Rs 0.00</strong></td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                            <div class="box_padding check_out_table grand_total">
                                <table class="table table-borderless mb-0">
                                    <tbody>
                                        <tr>
                                            <td class="d_total_name">Grand Total</td>
                                            <td class="text-end"><strong>Rs.1600.00</strong></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="box_padding pb-0">
                                <p class="p_gray monster extra_charges">Extra charges may apply</p>
                                <div class="form-group">
                                    <textarea class="form-control p_gray d_textarea monster" id="exampleFormControlTextarea1" rows="3" placeholder="Information about your order."></textarea>
                                </div>
                            </div>

                            <div class="box_padding">
                                <div class="d_comn_btn d-block" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Continue to Checkout</div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
<Footer/>

    </>);
}
export default FnbCheckout;