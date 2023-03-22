import React from "react";
import { Link } from "react-router-dom";


const DoolallyAgeGate=()=>{
    return(
        <>
        <div id="entry-gate">
        <div class="d-flex justify-content-center"><img src={process.env.PUBLIC_URL + "/images/splashLogo.png"} style={{width:"100px"}} alt="logo"/>   <br/>
        
        </div>
        <br/>
        <span class="load-txt" style={{fontWeight:"bold",fontSize:"18px"}}>Welcome To Doolally!</span> 
        
                    
                    
                    <p class="sub-age-txt">Are you of legal drinking age?</p>  

                    {/* <button >Yes</button> <button >No</button> */}
                    <div className="mdl-card__actions">
          <Link to="/Doolally" id="btn-18">  yes </Link>
            <a href="http://www.amuldairy.com"  id="btn-18">No</a>
        </div>
</div>
        
        

    
                
                    
                    
                    
                
        


        </>
    )
}

export default DoolallyAgeGate;