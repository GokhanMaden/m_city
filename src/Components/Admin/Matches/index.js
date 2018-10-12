import React, { Component } from 'react';
import { Link } from "react-router-dom";

import AdminLayout from "../../../Hoc/AdminLayout";
import { firebaseMatches } from "../../../Firebase";
import { firebaseLooper, reverseArray } from '../../UI/Misc';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

class AdminMatches extends Component {

  constructor(props) {
    super(props);

    this.state = {
      matches: [],
      isLoading: true
    }
  }

  componentDidMount() {
    firebaseMatches.once("value").then((snapshot) => {
      const matches = firebaseLooper(snapshot)
      this.setState({
        matches: reverseArray(matches),
        isLoading: false
      })
    })

  }
  render() {
    console.log(this.state)

    const progressBar = this.state.isLoading ? <CircularProgress thickness={7} style={{color: "#98c5e9"}} /> : ""

    const tableRow  = this.state.matches ? this.state.matches.map((match, index) => {

      let final = (match.final === "Yes") ? 
        (<span className="matches_tag_red">Final</span>) : 
        (<span className="matches_tag_green">Not played yet</span>);
        
      return (<TableRow key={index}>
              <TableCell>{match.date}</TableCell>
              <TableCell>
                <Link to={`/admin_matches/edit_match/${match.id}`} >
                  {match.local} - {match.away}
                </Link>
              </TableCell>
              <TableCell>{match.resultLocal} - {match.resultAway}</TableCell>
              <TableCell>{final}</TableCell>
             </TableRow>)
    }) : null;
    return (
      <AdminLayout>
        <div>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Match</TableCell>
                  <TableCell>Result</TableCell>
                  <TableCell>Final</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { tableRow }
              </TableBody>
            </Table>
          </Paper>
          <div className="admin_progress">
            { progressBar }
          </div>
        </div>
      </AdminLayout>
    );
  }
}

export default AdminMatches;
