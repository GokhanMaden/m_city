import React from "react";
import Animation from "./Animation";
import PromotionAnimation from "./Enroll";

const Promotion = (props) => {
  return(
    <div className="promotion_wrapper" style={{background: "#ffffff"}}>
      <div className="container">
        <PromotionAnimation />
      </div>
    </div>
  )
}

export default Promotion;