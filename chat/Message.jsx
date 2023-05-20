import { useContext } from 'react';

import { Box, styled, Typography } from '@mui/material';
import { GetApp as GetAppIcon } from '@mui/icons-material';

import authSys from '../services/authSys';

// import { downloadMedia, formatDate } from '../../../utils/common-utils';


const Wrapper = styled(Box)`
    background: #FFFFFF;
    padding: 5px;
    max-width: 60%;
    width: fit-content;
    display: flex;
    margin-bottom:5px;
    border-radius: 10px;
    word-break: break-word;
`;
    
const Own = styled(Box)`
    background: #dcf8c6;
    padding: 5px;
    max-width:60%;
    width:fit-content;
    margin-left:auto;
    margin-right:10px;
    margin-bottom:5px;
    display: flex;
    border-radius: 5px;
    word-break: break-word;
   
`;

const Text = styled(Typography)`
    font-size: 14px;
    padding: 0 25px 0 5px;
`;

const Time = styled(Typography)`
    font-size: 10px;
    color: #919191;
    margin-top: 6px;
    word-break: keep-all;
    margin-top: auto;
`;
const TextMessage = ({ message }) => {
    
    return (
        <>
           
         
            <Text>{message.text}</Text>
            <Time>{message.timestamps}</Time>
        
        </>
    )
}

const ImageMessage = ({ message }) => {
    const iconPDF = 'https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/27_Pdf_File_Type_Adobe_logo_logos-512.png';

    return (
        <div style={{ position: 'relative' }}>
          
                    <img style={{ width: 300, height: '100%', objectFit: 'cover' }} src={message.text} alt={message.text} />
            
            <Time style={{ position: 'absolute', bottom: 0, right: 0 }}>
                {/* <GetAppIcon 
                    onClick={(e) => downloadMedia(e, message.text)} 
                    fontSize='small' 
                    style={{ marginRight: 10, border: '1px solid grey', borderRadius: '50%' }} 
                /> */}
              {message.timestamps}
            </Time>
        </div>
    )
}
const Message = ({ message }) => {
    const account  = authSys.getUser();

    return (
        <>
        {
            account.sub == message.senderId ? 
                <Own>
                    {
                        message.type == 'file' ? <ImageMessage message={message} /> : <TextMessage message={message} />
                    }
                </Own>
            : 
                <Wrapper>
                    {
                        message.type == 'file' ? <ImageMessage message={message} /> : <TextMessage message={message} />
                    }
                </Wrapper>
        }
        
        </>
    )
}




export default Message;