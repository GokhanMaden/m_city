import React from "react";
import Featured from "./Featured/index";
import Matches from "./Matches/index";
import MeetPlayers from "./MeetPlayers"

const Home = (props) => {
  return(
    <div className="bck_blue">
      <Featured/>
      <Matches />
      <MeetPlayers />
    </div>
  )
}

export default Home;