import {Box , Button , Flex , StackDivider , Link, HStack,VStack,Container} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react'
import { ethers } from 'ethers';
import {Modal,ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody,ModalCloseButton, FormControl , FormLabel, Input} from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { Select } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import { Image } from '@chakra-ui/react'
import { Link as Linkroute} from "react-router-dom";
import { useState ,useEffect } from 'react';


const Home = ({accounts,wbtccontract,wethcontract,usdccontract,daicontract}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const iswalletconnected = Boolean(accounts[0]);
    const toast = useToast();
    const [balance, setbalance] = useState();
    const [balancestatment, setbalancestatment] = useState("");
    

    
    

    const gettestcoins = async () => {
        const amount = document.getElementById('amount').value;
        const amount_ethformat = ethers.utils.parseEther(amount.toString());
        const choosetesttokens = document.getElementById("choosetesttokens");
        var choosentokenname = choosetesttokens.options[choosetesttokens.selectedIndex].text;

        if (choosentokenname == "WBTC"){
            const wbtctx = await (await wbtccontract.GetSomeTestTokens(amount_ethformat)).wait();
            if ( wbtctx.hash ||wbtctx.transactionHash){
                toast({
                    title: 'success',
                    description: "You have earned WBTC test tokens ",
                    status: 'success',
                    duration: 1800,
                    isClosable: true,
                    position: 'top-left',   
                });
               
            }
            const wbtcbalance = await wbtccontract.balanceOf(accounts[0]);
            const balance = Number(wbtcbalance)/1e18;
            setbalancestatment ("Your WBTC balance is ");
            setbalance(balance);
            

        }
        if (choosentokenname == "WETH"){
            const wethtx = await (await wethcontract.GetSomeTestTokens(amount_ethformat)).wait();
            if ( wethtx.hash ||wethtx.transactionHash){
                toast({
                    title: 'success',
                    description: "You have earned WETH test tokens ",
                    status: 'success',
                    duration: 1800,
                    isClosable: true,
                    position: 'top-left',   
                });
               
            }    
            const wethbalance = await wethcontract.balanceOf(accounts[0]);
            const balance = Number(wethbalance)/1e18;

            setbalancestatment ("Your WETH balance is ");
            setbalance(balance);

            
        }
        if (choosentokenname == "USDC"){
            const usdctx = await (await usdccontract.GetSomeTestTokens(amount_ethformat)).wait();
            if ( usdctx.hash ||usdctx.transactionHash){
                toast({
                    title: 'success',
                    description: "You have earned USDC test tokens ",
                    status: 'success',
                    duration: 1800,
                    isClosable: true,
                    position: 'top-left',   
                });
               
            }
            const usdcbalance = await usdccontract.balanceOf(accounts[0]);
            const balance = Number(usdcbalance)/1e18;

            setbalancestatment ("Your USDC balance is ");
            setbalance(balance);

            
        }
        if (choosentokenname == "DAI"){
            const daitx = await (await daicontract.GetSomeTestTokens(amount_ethformat)).wait();
            if ( daitx.hash ||daitx.transactionHash){
                toast({
                    title: 'success',
                    description: "You have earned DAI test tokens ",
                    status: 'success',
                    duration: 1800,
                    isClosable: true,
                    position: 'top-left',   
                });
               
            }
            const daibalance = await daicontract.balanceOf(accounts[0]);
            const balance = Number(daibalance)/1e18;

            setbalancestatment ("Your DAI balance is ");
            setbalance(balance);

        }
    }

    return (

        <VStack
        divider={<StackDivider borderColor='gray.200' />}
        spacing={0}
        align='stretch'
        >
        
        <Box bgGradient='linear(to-r, white,azure,azure)' height="878px">
        <br></br>  <br></br><br></br> <br></br> <br></br> <br></br><br></br> 
        <Box>
            <HStack spacing='24px'> 
                <Box>
                <VStack
                divider={<StackDivider borderColor='azure' />}
                spacing={4}
                align='stretch'
               
                >   
                    <br></br>
                    <Box w='620px' h='37px' fontFamily="Lucida Console" ml={100} fontSize="44px"  >
                        Welcome to DEXita Swap!
                    </Box>
                    <Box w='760px' fontFamily="Lucida Console" ml={100} fontSize="24px" >
                        DEXita is a decentralized exchange for swapping between tokens. Users can be liquidity providers by adding
                        and Removing liquidity. DEXita is deployed on Mumbai Polygon Network. For testing DEXita, click on Demo Coins to earn test tokens.
                    </Box>
                    <HStack spacing='50px' ml={10}>
                        <Box ml={20}>
                            <Button 
                                as= {Linkroute}
                                to= "/swap"
                                backgroundColor="steelblue"
                                fontWeight='extrabold'
                                fontSize="28px"
                                colorScheme='teal' 
                                variant='solid'
                                borderRadius= "60px"
                                width="150px"
                                height="75px"
                                >Swap
                                </Button>
                        </Box>
                        <Box >
                                <Button 
                                    backgroundColor="steelblue"
                                    fontWeight='extrabold'
                                    fontSize="25px"
                                    colorScheme='teal' 
                                    borderRadius= "60px"
                                    width="197px"
                                    height="83px"
                                    onClick={onOpen}
                                    
                                    >Demo coins
                                </Button>
                        </Box>
                        <Box >
                                <Button 
                                    as= {Linkroute}
                                    varient="link"
                                    to= "/liquiditypool"
                                    backgroundColor="steelblue"
                                    fontWeight='extrabold'
                                    fontSize="28px"
                                    colorScheme='teal' 
                                    borderRadius= "60px"
                                    width="150px"
                                    height="75px"
                                    
                                    >Pool
                                </Button>
                        </Box>

                    </HStack>
                    

                </VStack>
                  
                </Box>
                
                <Box w='675px' h='420px' >
                    <Image src="https://thuvientaichinh.com/wp-content/uploads/swap-coin-la-gi-3.jpg" ml={320}></Image>
                </Box>
            
            </HStack>
        </Box>
        
       

    
               
        <br></br> <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
            <Box fontSize="18px" fontWeight="bold" >
                <Flex justify="center"  >
                    Made with {"\u2665" } By: Eidoox
                </Flex>
                    <HStack spacing='24px' justify="center" color="blue.500" >
                        <Link href="https://www.linkedin.com/in/eidoox/" external>Linkedin</Link> 
                        <Link href="https://github.com/Eidoox">GitHub</Link>
                        <Link href="https://eidoox.hashnode.dev/"> Blogs</Link>
                    </HStack>
            </Box>

            </Box>

            <Modal isOpen={isOpen} onClose={onClose} size="xl" >
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Earn test tokens for the demo</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Tabs variant='unstyled' isFitted>
                    <TabList>
                        <Tab _selected={{ color: 'white', bg: 'cyan.600' }}> DEXita test tokens </Tab>
                        <Tab _selected={{ color: 'white', bg: 'cyan.600' }}> MATIC mumbai polygon</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <br></br>
                            <Container  border='1px' borderColor='cyan.800' height="300px" borderWidth={2} borderRadius= "50px">
                    <FormControl justify="center">
                    {iswalletconnected?
                    <VStack
                        divider={<StackDivider borderColor='azure' />}
                        spacing={4}
                        align='stretch'
                        >
                        <br></br>
                        <Box h='80px' bg='white'>
                        <FormLabel for="amountin" fontSize={20}>Amount</FormLabel>
                        <HStack spacing='24px'>
                            <Box w='350px' h='60px' bg='white'>
                                <Input id="amount" variant='outline' placeholder='0.0' height="60px" width="325px" borderWidth={1}  fontSize={25} />
                            </Box>
                            <Box w='120px' h='60px' bg='white'>
                                <Select id="choosetesttokens" height="60px" width="120px" borderWidth={1} >
                                    <option value='ETH'>WETH</option>
                                    <option value='WBTC'>WBTC</option>
                                    <option value='WBTC'>USDC</option>
                                    <option value='WBTC'>DAI</option>
                                  
                                </Select>
                            </Box>
                           
                        </HStack>
                   
                        
                                                
                        </Box>
                        
                        <Box bg='white' mt={1}>
                            <Button 
                              backgroundColor="cyan.700"
                              fontWeight='extrabold'
                              fontSize="23px"
                              colorScheme='green' 
                              variant='solid'
                              borderRadius= "100px"
                              width="140px"
                              height="55px"
                              ml="165px"
                              
                              type="submit"
                              onClick={gettestcoins}
                             
                              >Earn
                            </Button>

                        </Box>
                        
                        <Flex bg='white' fontSize={15} fontFamily="Lucida Console" fontWeight="bold" justify="center">
                                {balancestatment} {balance}
                        </Flex>
                        
                        

                            

                    </VStack>
                    :
                    <VStack
                    divider={<StackDivider borderColor='azure' />}
                    spacing={4}
                    align='stretch'
                    >
                   <Box>
                    <br></br><br></br><br></br><br></br>
                        <Flex justify = "center" fontFamily="Lucida Console"  fontSize="22px" fontWeight="extrabold" >
                            Connect Wallet 
                        </Flex>
                        <Flex justify = "center" fontFamily="Lucida Console"  fontSize="19px" fontWeight="extrabold" >
                            To earn demo coins to test DEXita Swap
                        </Flex>
                 
                    </Box>
                


                    </VStack>
            }
                    </FormControl>
                  </Container>
                       

                        
                    </TabPanel>
                        <TabPanel>
                        <br></br>
                    
                            <VStack
                                divider={<StackDivider borderColor='azure' />}
                                spacing={4}
                                align='stretch'
                                >
                                    <Box fontFamily="Lucida Console" fontSize="15px" fontWeight="extrabold">
                                        Earn MATIC for Mumbai Polygon Network From <Link href= "https://faucet.polygon.technology/" color="blue"> here</Link>
                                    </Box>
                                    <Box fontFamily="Lucida Console" fontSize="15px" fontWeight="extrabold">
                                        Choose Mumbai Network and Matic Token
                                    </Box>
                                    <Box fontFamily="Lucida Console" fontSize="15px" fontWeight="extrabold">
                                        Then Paste your MetaMask wallet address
                                    </Box>
                            



                     
                            </VStack>

                

                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </ModalBody>

            <ModalFooter>
                <Button colorScheme='blue' backgroundColor="cyan.700" mr={3} onClick={onClose}>
                Close
                </Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
     


        </VStack>


    );
};

export default Home;