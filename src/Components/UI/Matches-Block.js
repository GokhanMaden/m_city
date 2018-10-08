import React from "react";

const MatchesBlock = ({match}) => {

  const matchFinal = match.final ? match.date : "Didnt Played."
  const finalResult = match.final ? match.resultLocal : "-"
  return(
    <div className="match_block">
      <div className="match_date">
        {matchFinal}
      </div>
      <div className="match_wrapper">
        <div className="match_top">
          <div className="left">
            <div className="icon" style={{background: `url(/images/team_icons/${match.localThmb}.png)`}}></div>
            <div className="team_name">{match.local}</div>
          </div>
          <div className="right">
            {finalResult}
          </div>
        </div>
      </div>

      <div className="match_wrapper">
        <div className="match_bottom">
          <div className="left">
            <div className="icon" style={{background: `url(/images/team_icons/${match.awayThmb}.png)`}}></div>
            <div className="team_name">{match.away}</div>
          </div>
          <div className="right">
            {finalResult}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MatchesBlock;