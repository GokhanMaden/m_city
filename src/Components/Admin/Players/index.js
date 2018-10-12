import React, { Component } from 'react'
import { Link } from "react-router-dom";

import AdminLayout from "../../../Hoc/AdminLayout";
import { firebasePlayers } from "../../../Firebase";
import { firebaseLooper } from '../../UI/Misc';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

class AdminPlayers extends Component {

  constructor(props) {
    super(props);

    this.state = {
      players: [],
      isLoading: true
    }
  }

  componentDidMount() {
    firebasePlayers.once("value").then((snapshot) => {
      const players = firebaseLooper(snapshot);

      this.setState({
        players,
        isLoading: false
      })
    })
  };

  render() {
    const progressBar = this.state.isLoading ? <CircularProgress thickness={7} style={{color: "#98c5e9"}} /> : ""
    
    const players = this.state.players ? this.state.players.map((player, index) => {
      return(
        <TableRow key={index}>
          <TableCell>
            <Link to={`/admin_players/add_players/${player.id}`}>
              {player.name}
            </Link>
          </TableCell>
          <TableCell>
            <Link to={`/admin_players/add_players/${player.id}`}>
              {player.lastname}
            </Link>
          </TableCell>
          <TableCell>{player.number}</TableCell>
          <TableCell>{player.position}</TableCell>
        </TableRow>
      )
    }): null;
    return (
      <AdminLayout>
        <div>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>First Name</TableCell>
                  <TableCell>Second Name</TableCell>
                  <TableCell>Number</TableCell>
                  <TableCell>Position</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {players}
              </TableBody>
            </Table>
          </Paper>
          <div className="admin_progress">
            { progressBar }
          </div>
        </div>
      </AdminLayout>
    )
  }
}

export default AdminPlayers;
