import React from "react";
import { Link } from "react-router-dom";

import { eventCategoryImageBaseUrl } from '../../config/constant';

function event_category_box(props){
    return(
        <>
            <div className="d_product_box">
                <figure className="d_product_img mb-0">
                <Link to={'/event-category/'+props.cateData.cateSlug}><img src={eventCategoryImageBaseUrl+props.cateData.cateImage} alt=""/></Link>
                </figure>
                <Link to={'/event-category/'+props.cateData.cateSlug}><p className="d_product_title">{props.cateData.cateName}</p></Link>
            </div>
        </>
    );
}
export default event_category_box;