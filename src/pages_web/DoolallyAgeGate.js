import React, { useEffect, Component } from "react";
import { Link } from "react-router-dom";
import Helper from "../utils/Helper";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { navigate } from "@reach/router";

export default function DoolallyAgeGate(props) {
  let [searchParams, setSearchParams] = useSearchParams();
  let [redirectTo, setRedirectTo] = useState();
  useEffect(() => {
    Helper.checkCurrentUserLegalAge().then((res) => {
      if (searchParams.get("redirect_to")) {
        setRedirectTo(searchParams.get("redirect_to"));
      }
      if (res.legalAge === "Yes") {
        window.location = "/";
      }
    });
  });

  const handleClick = (e) => {
    e.preventDefault();
    Helper.setCurrentUserLegalAge().then((res) => {
      if (res.legalAge === "Yes") {
        if (redirectTo) {
          window.location = "/event-details/" + redirectTo;
        } else {
          window.location = "/";
        }
      }
    });
  };
  return (
    <>
      <div id="entry-gate" className="box_padding ">
        <div class="d-flex justify-content-center mt-4  lh-2 ">
          <img
            src={process.env.PUBLIC_URL + "/images/splashLogo.png"}
            style={{ width: "120px", marginBottom: "2%" }}
            alt="logo"
          />
        </div>
        <img
          src={
            process.env.PUBLIC_URL + "/images/Giving-Great-Head-Since-2009.png"
          }
          alt="logo"
          style={{ width: "64%" }}
        />
        <br /> <br />
        <span className="d_linee"></span>
        <br />
        <br />
        {/* <span className="" style={{fontWeight:"bold",fontSize:"24px"}}>Welcome To Doolally!</span> <br/> */}
        <p
          class="sub-age-txt"
          style={{ fontWeight: "light", fontSize: "20px" }}
        >
          Are you of legal drinking age?
        </p>
        {/* <button >Yes</button> <button >No</button> */}
        <div>
          {/* <Link to="/" id="btn-18"> Yes </Link> */}
          <button onClick={handleClick} id="btn-18">
            Yes
          </button>
          <a href="http://www.amuldairy.com">
            {" "}
            <button id="btn-18"> No </button>
          </a>
        </div>
      </div>
    </>
  );
}
// export default class DoolallyAgeGate extends React.Component {
// //  params=useSearchParams();
//   constructor(props) {
//     super(props);
//     Helper.checkCurrentUserLegalAge().then((res) => {

//       // console.log(this.params.searchParams.get('redirect_to'));
//       if (res.legalAge === "Yes") {

//         window.location = "/";
//       }
//     });
//   }

//   handleClick(e) {
//     e.preventDefault();
//     Helper.setCurrentUserLegalAge().then((res) => {
//       if (res.legalAge === "Yes") {

//         window.location = "/";
//       }
//     });
//   }

//   render() {
//     return (
//       <>
//         <div id="entry-gate" className="box_padding ">
//           <div class="d-flex justify-content-center mt-4  lh-2 ">
//             <img
//               src={process.env.PUBLIC_URL + "/images/splashLogo.png"}
//               style={{ width: "120px", marginBottom: "2%" }}
//               alt="logo"
//             />
//           </div>
//           <img
//             src={
//               process.env.PUBLIC_URL +
//               "/images/Giving-Great-Head-Since-2009.png"
//             }
//             alt="logo"
//             style={{ width: "64%" }}
//           />
//           <br /> <br />
//           <span className="d_linee"></span>
//           <br />
//           <br />
//           {/* <span className="" style={{fontWeight:"bold",fontSize:"24px"}}>Welcome To Doolally!</span> <br/> */}
//           <p
//             class="sub-age-txt"
//             style={{ fontWeight: "light", fontSize: "20px" }}
//           >
//             Are you of legal drinking age?
//           </p>
//           {/* <button >Yes</button> <button >No</button> */}
//           <div>
//             {/* <Link to="/" id="btn-18"> Yes </Link> */}
//             <button onClick={this.handleClick} id="btn-18">
//               Yes
//             </button>
//             <a href="http://www.amuldairy.com">
//               {" "}
//               <button id="btn-18"> No </button>
//             </a>
//           </div>
//         </div>
//       </>
//     );
//   }
// }
