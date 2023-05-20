import React,{useState,useEffect,useRef} from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import  WhatsApp  from "./img/wathsapp.jpg"
import jwtDecode from "jwt-decode";
import {  Typography, List, Divider, Box, styled } from '@mui/material';
import {Table} from '@mui/joy';
import {MdGroups} from "react-icons/md"
import authSys from "../services/authSys";
import Footer from "./Footer";
import Search from "./Search";
import BasicMenu from "./Menu";
import TemporaryDrawer from "./drawer";
import http from "../services/httpServer";
import { MoreVert,Search as SearchIcon } from '@mui/icons-material';  
import { set } from "mongoose";
import Message from "./Message";
// state={
//      users:[],
//     text:"",
//     chat:[{picture:"",name:""}]
//   }
  
  // async fetchData() {
   
  //   let response1 = await http.get(`/login`);

  //   let {data} =response1; 
  //   console.log(data);
  //   this.setState({  users:response1.data})}
  
  //   componentDidMount(){
  // this.fetchData();}

  // componentDidUpdate(prevProps, prevState){
  // if (prevProps!==this.props)this.fetchData();}



const dialogStyle = {
  marginTop: '6%',
  height: '150%',
  width: '100%',
  maxWidth: '100%',
  maxHeight: '100%',
  borderRadius: 0,
  boxShadow: 'none',


}
const  Component1 = styled(Box)`
display: flex; 

`;
const  Component = styled(Box)`
display: flex; 

`;
const Container = styled(Box)`
display: flex; 
background-color:#f0f2f5;
height:65px;
width: 486px;
min-width: 486px;

`;
const Container1 = styled(Box)`
display: flex;
min-width: 486px;
background-color:#f0f2f5;
height:45px
magrin-left:auto
width: 486px;

`;
const LeftComponent = styled(Box)`
min-width: 486px;

`;
const LeftComponent1 = styled(Box)`
display: flex; 
min-width: 486px;
height:65px;

`;
const Divider1 = styled(Divider)`
margin=0 0 0 75px;
background-color:#e9eded;
`;

const Userdiv = styled(Box)`
display: flex; 

background-color: white;
height:65px
width: 486px;
min-width: 486px; 
margin-top:0px;
div:hover, p:hover {
 
background-color: #f0f2f5;
}

`;
const RightComponent = styled(Box)`
width: 73%;
min-width: 300px;
height: 100%;
border-left: 1px solid rgba(0, 0, 0, 0.14);
`;
const Backg =styled(Box)`
height: 80vh;
width:100%;
overflow-y: scroll;

;`
const Wrapper =styled(Box)`

background-image: url(https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png);

background-size: 50%;


;`
const Icon = styled(Box)`
color: #919191;
padding-left: 12px;
margin: 10px 15px 20px 20px;
height: 100%;
position: absolute;
`;
const Chatbox= ()=>{
  const [text, setText] = useState('');
  const [msg, setmsg] = useState('');
  // const [sendText, setsendText] = useState('');
const[users,setusers]=useState([])
const[chat,setchat]=useState([])
const[chatdata,setchatdata]=useState([])
const[setmsgflag,setsetmsgflag]=useState(false)
const user=authSys.getUser()
const [image, setImage] = useState();
const [file, setFile] = useState();
const scrollRef = useRef();
  async function postData(url, obj) {
    let response = await http.post(url, obj);
    let {data}=response
    console.log(data)

}
  const id=(a)=>{
  setchat(users[a])
  console.log(a)
  const user=authSys.getUser()
// let arr={senderId:user.sub,reciverId:users[a].sub,chat:[]}
//  postData("/chat",arr)
//  console.log(arr)
  }
  const  handleDataChange = (event) => {
   text = event.target.value;
  const user=authSys.getUser()
  let user2= text==""?  users:  users.filter(st =>!user? st.name.toLowerCase().includes( text.toLowerCase()):"")
  // Do something with the new data
  console.log('Received data:',  text);
  console.log('Received :', user2);
  
  };
  useEffect(() => {
    async function fetchData() {
       let response1 = await http.get(`/login`);

    let {data} =response1; 
    
    setusers(data)
  return data
  }

fetchData()
   
},[user.sub]);
  useEffect(() => {
    async function fetchData() {
       let response1 = await http.get(`/chat/${user.sub}/${chat.sub}`);

    let {data} =response1; 
  
    setchatdata(data)
  return data
  }

fetchData()
   
   
},[chat.sub,setmsgflag]);


let user2= text==""? users:users.filter(st => st.name.toLowerCase().includes( text.toLowerCase()))

const sendText = async (e) => {
  let code = e.keyCode || e.which;
   if(!msg) return;
  if(code === 13) { 
    let message = {};
    if (!file) {
        message = {
          senderId: user.sub,
          receiverId:chat.sub,
          type: 'text',
          text: msg
        };
     
    } else {
        message = {
          senderId: user.sub,
              receiverId:chat.sub,
              type: 'file',
              text: image
        };
      
    }
    postData("/chat",message)
        
 setmsg("")
   setFile('');
    setImage('');
  
    setsetmsgflag(prev=>!prev)
   
}
  


  
       
       
  }
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ transition: "smooth" })
}, [chatdata]);
  return (
    <Box>

      <Dialog
        open={true}
        BackdropProps={{style: {backgroundColor: 'unset'}}}
            maxWidth={'md'}
            PaperProps={{ sx: dialogStyle }}
      >
        <Component1 >
                   <Container >
                    <Box><TemporaryDrawer/> </Box>
          <Container1>
                 <MdGroups style={{marginLeft:150,width:"2rem",height:"5rem",marginTop:"0px"}}/> 
                 <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" style={{marginLeft:30 ,width:"5rem",height:"5rem",marginTop:"25px"}}>
                    <path fill="currentColor" d="M12.072,1.761c-3.941-0.104-7.579,2.105-9.303,5.65c-0.236,0.486-0.034,1.07,0.452,1.305 c0.484,0.235,1.067,0.034,1.304-0.45c1.39-2.857,4.321-4.637,7.496-4.553c0.539,0.02,0.992-0.4,1.013-0.939s-0.4-0.992-0.939-1.013 C12.087,1.762,12.079,1.762,12.072,1.761z M1.926,13.64c0.718,3.876,3.635,6.975,7.461,7.925c0.523,0.13,1.053-0.189,1.183-0.712 c0.13-0.523-0.189-1.053-0.712-1.183c-3.083-0.765-5.434-3.262-6.012-6.386c-0.098-0.53-0.608-0.88-1.138-0.782 C2.178,12.6,1.828,13.11,1.926,13.64z M15.655,21.094c3.642-1.508,6.067-5.006,6.201-8.946c0.022-0.539-0.396-0.994-0.935-1.016 c-0.539-0.022-0.994,0.396-1.016,0.935c0,0.005,0,0.009,0,0.014c-0.107,3.175-2.061,5.994-4.997,7.209 c-0.501,0.201-0.743,0.769-0.543,1.27c0.201,0.501,0.769,0.743,1.27,0.543C15.642,21.1,15.648,21.097,15.655,21.094z"></path>
                 <path fill="#009588" d="M19,1.5c1.657,0,3,1.343,3,3s-1.343,3-3,3s-3-1.343-3-3S17.343,1.5,19,1.5z"></path></svg> 
                 <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" style={{width:"5rem",height:"5rem" ,marginTop:"25px"}}>   
                        <path fill="currentColor" enable-background="new    " d="M19.005,3.175H4.674C3.642,3.175,3,3.789,3,4.821V21.02 l3.544-3.514h12.461c1.033,0,2.064-1.06,2.064-2.093V4.821C21.068,3.789,20.037,3.175,19.005,3.175z M14.016,13.044H7.041V11.1 h6.975V13.044z M17.016,9.044H7.041V7.1h9.975V9.044z"></path></svg>
                      
                       <BasicMenu/>
                       
                       </Container1>
</Container>


                <Box style={{borderLeft:"1px solid rgb(0,0,0,0.14)",backgroundColor:"#f0f2f5",width:"100%",height:"65px"}}>
                { chat.picture==undefined?"":     <div className="row">
           <div className="col-1" style={{float:"right",marginTop:"10px"}}> 
            <img src={ chat.picture} alt="" srcSet="" 
            style={{borderRadius:"85px",padding:"10px",width:"4rem",height:"4rem"}} />
     </div>
           <div className="col-2" style={{marginTop:"15px"}}>
           <Typography>{ chat.name}</Typography>
           <Typography>Online</Typography>
           </div>
           <div className="col-5"></div>
           
           <div className="col-1" style={{float:"right",marginTop:"25px"}}><SearchIcon style={{marginLeft:"118px"}}/></div>
           <div className="col-1" style={{float:"right",marginTop:"25px"}}><MoreVert style={{marginLeft:"118px"}}/></div>
      <div className="col-2"></div>


           </div>}
            
           
       
          
             </Box> <Divider1/>
            </Component1>
            <Component>
              <LeftComponent>
              <LeftComponent1>
              
              
           <Search style={{width:"200px"}}
            setText={setText}
            />
           <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" style={{width:"5rem",height:"5rem" ,marginTop:"10px"}}> 
            <path fill="currentColor" d="M10,18.1h4v-2h-4V18.1z M3,6.1v2h18v-2H3z M6,13.1h12v-2H6V13.1z"></path></svg>
       </LeftComponent1>
       <LeftComponent > 
       {  user2.map((us,index)=><>
       { us.name!=user.name?<><Userdiv  onClick={()=>id(index)}>
       <img src={us.picture} alt="" srcSet="" style={{borderRadius:"85px",padding:"10px",width:"4rem",height:"4rem",marginLeft:10}}/>
       <p style={{marginLeft:"25px",marginTop:"10px"}}>{us.name}</p>
   
      
       </Userdiv><Divider1/> </>:""}
         
      </> 
      
      
       )}   
          </LeftComponent>
          </LeftComponent>
              <RightComponent> 
                { chat.picture==undefined?
                 <img src={WhatsApp} alt="" srcSet="" className="img-fluid"/>: <>

                 <Wrapper>
<Backg>
    {
                    chatdata && chatdata.map(message => (
                        <Box style={{margin:10}}>
                            <Message message={message} />
                       </Box>
                    ))
                }

</Backg>
          </Wrapper>
              <Footer   sendText={setmsg}  
                  value={msg} 
                 
                setFile={setFile} 
                file={file} 
                setImage={setImage}
                setsendText={sendText}
                /></>}
              </RightComponent>
        </Component>
<div>
 
</div>





      </Dialog>
      
    </Box>
  );
}
export default  Chatbox