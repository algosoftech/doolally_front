import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import Header from "../Header";

const Menu=()=>{

const [activeClass , setActiveClass] = useState(false);
const [cartItems, setCartItems] = useState(1);

const onAdd = () => {

    
    // const exist = cartItems.find((series) => series.id === product.id);
    // if (exist) {
    //   setCartItems(
    //     cartItems.map((series) =>
    //       series.id === product.id ? { ...exist, qty: exist.qty + 1 } : series
    //     )
    //   );
    // } else {
setCartItems( cartItems + 1)
    //   setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
//   };

const handleActiveClass=()=>{
    setActiveClass(activeClass=>!activeClass);
}
let activeClassCheck=activeClass? 'active' : " "; 


// through javaScript
// var header = document.getElementById("category_scrollspy");

var header =document.getElementsByClassName("parentcat");
for (var i = 0; i < header.length; i++) {
  header[i].addEventListener("click", function() {
  var current = document.getElementsByClassName("active");
  console.log(current);
  current[0].className = current[0].className.replace(" active", "");
  this.className += " active";
  
  });}

  useEffect(()=>{
    localStorage.setItem('notes' ,JSON.stringify(cartItems))
  },[cartItems]);

return(

    < >

    <Header cartItems={cartItems}/>
    <div className=" cart-icon" >
        <Link to="/FvbProductAdd" style={{ color:"white"}} >
        {/* <button className="d_main_title" id="cart-count"> {cartItems}</button> */}
    <i class="fa fa-shopping-bag fa-2x" ></i>
    </Link>
</div>
<div className="row box_padding" >
    <div className="col-2">

   
    
    <nav className="left_category_nav" id="category_scrollspy" style={{height:"616px"  , top:"4px"}} >
            <ul className="category_scrollspy-ul">
                                    <li className={`nav-item`}>
                        <a data-scroll="" className= "nav-link parentcat active " href="#Recommended"><p>Recommended</p></a> 
                                            </li>
                                            {/* <li className="nav-item">
                                <a data-scroll="" className="nav-link parentcat active  " href="#Recommended">
                                <p>Recommended</p></a>
                                <ul className="nav nav-items-sub ul-sub">
                                                                        <li className="nav-item ">
                                        <a data-scroll="" className="nav-link  childcat " href="#Recommended">Recommended</a>
                                    </li>
                                                                    </ul>
                            </li> */}
                                                                            
                            <li className="nav-item">
                                <a data-scroll="" className={`nav-link parentcat ${activeClassCheck}`} onClick={handleActiveClass}  href="#itemsection__191500">
                                <p>Beer &amp; ciders</p></a>
                                <ul className="nav nav-items-sub ul-sub">
                                                                        <li className="nav-item">
                                        <a data-scroll="" className="nav-link childcat" href="#itemsection__636144">Doolally Beer &amp; Ciders</a>
                                    </li>
                                                                    </ul>
                            </li>
                                                                        
                            <li className="nav-item">
                                <a data-scroll="" className="nav-link parentcat" href="#itemsection__237260">
                                <p>Combo</p></a>
                                <ul className="nav nav-items-sub ul-sub">
                                                                        <li className="nav-item ">
                                        <a data-scroll="" className="nav-link  childcat " href="#itemsection__735412">Combo</a>
                                    </li>
                                                                    </ul>
                            </li>
                                                                    
                            <li className="nav-item">
                                <a data-scroll="" className="nav-link parentcat " href="#itemsection__152121">
                                <p>Breakfast</p></a>
                                <ul className="nav nav-items-sub ul-sub">
                                                                        <li className="nav-item">
                                        <a data-scroll="" className={`nav-link childcat`} href="#itemsection__135758">Breakfast</a>
                                    </li>
                                                                    </ul>
                            </li>
                                                                      
                            <li className="nav-item">
                                <a data-scroll="" className="nav-link parentcat" href="#itemsection__151641">
                                <p>Salads</p></a>
                                <ul className="nav nav-items-sub ul-sub">
                                                                        <li className="nav-item">
                                        <a data-scroll="" className="nav-link childcat" href="#itemsection__135759">Salads</a>
                                    </li>
                                                                    </ul>
                            </li>
                                                                       
                            <li className="nav-item">
                                <a data-scroll="" className="nav-link parentcat" href="#itemsection__37929">
                                <p>Pizza</p></a>
                                <ul className="nav nav-items-sub ul-sub">
                                                                        <li className="nav-item">
                                        <a data-scroll="" className="nav-link childcat" href="#itemsection__362303">Pizza 10 Inch</a>
                                    </li>
                                                                    </ul>
                            </li>
                                                                      
                            <li className="nav-item">
                                <a data-scroll="" className="nav-link parentcat" href="#itemsection__151642">
                                <p>Starters</p></a>
                                <ul className="nav nav-items-sub ul-sub">
                                                                        <li className="nav-item">
                                        <a data-scroll="" className="nav-link childcat" href="#itemsection__135760">Starters</a>
                                    </li>
                                                                    </ul>
                            </li>
                                                                    
                            <li className="nav-item">
                                <a data-scroll="" className="nav-link parentcat" href="#itemsection__151643">
                                <p>Mains</p></a>
                                <ul className="nav nav-items-sub ul-sub">
                                                                        <li className="nav-item">
                                        <a data-scroll="" className="nav-link childcat" href="#itemsection__135763">Main Course</a>
                                    </li>
                                                                    </ul>
                            </li>
                                                                     
                            <li className="nav-item">
                                <a data-scroll="" className="nav-link parentcat" href="#itemsection__151644">
                                <p>Desserts</p></a>
                                <ul className="nav nav-items-sub ul-sub">
                                                                        <li className="nav-item">
                                        <a data-scroll="" className="nav-link childcat" href="#itemsection__135764">Desserts</a>
                                    </li>
                                                                    </ul>
                            </li>
                                                                    
                            <li className="nav-item">
                                <a data-scroll="" className="nav-link parentcat" href="#itemsection__206478">
                                <p>Merchandise</p></a>
                                <ul className="nav nav-items-sub ul-sub">
                                                                        <li className="nav-item">
                                        <a data-scroll="" className="nav-link childcat" href="#itemsection__669765">Merchandise</a>
                                    </li>
                                                                    </ul>
                            </li>
                                                                    
                            <li className="nav-item">
                                <a data-scroll="" className="nav-link parentcat" href="#itemsection__37927">
                                <p>Beverages </p></a>
                                <ul className="nav nav-items-sub ul-sub">
                                                                        <li className="nav-item">
                                        <a data-scroll="" className="nav-link childcat" href="#itemsection__583845">Iced Tea</a>
                                    </li>
                                                                        <li className="nav-item">
                                        <a data-scroll="" className="nav-link childcat" href="#itemsection__169967">Milkshake</a>
                                    </li>
                                                                        <li className="nav-item">
                                        <a data-scroll="" className="nav-link childcat" href="#itemsection__169966">Mocktail</a>
                                    </li>
                                                                    </ul>
                            </li>
                                                                                            <li className="nav-item d-none d-xl-block d-lg-block d-md-block"><a data-scroll="" className="nav-link border-0" href="#">&nbsp;</a></li>
                <li className="nav-item d-none d-xl-block d-lg-block d-md-block"><a data-scroll="" className="nav-link border-0" href="#">&nbsp;</a></li>
                <li className="nav-item d-none d-xl-block d-lg-block d-md-block"><a data-scroll="" className="nav-link border-0" href="#">&nbsp;</a></li>
                <li className="nav-item d-none d-xl-block d-lg-block d-md-block"><a data-scroll="" className="nav-link border-0" href="#">&nbsp;</a></li>
            </ul>
        </nav>
        </div>

        <div className="col box_padding" id="Recommended"  >
     <p className="d_main_title"  >Recommended</p>

     <span className="d_line"></span><span className="d_round"></span><span className="d_round"></span><span className="d_round"></span>
     <div className="d_beer_product">
                                    <div className="row">
                                        <div className="col-md-3">
                                            <div className="d_beer_product_img">
                                                <figure className="mb-md-0 mb-3">
                                                    {/* <img className="w-100" src={item.image }alt=""/> */}
                                                </figure>
                                                <span className="d-flex align-items-center justify-content-center"><em></em></span>
                                            </div>
                                        </div>
                                        <div className="col-md-9">
                                            <div className="d_beer_product_cnt">
                                                <h4 className="d_beer_product_cnt_title"> [1 Litre]</h4>
                                                <p className="d_beer_product_cnt_subtitle p_gray">This is what happens when your Brewmaster goes on a diet. India's first "low carb beer."</p>
                                                <div className="d-md-flex d-block align-items-md-center justify-content-md-between mt-3">
                                                    <div className="">
                                                        <p className="d_beer_product_cnt_rats p_gray">Start From <strong>Rs </strong></p>
                                                        <div className="d_beer_product_cnt_link d_feat_event_name" >Customization available</div>
                                                    </div>
                                                    <div  className="d_comn_btn d-block d-md-inline-block mt-3" style={{width:"170px"}} onClick={onAdd}>Add</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            
                                </div>
                <div className="col" id="itemsection__191500">


                <p className="d_main_title"  >Beer & ciders</p>

<span className="d_line"></span><span className="d_round"></span><span className="d_round"></span><span className="d_round"></span>
<div className="d_beer_product">
                               <div className="row">
                                   <div className="col-md-3">
                                       <div className="d_beer_product_img">
                                           <figure className="mb-md-0 mb-3">
                                               {/* <img className="w-100" src={item.image }alt=""/> */}
                                           </figure>
                                           <span className="d-flex align-items-center justify-content-center"><em></em></span>
                                       </div>
                                   </div>
                                   <div className="col-md-9">
                                       <div className="d_beer_product_cnt">
                                           <h4 className="d_beer_product_cnt_title"> [2 Litre]</h4>
                                           <p className="d_beer_product_cnt_subtitle p_gray">This is what happens when your Brewmaster goes on a diet. India's first "low carb beer."</p>
                                           <div className="d-md-flex d-block align-items-md-center justify-content-md-between mt-3">
                                               <div className="">
                                                   <p className="d_beer_product_cnt_rats p_gray">Start From <strong>Rs </strong></p>
                                                   <div className="d_beer_product_cnt_link d_feat_event_name" >Customization available</div>
                                               </div>
                                               <div  className="d_comn_btn d-block d-md-inline-block mt-3" style={{width:"170px"}} onClick={onAdd}>Add</div>
                                           </div>
                                       </div>
                                   </div>
                               </div>
                           </div>
         
   

                    </div>  
  
                    <div className="col" id="itemsection__237260">


<p className="d_main_title"  > Combo</p>

<span className="d_line"></span><span className="d_round"></span><span className="d_round"></span><span className="d_round"></span>
<div className="d_beer_product">
               <div className="row">
                   <div className="col-md-3">
                       <div className="d_beer_product_img">
                           <figure className="mb-md-0 mb-3">
                               {/* <img className="w-100" src={item.image }alt=""/> */}
                           </figure>
                           <span className="d-flex align-items-center justify-content-center"><em></em></span>
                       </div>
                   </div>
                   <div className="col-md-9">
                       <div className="d_beer_product_cnt">
                           <h4 className="d_beer_product_cnt_title"> [1 Litre]</h4>
                           <p className="d_beer_product_cnt_subtitle p_gray">This is what happens when your Brewmaster goes on a diet. India's first "low carb beer."</p>
                           <div className="d-md-flex d-block align-items-md-center justify-content-md-between mt-3">
                               <div className="">
                                   <p className="d_beer_product_cnt_rats p_gray">Start From <strong>Rs </strong></p>
                                   <div className="d_beer_product_cnt_link d_feat_event_name" >Customization available</div>
                               </div>
                               <div  className="d_comn_btn d-block d-md-inline-block mt-3" style={{width:"170px"}}>Add</div>
                           </div>
                       </div>
                   </div>
               </div>
           </div>



    </div>  
                    <div className="col" id="itemsection__152121">


                <p className="d_main_title"  >Breakfast</p>

<span className="d_line"></span><span className="d_round"></span><span className="d_round"></span><span className="d_round"></span>
<div className="d_beer_product">
                               <div className="row">
                                   <div className="col-md-3">
                                       <div className="d_beer_product_img">
                                           <figure className="mb-md-0 mb-3">
                                               {/* <img className="w-100" src={item.image }alt=""/> */}
                                           </figure>
                                           <span className="d-flex align-items-center justify-content-center"><em></em></span>
                                       </div>
                                   </div>
                                   <div className="col-md-9">
                                       <div className="d_beer_product_cnt">
                                           <h4 className="d_beer_product_cnt_title"> [1 Litre]</h4>
                                           <p className="d_beer_product_cnt_subtitle p_gray">This is what happens when your Brewmaster goes on a diet. India's first "low carb beer."</p>
                                           <div className="d-md-flex d-block align-items-md-center justify-content-md-between mt-3">
                                               <div className="">
                                                   <p className="d_beer_product_cnt_rats p_gray">Start From <strong>Rs </strong></p>
                                                   <div className="d_beer_product_cnt_link d_feat_event_name" >Customization available</div>
                                               </div>
                                               <div  className="d_comn_btn d-block d-md-inline-block mt-3" style={{width:"170px"}}>Add</div>
                                           </div>
                                       </div>
                                   </div>
                               </div>
                           </div>
         
   

                    </div>   

                    

                    <div className="col" id="itemsection__151641">


                <p className="d_main_title"  >Salads</p>

<span className="d_line"></span><span className="d_round"></span><span className="d_round"></span><span className="d_round"></span>
<div className="d_beer_product">
                               <div className="row">
                                   <div className="col-md-3">
                                       <div className="d_beer_product_img">
                                           <figure className="mb-md-0 mb-3">
                                               {/* <img className="w-100" src={item.image }alt=""/> */}
                                           </figure>
                                           <span className="d-flex align-items-center justify-content-center"><em></em></span>
                                       </div>
                                   </div>
                                   <div className="col-md-9">
                                       <div className="d_beer_product_cnt">
                                           <h4 className="d_beer_product_cnt_title"> [1 Litre]</h4>
                                           <p className="d_beer_product_cnt_subtitle p_gray">This is what happens when your Brewmaster goes on a diet. India's first "low carb beer."</p>
                                           <div className="d-md-flex d-block align-items-md-center justify-content-md-between mt-3">
                                               <div className="">
                                                   <p className="d_beer_product_cnt_rats p_gray">Start From <strong>Rs </strong></p>
                                                   <div className="d_beer_product_cnt_link d_feat_event_name" >Customization available</div>
                                               </div>
                                               <div  className="d_comn_btn d-block d-md-inline-block mt-3" style={{width:"170px"}}>Add</div>
                                           </div>
                                       </div>
                                   </div>
                               </div>
                           </div>
         
   

                    </div>   

                    

                    <div className="col" id="itemsection__37929">


                <p className="d_main_title"  >Pizza</p>

<span className="d_line"></span><span className="d_round"></span><span className="d_round"></span><span className="d_round"></span>
<div className="d_beer_product">
                               <div className="row">
                                   <div className="col-md-3">
                                       <div className="d_beer_product_img">
                                           <figure className="mb-md-0 mb-3">
                                               {/* <img className="w-100" src={item.image }alt=""/> */}
                                           </figure>
                                           <span className="d-flex align-items-center justify-content-center"><em></em></span>
                                       </div>
                                   </div>
                                   <div className="col-md-9">
                                       <div className="d_beer_product_cnt">
                                           <h4 className="d_beer_product_cnt_title"> [1 Litre]</h4>
                                           <p className="d_beer_product_cnt_subtitle p_gray">This is what happens when your Brewmaster goes on a diet. India's first "low carb beer."</p>
                                           <div className="d-md-flex d-block align-items-md-center justify-content-md-between mt-3">
                                               <div className="">
                                                   <p className="d_beer_product_cnt_rats p_gray">Start From <strong>Rs </strong></p>
                                                   <div className="d_beer_product_cnt_link d_feat_event_name" >Customization available</div>
                                               </div>
                                               <div  className="d_comn_btn d-block d-md-inline-block mt-3" style={{width:"170px"}}>Add</div>
                                           </div>
                                       </div>
                                   </div>
                               </div>
                           </div>
         
   

                    </div>   
                    

                    <div className="col" id="itemsection__151642">


                <p className="d_main_title"  >Starters</p>

<span className="d_line"></span><span className="d_round"></span><span className="d_round"></span><span className="d_round"></span>
<div className="d_beer_product">
                               <div className="row">
                                   <div className="col-md-3">
                                       <div className="d_beer_product_img">
                                           <figure className="mb-md-0 mb-3">
                                               {/* <img className="w-100" src={item.image }alt=""/> */}
                                           </figure>
                                           <span className="d-flex align-items-center justify-content-center"><em></em></span>
                                       </div>
                                   </div>
                                   <div className="col-md-9">
                                       <div className="d_beer_product_cnt">
                                           <h4 className="d_beer_product_cnt_title"> [1 Litre]</h4>
                                           <p className="d_beer_product_cnt_subtitle p_gray">This is what happens when your Brewmaster goes on a diet. India's first "low carb beer."</p>
                                           <div className="d-md-flex d-block align-items-md-center justify-content-md-between mt-3">
                                               <div className="">
                                                   <p className="d_beer_product_cnt_rats p_gray">Start From <strong>Rs </strong></p>
                                                   <div className="d_beer_product_cnt_link d_feat_event_name" >Customization available</div>
                                               </div>
                                               <div  className="d_comn_btn d-block d-md-inline-block mt-3" style={{width:"170px"}}>Add</div>
                                           </div>
                                       </div>
                                   </div>
                               </div>
                           </div>
         
   

                    </div> 
                    

                    <div className="col" id="itemsection__151643">


                <p className="d_main_title"  >Mains</p>

<span className="d_line"></span><span className="d_round"></span><span className="d_round"></span><span className="d_round"></span>
<div className="d_beer_product">
                               <div className="row">
                                   <div className="col-md-3">
                                       <div className="d_beer_product_img">
                                           <figure className="mb-md-0 mb-3">
                                               {/* <img className="w-100" src={item.image }alt=""/> */}
                                           </figure>
                                           <span className="d-flex align-items-center justify-content-center"><em></em></span>
                                       </div>
                                   </div>
                                   <div className="col-md-9">
                                       <div className="d_beer_product_cnt">
                                           <h4 className="d_beer_product_cnt_title"> [1 Litre]</h4>
                                           <p className="d_beer_product_cnt_subtitle p_gray">This is what happens when your Brewmaster goes on a diet. India's first "low carb beer."</p>
                                           <div className="d-md-flex d-block align-items-md-center justify-content-md-between mt-3">
                                               <div className="">
                                                   <p className="d_beer_product_cnt_rats p_gray">Start From <strong>Rs </strong></p>
                                                   <div className="d_beer_product_cnt_link d_feat_event_name" >Customization available</div>
                                               </div>
                                               <div  className="d_comn_btn d-block d-md-inline-block mt-3" style={{width:"170px"}}>Add</div>
                                           </div>
                                       </div>
                                   </div>
                               </div>
                           </div>
         
   

                    </div>  
                    

                    <div className="col" id ="itemsection__151644">


                <p className="d_main_title"  >Desserts</p>

<span className="d_line"></span><span className="d_round"></span><span className="d_round"></span><span className="d_round"></span>
<div className="d_beer_product">
                               <div className="row">
                                   <div className="col-md-3">
                                       <div className="d_beer_product_img">
                                           <figure className="mb-md-0 mb-3">
                                               {/* <img className="w-100" src={item.image }alt=""/> */}
                                           </figure>
                                           <span className="d-flex align-items-center justify-content-center"><em></em></span>
                                       </div>
                                   </div>
                                   <div className="col-md-9">
                                       <div className="d_beer_product_cnt">
                                           <h4 className="d_beer_product_cnt_title"> [1 Litre]</h4>
                                           <p className="d_beer_product_cnt_subtitle p_gray">This is what happens when your Brewmaster goes on a diet. India's first "low carb beer."</p>
                                           <div className="d-md-flex d-block align-items-md-center justify-content-md-between mt-3">
                                               <div className="">
                                                   <p className="d_beer_product_cnt_rats p_gray">Start From <strong>Rs </strong></p>
                                                   <div className="d_beer_product_cnt_link d_feat_event_name" >Customization available</div>
                                               </div>
                                               <div  className="d_comn_btn d-block d-md-inline-block mt-3" style={{width:"170px"}}>Add</div>
                                           </div>
                                       </div>
                                   </div>
                               </div>
                           </div>
         
   

                    </div>   

                   
                    <div className="col" id="itemsection__206478">


                <p className="d_main_title"  >Merchandise</p>

<span className="d_line"></span><span className="d_round"></span><span className="d_round"></span><span className="d_round"></span>
<div className="d_beer_product">
                               <div className="row">
                                   <div className="col-md-3">
                                       <div className="d_beer_product_img">
                                           <figure className="mb-md-0 mb-3">
                                               {/* <img className="w-100" src={item.image }alt=""/> */}
                                           </figure>
                                           <span className="d-flex align-items-center justify-content-center"><em></em></span>
                                       </div>
                                   </div>
                                   <div className="col-md-9">
                                       <div className="d_beer_product_cnt">
                                           <h4 className="d_beer_product_cnt_title"> [1 Litre]</h4>
                                           <p className="d_beer_product_cnt_subtitle p_gray">This is what happens when your Brewmaster goes on a diet. India's first "low carb beer."</p>
                                           <div className="d-md-flex d-block align-items-md-center justify-content-md-between mt-3">
                                               <div className="">
                                                   <p className="d_beer_product_cnt_rats p_gray">Start From <strong>Rs </strong></p>
                                                   <div className="d_beer_product_cnt_link d_feat_event_name" >Customization available</div>
                                               </div>
                                               <div  className="d_comn_btn d-block d-md-inline-block mt-3" style={{width:"170px"}}>Add</div>
                                           </div>
                                       </div>
                                   </div>
                               </div>
                           </div>
         
   

                    </div>            

                    <div className="col">


                <p className="d_main_title" id="itemsection__37927" >Beverages</p>

<span className="d_line"></span><span className="d_round"></span><span className="d_round"></span><span className="d_round"></span>
<div className="d_beer_product">
                               <div className="row">
                                   <div className="col-md-3">
                                       <div className="d_beer_product_img">
                                           <figure className="mb-md-0 mb-3">
                                               {/* <img className="w-100" src={item.image }alt=""/> */}
                                           </figure>
                                           <span className="d-flex align-items-center justify-content-center"><em></em></span>
                                       </div>
                                   </div>
                                   <div className="col-md-9">
                                       <div className="d_beer_product_cnt">
                                           <h4 className="d_beer_product_cnt_title"> [1 Litre]</h4>
                                           <p className="d_beer_product_cnt_subtitle p_gray">This is what happens when your Brewmaster goes on a diet. India's first "low carb beer."</p>
                                           <div className="d-md-flex d-block align-items-md-center justify-content-md-between mt-3">
                                               <div className="">
                                                   <p className="d_beer_product_cnt_rats p_gray">Start From <strong>Rs </strong></p>
                                                   <div className="d_beer_product_cnt_link d_feat_event_name" >Customization available</div>
                                               </div>
                                               <div  className="d_comn_btn d-block d-md-inline-block mt-3" style={{width:"170px"}}>Add</div>
                                           </div>
                                       </div>
                                   </div>
                               </div>
                           </div>
         
   

                    </div>   

        </div>


        </div>
        
    </>
);

}
export default Menu;