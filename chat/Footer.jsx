import { useEffect } from 'react';

import { EmojiEmotions, AttachFile, Mic } from '@mui/icons-material';
import { Box, styled, InputBase } from '@mui/material';
import http from '../services/httpServer';
// import { uploadFile } from '../../../service/api';

const Container = styled(Box)`
    height: 55px;
    background: #ededed;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 15px;
    &  > * {
        margin: 5px;
        color: #919191;
    }
`;

const Search = styled(Box)`
    border-radius: 18px;
    background-color: #FFFFFF;
    width: calc(94% - 100px);
`;

const InputField = styled(InputBase)`
    width: 100%;
    padding: 20px;
    padding-left: 25px;
    font-size: 14px;
    height: 20px;
    width: 100%;
`;

const ClipIcon = styled(AttachFile)`
    transform: 'rotate(40deg)'
`;


const Footer = ({ sendText, value, setsendText, setFile, file, setImage }) => {
  
  
    async function postData(url, obj) {
        let response = await http.post(url, obj);
        let {data}=response
        setImage(data)
        console.log("data",data)
    
    }
    useEffect(() => {
        const getImage = async () => {
            if (file) {
                var data = new FormData();
                data.append("name", file.name);
                data.append("file", file);
      
            
         postData("/upload",data)
         
            }
        }
        getImage();
    }, [file])

    const onFileChange = (e) => {
        console.log(e)
       setFile(e.target.files[0]); 
        sendText(e.target.files[0].name);
       
        console.log("e.target.files[0]",e.target.files[0])
    }

    return (
        <Container>
            <EmojiEmotions />
            <label htmlFor="fileInput">
                <ClipIcon />
            </label>
            <input
                type='file'
                id="fileInput"
                style={{ display: 'none' }}
                 onChange={(e) => onFileChange(e)}
            />

            <Search>
                <InputField
                    placeholder="Type a message"
                    inputProps={{ 'aria-label': 'search' }}
                     onChange={(e) => sendText(e.target.value)}
                    onKeyPress={(e) =>setsendText(e) }
                    value={value}
                />
            </Search>
            <Mic />
        </Container>
    )
}

export default Footer;