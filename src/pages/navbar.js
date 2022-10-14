import {Box , Button , Flex , Container , Spacer, HStack,VStack} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/react'
import {Menu,MenuButton, MenuList,MenuItem} from '@chakra-ui/react'

import { Link } from "react-router-dom";

const Navbar = ({accounts , setaccounts,connectwallet}) => {
    const iswalletconnected = Boolean(accounts[0]);
 
    
 
    return (

        <Flex justify= "space-between" padding="15px"  bg="white" >
                <Flex></Flex><Flex></Flex><Flex></Flex>
                <HStack spacing="260" justify="space-between" position= "sticky" >
                    <Flex as={Link} to= "/" fontWeight='extrabold' fontSize="20px" bgClip='text'  bgGradient='linear(to-r, cyan.500, pink.900)' fontFamily="fantasy" mr={300}>
                        DEXita Swap
                    </Flex>
                    
                    <Button as={Link} varient="link" backgroundColor= "white" to="/" fontSize="20px" fontWeight="bold"> Home</Button>
                    <Button as={Link} varient="link" backgroundColor= "white" to="/swap" fontSize="20px" fontWeight="bold" > Swap</Button>
                    <Button as={Link} varient="link" backgroundColor= "white" to="/liquiditypool" fontSize="20px" fontWeight="bold"> Liquidity Pools</Button>
                    
                    {/* Connect button*/}
                    {iswalletconnected ? (
                        <Box as='button' backgroundColor="lightgreen" borderRadius= "100px" width="145px" height="60px" fontStyle="bold" fontSize={19} > {accounts[0].slice(0, 5) + '...' + accounts[0].slice(38, 42)}</Box>
                    
                    ): (
                        <Button 
                        backgroundColor="gray"
                        colorScheme='green' 
                        variant='solid'
                        borderRadius= "100px"
                        width="10%" 
                        height="57px"
                        fontSize={20}
                        onClick={connectwallet}>Connect Wallet</Button>
                    )}

                </HStack>

        </Flex>
        

    );
};

export default Navbar;