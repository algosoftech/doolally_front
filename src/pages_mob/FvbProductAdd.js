import React, { useState,useEffect } from 'react';
import Footer from '../pages/Footer';

import Header from '../Header';

const FvbProductAdd=()=>{

const[newExprnses,setNewExprnses]=useState([]);
const[recomendetion,setRecomendetion]=useState([]);
const[addProduct,setAddProduct]=useState([]);

useEffect(()=>{
    getData();
})
const getData= async()=>{
    // here Api call for fvb product add
    let result=await fetch('http//localhost:3000/fvbproductadd');
    result=await result.json();
    setNewExprnses(result.dataforFindNewExperinces);
    setRecomendetion(result.dataforrecomendation);
    setAddProduct(result.dataforAddproduct);
  
}

    return(<>
    <Header/>
    <section className="d_main_panel">
        <div className="container-fluid">
            <div className="row ">

                <div className="col-lg-9 mb-4 ph-none">
                    <div className="d_find_event box_padding gray_bg_color">
                        <div className="d_title_box">
                            <p className="d_main_sub_title">Find new experiences <span className="d_line"></span><span className="d_round"></span><span className="d_round"></span><span className="d_round"></span>
                            </p>
                        </div>
                        <div className="d_hangout_box">
                            <div className="d_event_expert">
                                

                                    {newExprnses.map((item,index)=>

<a >
                                    <div className="d_product_box">
                                        <figure className="d_product_img mb-0">
                                            <img src={item.image}alt=""/>
                                        </figure>
                                        <p className="d_product_title">{item.title}</p>
                                    </div>
                                </a>
                                )}
                               
                              

                            </div>
                        </div>
                    </div>
                    <div className="row ph-none">
                        <div className="col-lg-4 mb-4">
                            <div className="d_left_panal box_padding gray_bg_color">
                                <div className="d_title_box">
                                    <h3 className="d_main_title">Recommedations</h3>
                                    <p className="d_main_sub_title">Beer products <span className="d_line"></span><span className="d_round"></span><span className="d_round"></span><span className="d_round"></span>
                                    </p>
                                </div>
                                <div className="row g-3">

                                    {recomendetion.map((item,index)=>
                                    
                                    <div className="col-6">
                                        <div className="d_product_box">
                                            <figure className="d_product_img mb-0">
                                                <img src={item.image }alt=""/>
                                            </figure>
                                            <p className="d_product_title">{item.title}</p>
                                            <a  className="d_overlay">
                                                <p>Explore more</p>
                                            </a>
                                        </div>
                                    </div>

)}
                                 
                                   
                                    
                                    
                               
                                  
                                    
                             
                                </div>


                            </div>
                        </div>
                        <div className="col-lg-8 d-flex">
                            <div className="box_padding gray_bg_color">
{addProduct.map((item,index)=>

                                <div className="d_beer_product">
                                    <div className="row">
                                        <div className="col-md-3">
                                            <div className="d_beer_product_img">
                                                <figure className="mb-md-0 mb-3">
                                                    <img className="w-100" src={item.image }alt=""/>
                                                </figure>
                                                <span className="d-flex align-items-center justify-content-center"><em></em></span>
                                            </div>
                                        </div>
                                        <div className="col-md-9">
                                            <div className="d_beer_product_cnt">
                                                <h4 className="d_beer_product_cnt_title">{item.title} [1 Litre]</h4>
                                                <p className="d_beer_product_cnt_subtitle p_gray">This is what happens when your Brewmaster goes on a diet. India's first "low carb beer."</p>
                                                <div className="d-md-flex d-block align-items-md-center justify-content-md-between mt-3">
                                                    <div className="">
                                                        <p className="d_beer_product_cnt_rats p_gray">Start From <strong>Rs {item.price}</strong></p>
                                                        <div className="d_beer_product_cnt_link d_feat_event_name" >Customization available</div>
                                                    </div>
                                                    <div  className="d_comn_btn d-block d-md-inline-block mt-3">Add</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
)}
                                
                               
                             
                            </div>
                        </div>

                    </div>
                </div>
                <div className="col-lg-3">
                    <div className="d_add_new_product d_right_panal">
                        <div className="d_order_summry">
                            <div className="d_sub_total d-flex align-items-center box_padding d_order_border_btm">
                                <div className="d_card_icon position-relative">
                                    <img src={process.env.PUBLIC_URL + "/images/icons/card_icon.svg" }alt=""/>
                                    <span className="d_card_icon_count position-absolute rounded-circle start-50 translate-middle-x d-flex align-items-center justify-content-center text-center">4</span>
                                </div>
                                <h4 className="d_beer_product_cnt_title ">Your Order Summary</h4>
                            </div>
                            <div className="box_padding d_order_border_btm">
                               
                                <div className="row g-2">
                                    <div className="col-8 col-md-8">
                                        <ul className="d_order_list_name mb-0">
                                            <li>
                                                <span className="vage_curcul d-flex align-items-center justify-content-center position-relative"><em></em></span>
                                            </li>
                                            <li>
                                                <p className="poppins">Paneer Ghee Roast <br/> <span>₹500.00</span></p>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="col-4 col-md-4">
                                        <div className="g-add" id="d_btndiv9">
                                            <form className="d-flex align-items-center">
                                                <div className="form">
                                                    <div className="value-button" id="decrease" onclick="decreaseValue()" value="Decrease Value">-</div>
                                                    <input type="number" className="number" id="number" value="0" />
                                                    <div className="value-button" id="increase" onclick="increaseValue()" value="Increase Value">+</div>
                                                </div>
                                                <a  className="delete"><i className="fa fa-trash-o" aria-hidden="true"></i></a>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="box_padding d_order_border_btm">
                                <div className="row g-2">
                                    <div className="col-8 col-md-8">
                                        <ul className="d_order_list_name mb-0">
                                            <li>
                                                <span className="vage_curcul d-flex align-items-center justify-content-center position-relative"><em></em></span>
                                            </li>
                                            <li>
                                                <p className="poppins">paneer Ghee Roast <br/> <span>₹500.00</span></p>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="col-4 col-md-4">
                                        <div className="g-add" id="d_btndiv9">
                                            <form className="d-flex align-items-center">
                                                <div className="form">
                                                    <div className="value-button" id="decrease" onclick="decreaseValue()" value="Decrease Value">-</div>
                                                    <input type="number" className="number" id="number" value="0" />
                                                    <div className="value-button" id="increase" onclick="increaseValue()" value="Increase Value">+</div>
                                                </div>
                                                <a  className="delete"><i className="fa fa-trash-o" aria-hidden="true"></i></a>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="box_padding d_order_border_btm">
                                <div className="row g-2">
                                    <div className="col-8 col-md-8">
                                        <ul className="d_order_list_name mb-0">
                                            <li>
                                                <span className="vage_curcul nonvag d-flex align-items-center justify-content-center position-relative"><em></em></span>
                                            </li>
                                            <li>
                                                <p className="poppins">Smoke Large [1 litre] <br/> <span>₹500.00</span></p>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="col-4 col-md-4">
                                        <div className="g-add" id="d_btndiv9">
                                            <form className="d-flex align-items-center">
                                                <div className="form">
                                                    <div className="value-button" id="decrease" onclick="decreaseValue()" value="Decrease Value">-</div>
                                                    <input type="number" className="number" id="number" value="0" />
                                                    <div className="value-button" id="increase" onclick="increaseValue()" value="Increase Value">+</div>
                                                </div>
                                                <a  className="delete"><i className="fa fa-trash-o" aria-hidden="true"></i></a>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="box_padding d_order_border_btm">
                                <ul className="d_order_list_name mb-0 d-flex">
                                    <li>
                                        <img src={process.env.PUBLIC_URL + "/images/icons/file.svg" }alt=""/>
                                    </li>
                                    <li>
                                        <p className="monster p_gray">Write any additional information about your order </p>
                                    </li>
                                </ul>
                            </div>
                            <div className="d_sub_total_cnt text-center ">
                                    <h5>Sub Total <span>₹1500.00</span></h5>
                                    <p className="poppins">Extra charge may apply</p>
                                </div>
                            <div className="box_padding">
                                <div  className="d_comn_btn d-block" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Proceed to checkout</div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>


    {/* <!-- modal --> */}
    <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
                <div className="modal-header border-0">
                    <h5 className="modal-title text-center w-100" id="staticBackdropLabel">Customer Info Details</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body pt-0">
                    <div className="form-group mb-3">
                        <input type="text" className="form-control p_gray poppins" id="formGroupExampleInput" placeholder="Enter your name"/>
                    </div>
                    <div className="form-group">
                        <input type="number" className="form-control p_gray poppins" id="formGroupExampleInput" placeholder="Mobile number"/>
                    </div>
                    <div className="modal_btn">
                        <a  className="d_comn_btn"> Proceed to further</a>
                    </div>
                </div>

            </div>
        </div>
    </div>
    <Footer/>
  
    </>);
}
export default FvbProductAdd;