import React, { Component } from 'react';
import CircularProgress from "@material-ui/core/CircularProgress";

import { firebaseMatches } from "../../Firebase";
import { firebaseLooper, reverseArray } from '../UI/Misc';

import MatchesList from "./MatchesList";
import LeagueTable from "./Table";

class TheMatches extends Component {

  state = {
    loading: true,
    matches: [],
    filterMatches: [],
    playedFilter: "All",
    resultFilter: "All"
  }

  componentDidMount() {
    firebaseMatches.once("value").then(snapshot => {
      const matches = firebaseLooper(snapshot);

      this.setState({
        loading: false,
        matches: reverseArray(matches),
        filterMatches: reverseArray(matches)
      })
    })
  }

  showPlayed = (played) => {
    
    const list = this.state.matches.filter((match) => {
      return match.final === played
    })

    this.setState({
      filterMatches: played === "All" ? this.state.matches : list,
      playedFilter: played, 
      resultFilter: "All"
    })
  }

  showResult = (result) => {

    const list = this.state.matches.filter((match) => {
      return match.result === result
      // console.log(match.result)
    })

    this.setState({
      filterMatches: result === "All" ? this.state.matches : list,
      playedFilter: "All", 
      resultFilter: result
    })
  }

  render() {
    const state = this.state;
    const activeAll = state.playedFilter === "All" ? "active" : ""
    const activeYes = state.playedFilter === "Yes" ? "active" : ""
    const activeNo = state.playedFilter === "No" ? "active" : ""
    const resultAll = state.resultFilter === "All" ? "active" : ""
    const resultW = state.resultFilter === "W" ? "active" : ""
    const resultL = state.resultFilter === "L" ? "active" : ""
    const resultD = state.resultFilter === "D" ? "active" : ""
    return (
      <div className="the_matches_container">
        <div className="the_matches_wrapper">
          <div className="left">
            <div className="match_filters">
              <div className="match_filters_box">
                <div className="tag">
                  Show Match
                </div>
                <div className="cont">
                  <div className={`option ${activeAll}`} onClick={() => this.showPlayed("All")}>
                    All
                  </div>
                  <div className={`option ${activeYes}`} onClick={() => this.showPlayed("Yes")}>
                    Played
                  </div>
                  <div className={`option ${activeNo}`} onClick={() => this.showPlayed("No")}>
                    Not played
                  </div>
                </div>
              </div>
              <div className="match_filters_box">
                <div className="tag">
                  Result Game
                </div>
                <div className="cont">
                  <div className={`option ${resultAll}`} onClick={() => this.showResult("All")}>
                    All
                  </div>
                  <div className={`option ${resultW}`} onClick={() => this.showResult("W")}>
                    W
                  </div>
                  <div className={`option ${resultL}`} onClick={() => this.showResult("L")}>
                    L
                  </div>
                  <div className={`option ${resultD}`} onClick={() => this.showResult("D")}>
                    D
                  </div>
                </div>
              </div>
            </div>
              <MatchesList matches={state.filterMatches}/>
          </div>
          <div className="right">
            <LeagueTable />
          </div>
        </div>
      </div>
    );
  }
}

export default TheMatches;
