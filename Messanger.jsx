

import React,{Component} from "react";
import LoginDialog from "./accountlogin/logindialog";
import { GoogleOAuthProvider } from '@react-oauth/google';
import authSys from "./services/authSys";

class MainComponent extends Component {

   
render() {
 
const client="678608758106-dcub296sppufv0a9vfe0v1732l95ud2k.apps.googleusercontent.com"

const user=authSys.getUser()
return(
   <GoogleOAuthProvider clientId={client}>
<LoginDialog/>


 
    </GoogleOAuthProvider>
)
}
}
export default MainComponent