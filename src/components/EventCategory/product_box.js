import React from "react";

function product_box(props){
    return(
        <>
        <a >
                                    <div className="d_product_box">
                                        <figure className="d_product_img mb-0">
                                            <img src={props.image} alt=""/>
                                        </figure>
                                        <p className="d_product_title">{props.name}</p>
                                    </div>
                                </a>
        </>
    );
}
export default product_box;