import React from "react";
import Featured from "./Featured/index";
import Matches from "./Matches/index";

const Home = (props) => {
  return(
    <div className="bck_blue">
      <Featured/>
      <Matches />
    </div>
  )
}

export default Home;