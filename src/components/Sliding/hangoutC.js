import React from "react"

const hangoutC=(props)=>{
    return (
        <>
  



<a  data-bs-toggle="modal" data-bs-target="#staticBackdrop">

    <div class="d_product_box " id="d-share-gift">

      

        <figure class="d_product_img mb-0">

            <img src={props.image} alt=""/>

        </figure>
        <p class="d_product_title">{props.title}</p>
    </div>

</a>



 </>
    )
}

export default hangoutC;