import React from 'react';
import Layout from "./Hoc/Layout";
import { Switch } from "react-router-dom";

import Home from "./Components/Home";
import SignIn from "./Components/SignIn";

import Dashboard from "./Components/Admin/Dashboard";
import PrivateRoutes from "./Components/AuthRoutes/PrivateRoutes";
import PublicRoutes from "./Components/AuthRoutes/PublicRoutes";
import AdminMatches from "./Components/Admin/Matches";
import AddEditMatch from "./Components/Admin/Matches/AddEditMatch";
import AdminPlayers from "./Components/Admin/Players";
import AddPlayers from "./Components/Admin/Players/AddEditPlayer";

const Routes = (props) => {

  return(
    <Layout>
      <Switch>
        <PrivateRoutes {...props} path="/admin_players/add_players/:id" exact component={AddPlayers}/>
        <PrivateRoutes {...props} path="/admin_players" exact component={AdminPlayers}/>
        <PrivateRoutes {...props} path="/admin_matches/edit_match" exact component={AddEditMatch}/>
        <PrivateRoutes {...props} path="/admin_matches/edit_match/:id" exact component={AddEditMatch}/>
        <PrivateRoutes {...props} path="/admin_matches" exact component={AdminMatches}/>
        <PrivateRoutes {...props} path="/dashboard" exact component={Dashboard}/>

        <PublicRoutes {...props} path="/sign_in" exact restricted={true} component={SignIn} /> 
        <PublicRoutes {...props} path="/" restricted={false} exact component={Home} />
      </Switch>
    </Layout>
  )
}

export default Routes;

//restricted={false} herkesin her koşulda ulaşabileceği bir path olmasını sağlıyor.
//Ama burada biz sign_in olmuş bir user'ı tekrardan sign_in'e ulaşmasını istemiyoruz.
//Bu sebep ile restricted={true} yapıyoruz.