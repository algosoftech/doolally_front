import React,{useState} from "react";
import { Link } from "react-router-dom";
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';

const Header=(props)=>{

    const{cartItems}=props;
    var y=cartItems;
const hide=()=>{
    var show=document.getElementById("share-lst").style.display;
    document.querySelector(".h-main").firstElementChild.classList.replace("text-end","text-start");
//    console.log(s);
    if(show=="none"){
        document.getElementById("share-lst").style.display="block";
        
    document.querySelector(".h-main").firstElementChild.classList.replace("text-end","text-start");
        document.getElementById("menu-bar").style.display="none";
    }
    else 
    
    {
 document.getElementById("share-lst").style.display="none";
 
 document.querySelector(".h-main").firstElementChild.classList.replace("text-start","text-end");
 document.getElementById("menu-bar").style.display="inline";
}
}

    return(
        <>
        <header className="row h-main">
        <div className="col-8 ds-none text-end">
            <Link to="/">
    <img src={process.env.PUBLIC_URL + "/images/splashLogo.png" }alt="logo"  style={{width:"6rem",padding:"7%"}}/> </Link>
    </div>
    <div className="col-md-4 col-4 h-left  ">
    {/* <img src={process.env.PUBLIC_URL + "/images/icons/new icons/instagram.png" }alt="logo"/>
    <img src={process.env.PUBLIC_URL + "/images/icons/new icons/twitter.png" }alt="logo"/>
    <img src={process.env.PUBLIC_URL + "/images/icons/new icons/facebook.png" }alt="logo"/>
    <img src={process.env.PUBLIC_URL + "/images/icons/new icons/whatsapp.png" }alt="logo"/>
     */}

    
    

    <div id="share-lst" style={{display:"none" }}>
    <div className=" d-flex text-center" style={{marginLeft:"-15px"}} >
          
    
    <img  src={process.env.PUBLIC_URL + "/images/icons/new icons/twitter.png" }alt="logo"/><br/>
     <img src={process.env.PUBLIC_URL + "/images/icons/new icons/facebook.png" }alt="logo"/><br/>
     <img src={process.env.PUBLIC_URL + "/images/icons/new icons/instagram.png" }alt="logo"/><br/>
     <img src={process.env.PUBLIC_URL + "/images/icons/new icons/whatsapp.png" }alt="logo"/><br/>
     
    <CloseIcon onClick={hide} style={{fontSize:"25px"}}/> 
    </div>
 </div>
 <MenuIcon id="menu-bar" onClick={hide}/> 
    
    </div>
    <div className="col-md-6 h-center  ph-none ">
    <img src={process.env.PUBLIC_URL + "/images/splashLogo.png" }alt="logo"  style={{width:"90px"}}/>
    </div>
    <div className="col-1 col-md-3 h-right  ph-none" id="dirty_hedline_font">
    <img src={process.env.PUBLIC_URL + "/images/icons/new icons/phone-call.png" }alt="logo"/> 022-48931314
    </div>
    </header>
    <div className="row s-main  ph-none">
    <div className="col d_main_title pt-2  " style={{cursor:"pointer" ,fontWeight:"600"}}>Order Online</div>
    
    <div className="col-7">
        
                <form action="">
                    {/* <div className="row justify-content-center">
                        <div className="col-sm-12 col-md-9"> */}
                            <div className="serachbar poppins">
                                <input className="form-control" type="text" placeholder="Search for event, beer &amp; delicious food " name="search"/>
                                <button type="submit"><img src={process.env.PUBLIC_URL + "/images/icons/search-icon.png" }alt="search-icon"/></button>
    
                            </div>
                        {/* </div>
    
                    </div> */}
                </form>
            </div>
            <div className="col d_main_title pt-2 " style={{cursor:"pointer" }}> Events</div>
         
            <div className="col-1"><img src={process.env.PUBLIC_URL + "/images/icons/new icons/shopping-cart.png"}  style={{width:"20px"}}/>   
           
        <Link to="/cart" style={{ color:"white"}} >

        <button className="d_main_title" id="cart-count"> {y? y: " 3"}</button>
            </Link></div>
    </div>
    
        </>
    )
}

export default Header;