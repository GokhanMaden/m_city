import React, { Component } from 'react'
import Stripes from "../../../Resources/images/stripes.png";
import { Tag } from "../../UI/Misc";
import Reveal from "react-reveal/Reveal";

class MeetPlayers extends Component {

  state = {
    show: false
  }
  
  render() {
    return (
      <Reveal
        fraction={0.7}
        onReveal={() => {
          this.setState({
            show: true
          })
        }}
      >
        <div 
          className="home_meetplayers"
          style={{background: `#ffffff url(${Stripes})`}}
        >
          <div className="container">
            <div className="home_meetplayers_wrapper">
              <div className="home_card_wrapper">
                Card
              </div>
              <div className="home_text_wrapper">
                <div style={{marginBottom: "20px"}}>
                  <Tag
                    bck="#0e1731"
                    size="100px"
                    color="#ffffff"
                    add={{
                      display: "inline-block"
                    }}
                  >
                    Meet
                  </Tag>
                </div>
                <div style={{marginBottom: "20px"}}>
                  <Tag
                    bck="#0e1731"
                    size="100px"
                    color="#ffffff"
                    add={{
                      display: "inline-block",
                      marginBottom: "20px"
                    }}
                  >
                    The
                  </Tag>
                </div>
                <div style={{marginBottom: "20px"}}>
                  <Tag
                    bck="#0e1731"
                    size="100px"
                    color="#ffffff"
                    add={{
                      display: "inline-block",
                      marginBottom: "20px"
                    }}
                  >
                    Players
                  </Tag>
                </div>
                <div className="tag_home_cards">
                  <Tag
                    bck="#ffffff"
                    size="27px"
                    color="#0e1731"
                    link={true}
                    linkto="/the_team"
                    add={{
                    
                      
                    }}
                  >
                    Meet them here
                  </Tag>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
      
    )
  }
}

export default MeetPlayers;
