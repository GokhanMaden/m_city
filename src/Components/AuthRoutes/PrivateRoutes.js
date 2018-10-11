import React from 'react'
import { Route, Redirect } from "react-router-dom";

//component: Comp yapmamızın sebebi <component> olarak çağıramayız
//Bu sebepten ötürü sadece ismini değiştirdik.
//...rest geri kalan herşey için kullanılıyor.

const PrivateRoutes = ({user, component: Comp, ...rest}) => {

  return <Route {...rest} component={(props) => (
    user ? <Comp {...props} user={user} /> : <Redirect to="/sign_in"/>
  )} />
}

export default PrivateRoutes
