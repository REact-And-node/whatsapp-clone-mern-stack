import * as React from 'react';

import Divider from '@mui/material/Divider';

import authSys from '../services/authSys';
import { styled, Drawer, Box, Typography } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import Profile from './Profile';
export default function TemporaryDrawer() {
  const [state, setState] = React.useState({
  
    left: false,
    
  });
  const user=authSys.getUser()

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
     
      <Divider />
    
    </Box>
  );
  const Component = styled(Box)`
  background: #f0f2f5;
  height: 85%;
`;

const Text = styled(Typography)`
    font-size: 18px;
    margin-bottom:15px
`
const handleClose = () => {

};
const Header = styled(Box)`
  background: #008069;
  height: 95px;
  color: #FFFFFF;
  display: flex;
  & > svg, & > p {
    margin-top: auto;
    
    font-weight: 600;
`;
const drawerStyle = {
    left: 20,
    top: 29,
    height: '95%',
    width: '34%',
    boxShadow: 'none'
}
  return (
    <div>
      
        <React.Fragment >
      <img src={user.picture} alt="" srcset="" style={{borderRadius:"85px",padding:"10px",width:"4rem",height:"4rem",marginLeft:10,marginTop:"10px"}} onClick={toggleDrawer('left', true)}/>
          <Drawer
            anchor={'left'}
            open={state['left']}
            onClose={toggleDrawer("left", false)}
            PaperProps={{ sx: drawerStyle }}
            style={{zIndex:1500,marginTop:"555px"}}
          >
            <Header>
             <ArrowBack onClick={toggleDrawer("left", false)} style={{marginBottom:15}}/>
             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <Text>Profile</Text>
           </Header>
            <Component>
                {user && <Profile />}
            </Component>
          </Drawer>
        </React.Fragment>
  
    </div>
  );
}