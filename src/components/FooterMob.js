import React,{useState}from "react";
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import PhoneOutlinedIcon from '@material-ui/icons/PhoneOutlined';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import { useParams, Link } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';


const Footer=()=>{

  const [smShow, setSmShow] = useState(false);
  
  const { currentUrl } = useParams();


    return(
        <>
    {/* footer for phone view*/}

    <div className="row ph-footer ds-none">
      <div className="col-1"></div>
<div className="col">
  <div className="c1">
<Link to="/" className="link">
<HomeOutlinedIcon />
</Link>
</div>
</div>
<div className="col ">
  <div className="c1">
  <a href={"tel:++91022-48931314"} target="_blank">
<PhoneOutlinedIcon />
</a>
</div>
</div>
<div className="col ">
  <div className="c1">
<ShoppingCartOutlinedIcon/>
</div>
</div>
<div className="col text-end">
  <div className="c1">
<MoreVertOutlinedIcon onClick={() => setSmShow(true)} />
</div>
</div>  
</div>
    
  
    <Modal
        size="sm"
        style={{marginTop:"10%"}}
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
          Menu
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="menu-footer-mob">
          <ul>
          <li>
          <Link to="/my-events">Organizer Dashboard</Link>
          </li>
          <li>
          Order & Shipping

          </li>
          <li>
          FAQ Events
          </li>
          <li>
          <Link to="/food">Food</Link>
          </li>
          <li>
          <Link to="/beer">Beer</Link>
          </li>
         <li> <Link to="/merchandise">Merchandise</Link></li>
          <li>
          <Link to="/about-us">About Us</Link>

          </li>
          <li>
          <Link to="/privacy-policy">Privacy Policy</Link>
          </li>
<li>
<Link to="/contact-us">Contact Us</Link>
</li>
          </ul>
          </div>
        </Modal.Body>
      </Modal>
      
      </>
    )
}

export default Footer;