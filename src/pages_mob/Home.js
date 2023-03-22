import React from "react";
import NavLink from "react-bootstrap/esm/NavLink";
import { Link } from "react-router-dom";
const Home=()=>{
    
return(
    <>
    <div className="container">

      
      <h1 style={{textAlign:"center"}}>Doolally</h1>
    <table >
  <tr >
    <th>Pages Name</th>
    
    <th>Links</th>
  </tr>
  <tr> <td>Home</td>
    
    <td><Link to="/Doolally">view</Link></td>
  </tr>
 
 <tr>
    <td>EventList</td>

    <td><Link to="/EventList">view</Link></td>
  </tr>

  <tr>
    <td>EventDetails</td>
    
    <td><Link to="/EventDetails">view</Link></td>
  </tr>

  
  <tr>
    <td>Food Ordering</td>

    <td> <Link to="/FoodOrder">view</Link></td>
  </tr>

  <tr>
    <td>Beer</td>

    <td> <Link to="/beer">view</Link></td>
  </tr>

  <tr>
    <td>Location</td>

    <td> <Link to="/location">view</Link></td>
  </tr>

  <tr>
    <td>Merchandise</td>
    
    <td><Link to="/Merchandise">view</Link></td>
  </tr>

  <tr>
    <td>Cart</td>
    
    <td><Link to="/cart">view</Link></td>
  </tr>

  <tr>
    <td>Mug Club</td>
    
    <td><Link to="/mugClub">view</Link></td>
  </tr>

    
  <tr>
    <td>Reserve Table</td>

    <td> <Link to="/reserveTable">view</Link></td>
  </tr>

  <tr>
    <td>EventSave</td>
    
    <td><Link to="/EventSave">view</Link></td>
  </tr>
  <tr>
    <td>EventSubmit</td>
    
    <td><Link to="/EventSubmit">view</Link></td>
  </tr>

  <tr>
    <td>PrivateEvent</td>
    
    <td><Link to="/PrivateEvent">view</Link></td>
  </tr>

 
  

  <tr>
    <td>Testimonial</td>
    
    <td><Link to="/Testimonial">view</Link></td>
  </tr>
 

  {/* <tr>
    <td>FVB Product Add</td>
    
    <td> <Link to="/FvbProductAdd">view</Link></td>
  </tr> */}

  <tr>
    <td>Log in</td>

    <td> <Link to="/login">view</Link></td>
  </tr>
{/* 
  <tr>
    <td>SignUp</td>

    <td> <Link to="/signUp">view</Link></td>
  </tr> */}
  <tr>
    <td>privacyPolicy</td>

    <td> <Link to="/privacyPolicy">view</Link></td>
  </tr>
  <tr>
    <td>Contact us</td>

    <td> <Link to="/contactUS">view</Link></td>
  </tr>

  <tr>
    <td>profile</td>

    <td> <Link to="/myProfile">view</Link></td>
  </tr>
  <tr>
    <td>FeedBack</td>

    <td> <Link to="/feedBack">view</Link></td>
  </tr>
  
  <tr>
    <td>FNB Checkout</td>

    <td> <Link to="/FnbCheckout">view</Link></td>
  </tr>
   
   

</table>

    </div>
    </>
);
}
export default Home;