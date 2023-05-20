import { useState, useEffect, useContext } from 'react';

import { Box, styled, Divider } from '@mui/material';
import authSys from '../services/authSys';

import http from '../services/httpServer';
//components
import Conversation from './Conversation';


const Component = styled(Box)`
    overflow: overlay;
    height: 81vh;
`;

const StyledDivider = styled(Divider)`
    margin: 0 0 0 70px;
    background-color: #e9edef;
    opacity: .6;
`;

const Conversations = ({ text }) => {
    const [users, setUsers] = useState([]);
    
    const account  = authSys.getUser()

    useEffect(() => {
        const fetchData = async () => {
            let data = await http.get(`/login`);
            let fiteredData = data.filter(user => user.name.toLowerCase().includes(text.toLowerCase()));
            setUsers(fiteredData);
        }
        fetchData();
    }, [text]);

    // useEffect(() => {
    //     socket.current.emit('addUser', account);
    //     socket.current.on("getUsers", users => {
    //         setActiveUsers(users);
    //     })
    // }, [account])

    return (
        <Component>
            {
                users && users.map((user, index) => (
                    user.sub !== account.sub && 
                        <>
                            <Conversation user={user} />
                            {
                                users.length !== (index + 1)  && <StyledDivider />
                            }
                        </>
                ))
            }
        </Component>
    )
}

export default Conversations;