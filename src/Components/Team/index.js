import React, { Component } from 'react';
import PlayerCard from "../UI/PlayerCard";

import Fade from "react-reveal/Fade";
import Stripes from "../../Resources/images/stripes.png";
import { firebasePlayers, firebase } from "../../Firebase";
import { firebaseLooper } from "../UI/Misc";
import { Promise } from "core-js"

class TheTeam extends Component {

  state = {
    loading: true,
    players: []
  }

  componentDidMount() {
    firebasePlayers.once("value").then(snapshot => {
      const players = firebaseLooper(snapshot);
      let promises = [];

      //promise kullanmamızın sebebi, players'ın içinde gelen 
      //image isimlerinin URL'lerini storage'dan almamızın gerekmesi.

      for(let key in players) {
        promises.push(
          new Promise((resolve, reject) => {
            firebase.storage().ref("players")
            .child(players[key].image).getDownloadURL()
            .then( url => {
              players[key].url = url;
              resolve();
            })
          })
        )
      }

      Promise.all(promises).then(() => {
        this.setState({
          loading: false,
          players
        })
      })
    })
  }

  showPlayersByCategory = (category) => (
    this.state.players ? 
      this.state.players.map((player, index) => {
        return player.position === category ? 
            <Fade left delay={index*50} key={index}>
              <div className="item">
                <PlayerCard 
                  number={player.number}
                  name={player.name}
                  lastname={player.lastname}
                  bck={player.url}
                />
              </div>
            </Fade> : null;
      }) : null
  )

  render() {

    const playerCards = (!this.state.loading) ? 
            <div>
              <div className="team_category_wrapper">
                <div className="title">Keepers</div>
                <div className="team_cards">
                  {this.showPlayersByCategory("Keeper")}
                </div>
              </div>
              <div className="team_category_wrapper">
                <div className="title">Defence</div>
                <div className="team_cards">
                  {this.showPlayersByCategory("Defence")}
                </div>
              </div>
              <div className="team_category_wrapper">
                <div className="title">Midfield</div>
                <div className="team_cards">
                  {this.showPlayersByCategory("Midfield")}
                </div>
              </div>
              <div className="team_category_wrapper">
                <div className="title">Striker</div>
                <div className="team_cards">
                  {this.showPlayersByCategory("Striker")}
                </div>
              </div>
            </div> : null
    return (
      <div className="the_team_container" style={{background:`url(${Stripes}) repeat`}}>
        { playerCards }
      </div>
    );
  }
}

export default TheTeam;
