import {Box , Button , Flex , Container , Text, HStack,VStack,StackDivider} from '@chakra-ui/react';
import {Modal,ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody,ModalCloseButton, FormControl , FormLabel, Input} from '@chakra-ui/react'
import { ethers } from 'ethers';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { Select } from '@chakra-ui/react'
import {Menu,MenuButton,MenuList,MenuItem,MenuItemOption,MenuGroup,MenuOptionGroup,MenuDivider} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/react'
import { Link } from "react-router-dom";


const LiquidityProvider =  ({accounts,wbtccontract,wethcontract,usdccontract,daicontract,dexcontract,wethreserves_pair1,setwethreserves_pair1,usdcreserves_pair1,setusdcreserves_pair1,wbtcreserves_pair2,setwbtcreserves_pair2,wethreserves_pair2,setwethreserves_pair2, usdcreserves_pair3,setusdcreserves_pair3, daireserves_pair3,setdaireserves_pair3}) => {
    const iswalletconnected = Boolean(accounts[0]);
    const toast = useToast();
  
    

    // For added amount of token of each user per pool
    const [mywethamount_pair1 , setmywethamount_pair1] = useState();
    const [myusdcamount_pair1 , setmyusdcamount_pair1] = useState();
    const [mywbtcamount_pair2 , setmywbtcamount_pair2] = useState();
    const [mywethamount_pair2 , setmywethamount_pair2] = useState();
    const [myusdcamount_pair3 , setmyusdcamount_pair3] = useState();
    const [mydaiamount_pair3 , setmydaiamount_pair3] = useState();

    // for token names
    const [wbtctokenname , setwbtctokenname] = useState("");
    const [wethtokenname , setwethtokenname] = useState("");    
    const [usdctokenname , setusdctokenname] = useState("");
    const [daitokenname , setdaitokenname] = useState("");

    // For dexita lp tokens per pool
    const [dexitalptokens_1 , setmydexitalp_1] = useState();
    const [dexitalptokens_2 , setmydexitalp_2] = useState();
    const [dexitalptokens_3 , setmydexitalp_3] = useState();




    const [token1name , settoken1name] = useState("WETH");
    const [token2name , settoken2name] = useState("USDC");
    const [dexitalptokenname , setdexitalptokenname] = useState("");


    const { isOpen, onOpen, onClose } = useDisclosure();
    
    useEffect(() => {
        getliquiditydata();
      }, []);

      // Adding liquidity WETH/USDC pair
    const addliquidity_wethusdcpair = async () =>{ 
        try{
            //WETH/USDC
            const wethamount = document.getElementById('wethamount1').value;
            const usdcamount = document.getElementById('usdcamount1').value;
            const wethamount1_ethformat = ethers.utils.parseEther(wethamount.toString());
            const usdcamount1_ethformat = ethers.utils.parseEther(usdcamount.toString());

            const wethtxapproval =  await (await wethcontract.approve(dexcontract.address,wethamount1_ethformat ) ).wait();
            if ( wethtxapproval.hash ||wethtxapproval.transactionHash){
                toast({
                    title: 'WETH Aprroval Success',
                    description: "Wait for next MetaMask confirmations to complete the process",
                    status: 'success',
                    duration: 1600,
                    isClosable: true,
                    position: 'top-left',   
                });
            }
            const usdctxapproval =  await (await usdccontract.approve(dexcontract.address,usdcamount1_ethformat ) ).wait();
            if ( usdctxapproval.hash ||usdctxapproval.transactionHash){
                toast({
                    title: 'USDC Aprroval Success',
                    description: "Wait for next MetaMask confirmation to complete the process",
                    status: 'success',
                    duration: 1600,
                    isClosable: true,
                    position: 'top-left',   
                });
            }
            const wethusdctxadding_liquidity = await (await dexcontract.AddLiquidityERC20tokens (wethcontract.address, wethamount1_ethformat, usdccontract.address , usdcamount1_ethformat, 1)).wait();

            if ( wethusdctxadding_liquidity.hash ||wethusdctxadding_liquidity.transactionHash){
                toast({
                    title: 'Adding Liquidity WETH/USDC pool successfully done',
                    description: "Congratulations! Now you become Liquidity provider for WETH/USDC pool",
                    status: 'success',
                    duration: 1800,
                    isClosable: true,
                    position: 'top-left',   
                });
            }
        }
        catch(error){
            console.log(error.data.message)
            
        }
    }

     // Adding liquidity WBTC/WETH pair
     const addliquidity_wbtcwethpair = async () =>{ 
        try{
            const wbtcamount = document.getElementById('wbtcamount2').value;
            const wethamount = document.getElementById('wethamount2').value;
            const wbtcamount2_ethformat = ethers.utils.parseEther(wbtcamount.toString());
            const wethamount2_ethformat = ethers.utils.parseEther(wethamount.toString());

            const wbtctxapproval =  await (await wbtccontract.approve(dexcontract.address,wbtcamount2_ethformat ) ).wait();
            if ( wbtctxapproval.hash ||wbtctxapproval.transactionHash){
                toast({
                    title: 'WBTC Aprroval Success',
                    description: "Wait for next MetaMask confirmations to complete the process",
                    status: 'success',
                    duration: 1800,
                    isClosable: true,
                    position: 'top-left',   
                });
            }
            const wethtxapproval =  await (await wethcontract.approve(dexcontract.address,wethamount2_ethformat ) ).wait();
            if ( wethtxapproval.hash ||wethtxapproval.transactionHash){
                toast({
                    title: 'WETH Aprroval Success',
                    description: "Wait for next MetaMask confirmation to complete the process",
                    status: 'success',
                    duration: 1800,
                    isClosable: true,
                    position: 'top-left',   
                });
            }
            const wbtcwethtxadding_liquidity = await (await dexcontract.AddLiquidityERC20tokens (wbtccontract.address, wbtcamount2_ethformat, wethcontract.address , wethamount2_ethformat, 2)).wait();

            if ( wbtcwethtxadding_liquidity.hash ||wbtcwethtxadding_liquidity.transactionHash){
                toast({
                    title: 'Adding Liquidity WBTC/WETH pool successfully done',
                    description: "Congratulations! Now you become Liquidity provider for WBTC/WETH pool",
                    status: 'success',
                    duration: 1900,
                    isClosable: true,
                    position: 'top-left',   
                });
            }
        }
        catch(error){
            console.log(error)
            
        }
    }
    

        // Adding liquidity USDC/DAI pair
        const addliquidity_usdcdaipair = async () =>{ 
            try{
                const usdcamount = document.getElementById('usdcamount3').value;
                const daiamount = document.getElementById('daiamount3').value;
                const usdcamount3_ethformat = ethers.utils.parseEther(usdcamount.toString());
                const daiamount3_ethformat = ethers.utils.parseEther(daiamount.toString());
    
                const usdctxapproval =  await (await usdccontract.approve(dexcontract.address,usdcamount3_ethformat ) ).wait();
                if ( usdctxapproval.hash ||usdctxapproval.transactionHash){
                    toast({
                        title: 'USDC Aprroval Success',
                        description: "Wait for next MetaMask confirmations to complete the process",
                        status: 'success',
                        duration: 1600,
                        isClosable: true,
                        position: 'top-left',   
                    });
                }
                const daitxapproval =  await (await daicontract.approve(dexcontract.address,daiamount3_ethformat ) ).wait();
                if ( daitxapproval.hash ||daitxapproval.transactionHash){
                    toast({
                        title: 'DAI Aprroval Success',
                        description: "Wait for next MetaMask confirmation to complete the process",
                        status: 'success',
                        duration: 1600,
                        isClosable: true,
                        position: 'top-left',   
                    });
                }
                const usdcdaitxadding_liquidity = await (await dexcontract.AddLiquidityERC20tokens (usdccontract.address, usdcamount3_ethformat, daicontract.address , daiamount3_ethformat, 3)).wait();
    
                if ( usdcdaitxadding_liquidity.hash ||usdcdaitxadding_liquidity.transactionHash){
                    toast({
                        title: 'Adding Liquidity USDC/DAI pool successfully done',
                        description: "Congratulations! Now you become Liquidity provider for USDC/DAI pool",
                        status: 'success',
                        duration: 1800,
                        isClosable: true,
                        position: 'top-left',   
                    });
                }
            }
            catch(error){
                console.log(error.data.message)
                
            }
        }

    // Remove liquidity from WETH/USDC pool
    const removeliquidity_wethusdc = async () =>{
        try{
            const amount1percent = document.getElementById("lptokens1");
            var amount1percent_selected = amount1percent.options[amount1percent.selectedIndex].value;  
            if (amount1percent_selected == 25){
                const txremoveliquidity_wethusdc = await (await dexcontract.Remove_Liquidity (wethcontract.address, usdccontract.address, 25,1) ).wait();
                if ( txremoveliquidity_wethusdc.hash ||txremoveliquidity_wethusdc.transactionHash){
                    toast({
                        title: 'Removing Liquidity successfully done',
                        description: 'Your removed 25% of your Dexita LP tokens from WETH/USDC pool',
                        status: 'success',
                        duration: 1900,
                        isClosable: true,
                        position: 'top-left',   
                    });
                }
            }
            if (amount1percent_selected == 50){
                const txremoveliquidity_wethusdc = await (await dexcontract.Remove_Liquidity (wethcontract.address, usdccontract.address, 50,1) ).wait();
                if ( txremoveliquidity_wethusdc.hash ||txremoveliquidity_wethusdc.transactionHash){
                    toast({
                        title: 'Removing Liquidity successfully done',
                        description: 'Your removed 50% of your Dexita LP tokens from WETH/USDC pool',
                        status: 'success',
                        duration: 1900,
                        isClosable: true,
                        position: 'top-left',   
                    });
                }
            }
            if (amount1percent_selected == 75){
                const txremoveliquidity_wethusdc = await (await dexcontract.Remove_Liquidity (wethcontract.address, usdccontract.address, 75,1) ).wait();
                if ( txremoveliquidity_wethusdc.hash ||txremoveliquidity_wethusdc.transactionHash){
                    toast({
                        title: 'Removing Liquidity successfully done',
                        description: 'Your removed 75% of your Dexita LP tokens from WETH/USDC pool',
                        status: 'success',
                        duration: 1900,
                        isClosable: true,
                        position: 'top-left',   
                    });
                }
            }
            if (amount1percent_selected == 100){
                const txremoveliquidity_wethusdc = await (await dexcontract.Remove_Liquidity (wethcontract.address, usdccontract.address, 100,1) ).wait();
                if ( txremoveliquidity_wethusdc.hash ||txremoveliquidity_wethusdc.transactionHash){
                    toast({
                        title: 'Removing Liquidity successfully done',
                        description: 'Your removed 100% of your Dexita LP tokens from WETH/USDC pool',
                        status: 'success',
                        duration: 1900,
                        isClosable: true,
                        position: 'top-left',   
                    });
                }
            }
            

        }
        catch(error){
            console.log(error);
        }

    }

    // Remove liquidity from WBTC/ETH pool
    const removeliquidity_wbtcweth = async () =>{
        try{
            const amount2percent = document.getElementById("lptokens2");
            var amount2percent_selected = amount2percent.options[amount2percent.selectedIndex].value;  
            if (amount2percent_selected == 25){
                const txremoveliquidity_wbtcweth = await (await dexcontract.Remove_Liquidity (wbtccontract.address, wethcontract.address, 25,2) ).wait();
                if ( txremoveliquidity_wbtcweth.hash ||txremoveliquidity_wbtcweth.transactionHash){
                    toast({
                        title: 'Removing Liquidity successfully done',
                        description: 'Your removed 25% of your Dexita LP tokens from WBTC/WETH pool',
                        status: 'success',
                        duration: 1900,
                        isClosable: true,
                        position: 'top-left',   
                    });
                }
            }
            if (amount2percent_selected == 50){
                const txremoveliquidity_wbtcweth = await (await dexcontract.Remove_Liquidity (wbtccontract.address, wethcontract.address, 50,2) ).wait();
                if ( txremoveliquidity_wbtcweth.hash ||txremoveliquidity_wbtcweth.transactionHash){
                    toast({
                        title: 'Removing Liquidity successfully done',
                        description: 'Your removed 50% of your Dexita LP tokens from WBTC/WETH pool',
                        status: 'success',
                        duration: 1900,
                        isClosable: true,
                        position: 'top-left',   
                    });
                }
            }
            if (amount2percent_selected == 75){
                const txremoveliquidity_wbtcweth = await (await dexcontract.Remove_Liquidity (wbtccontract.address, wethcontract.address, 75,2) ).wait();
                if ( txremoveliquidity_wbtcweth.hash ||txremoveliquidity_wbtcweth.transactionHash){
                    toast({
                        title: 'Removing Liquidity successfully done',
                        description: 'Your removed 75% of your Dexita LP tokens from WBTC/WETH pool',
                        status: 'success',
                        duration: 1900,
                        isClosable: true,
                        position: 'top-left',   
                    });
                }
            }
            if (amount2percent_selected == 100){
                const txremoveliquidity_wbtcweth = await (await dexcontract.Remove_Liquidity (wbtccontract.address, wethcontract.address, 100,2) ).wait();
                if ( txremoveliquidity_wbtcweth.hash ||txremoveliquidity_wbtcweth.transactionHash){
                    toast({
                        title: 'Removing Liquidity successfully done',
                        description: 'Your removed 100% of your Dexita LP tokens from WBTC/WETH pool',
                        status: 'success',
                        duration: 1900,
                        isClosable: true,
                        position: 'top-left',   
                    });
                }
            }

        }
        catch(error){
            console.log(error);
        }

    }

// Remove liquidity from USDC/DAI pool
const removeliquidity_usdcdai = async () =>{
    try{
        const amount3percent = document.getElementById("lptokens3");
        var amount3percent_selected = amount3percent.options[amount3percent.selectedIndex].value;  
        if (amount3percent_selected == 25){
            const txremoveliquidity_usdcdai = await (await dexcontract.Remove_Liquidity (usdccontract.address, daicontract.address, 25,3) ).wait();
            if ( txremoveliquidity_usdcdai.hash ||txremoveliquidity_usdcdai.transactionHash){
                toast({
                    title: 'Removing Liquidity successfully done',
                    description: 'Your removed 25% of your Dexita LP tokens from USDC/DAI pool',
                    status: 'success',
                    duration: 1900,
                    isClosable: true,
                    position: 'top-left',   
                });
            }
        }
        if (amount3percent_selected == 50){
            const txremoveliquidity_usdcdai = await (await dexcontract.Remove_Liquidity (usdccontract.address, daicontract.address, 50,3) ).wait();
            if ( txremoveliquidity_usdcdai.hash ||txremoveliquidity_usdcdai.transactionHash){
                toast({
                    title: 'Removing Liquidity successfully done',
                    description: 'Your removed 50% of your Dexita LP tokens from USDC/DAI pool',
                    status: 'success',
                    duration: 1900,
                    isClosable: true,
                    position: 'top-left',   
                });
            }
        }
        if (amount3percent_selected == 75){
            const txremoveliquidity_usdcdai = await (await dexcontract.Remove_Liquidity (usdccontract.address, daicontract.address, 75,3) ).wait();
            if ( txremoveliquidity_usdcdai.hash ||txremoveliquidity_usdcdai.transactionHash){
                toast({
                    title: 'Removing Liquidity successfully done',
                    description: 'Your removed 75% of your Dexita LP tokens from USDC/DAI pool',
                    status: 'success',
                    duration: 1900,
                    isClosable: true,
                    position: 'top-left',   
                });
            }
        }
        if (amount3percent_selected == 100){
            const txremoveliquidity_usdcdai = await (await dexcontract.Remove_Liquidity (usdccontract.address, daicontract.address, 100,3) ).wait();
            if ( txremoveliquidity_usdcdai.hash ||txremoveliquidity_usdcdai.transactionHash){
                toast({
                    title: 'Removing Liquidity successfully done',
                    description: 'Your removed 100% of your Dexita LP tokens from USDC/DAI pool',
                    status: 'success',
                    duration: 1900,
                    isClosable: true,
                    position: 'top-left',   
                });
            }
        }
    }
    catch(error){
      console.log(error);
    }

}
    // Retrieve data of pools (reserves , totalsupply, ....)
    const getliquiditydata = async () => {
        //Contract Reserves
        const wethusdc = await dexcontract.GetReservesPerpair(1,wethcontract.address , usdccontract.address);
        const wbtcweth = await dexcontract.GetReservesPerpair(2,wbtccontract.address , wethcontract.address);
        const usdcdai = await dexcontract.GetReservesPerpair(3,usdccontract.address , daicontract.address);
        // WETH/USDC
        setwethreserves_pair1(Number(wethusdc[0])/1e18);
        setusdcreserves_pair1(Number(wethusdc[1])/1e18);
        // WBTC/WETH
        setwbtcreserves_pair2(Number(wbtcweth[0])/1e18);
        setwethreserves_pair2(Number(wbtcweth[1])/1e18);
        //USDC/DAI
        setusdcreserves_pair3(Number(usdcdai[0])/1e18);
        setdaireserves_pair3(Number(usdcdai[1])/1e18);

        // My Reserves
        // WETH/USDC Pool
        const mywethusdcamount = await dexcontract.GetMyaddedtokensinpools(wethcontract.address , usdccontract.address,1);
        // WBTC/WETH Pool
        const mywbtwethamount = await dexcontract.GetMyaddedtokensinpools(wbtccontract.address , wethcontract.address,2);
        // USDC/DAI pool 
        const myusdcdaiamount = await dexcontract.GetMyaddedtokensinpools(usdccontract.address , daicontract.address,3);

        setmywethamount_pair1(Number(mywethusdcamount[0])/1e18);
        setmyusdcamount_pair1(Number(mywethusdcamount[1])/1e18);

        setmywbtcamount_pair2(Number(mywbtwethamount[0])/1e18);
        setmywethamount_pair2(Number(mywbtwethamount[1])/1e18);

        setmyusdcamount_pair3(Number(myusdcdaiamount[0])/1e18);
        setmydaiamount_pair3(Number(myusdcdaiamount[1])/1e18);

        // Total DexitaLP tokens earned per pool
        const mydexitalp_wethusdc = await dexcontract.GetMydexitalptokens(wethcontract.address , usdccontract.address,1);
        const mydexitalp_wbtcweth = await dexcontract.GetMydexitalptokens(wbtccontract.address , wethcontract.address,2);
        const mydexitalp_usdcdai = await dexcontract.GetMydexitalptokens(usdccontract.address , daicontract.address,3);

        setmydexitalp_1(Number(mydexitalp_wethusdc)/1e18);
        setmydexitalp_2(Number(mydexitalp_wbtcweth)/1e18);
        setmydexitalp_3(Number(mydexitalp_usdcdai)/1e18);

        //tokens 
        setwbtctokenname("WBTC");
        setwethtokenname("WETH");
        setusdctokenname("USDC");
        setdaitokenname("DAI");
        setdexitalptokenname("DEXita LP")
    }

    return (
       
        <VStack
        divider={<StackDivider />}
        spacing={0}
        align='stretch'
        >
          <Box bgGradient='linear(to-r, white,azure,azure)' height="878px">
          { iswalletconnected ? (
            <VStack
            divider={<StackDivider borderColor='grey.100' />}
            spacing={2}
            align='stretch'
            >   
                <br></br>
                <HStack spacing='1350px'>
                <Box ml={10}>
                    <Text fontWeight='extrabold' fontSize="35px" bgClip='text'  bgGradient='linear(to-r, cyan.800, blue.700)'>Liquidity Pools</Text>
                </Box>
                <Box ml={15}>
                <Menu>
                    <MenuButton as={Button} 
                            backgroundColor="cyan.700" 
                            fontWeight='extrabold'
                            fontSize="20px"
                            colorScheme='green' 
                            variant='solid'
                            borderRadius= "120px"
                            width="250px"
                            height="67px"
                            
                            >
                        Add/Remove Liquidity
                    </MenuButton>
                    <MenuList>
                        <MenuItem as={Button}
                        fontSize={20} 
                        fontWeight="bold"
                        onClick={()=>{
                            settoken1name("WETH");
                            settoken2name("USDC");
                            getliquiditydata();
                            onOpen();
                        }}
                        >WETH/USDC</MenuItem>

                        <MenuItem as={Button} 
                        fontSize={20}
                        fontWeight="bold"
                        onClick={()=>{
                            settoken1name("WBTC");
                            settoken2name("WETH");
                            getliquiditydata();
                            onOpen();
                        }}
                        
                        >WBTC/WETH</MenuItem>

                        <MenuItem as={Button}
                        fontSize={20}
                        fontWeight="bold"
                        onClick={()=>{
                            settoken1name("USDC");
                            settoken2name("DAI");
                            getliquiditydata();
                            onOpen();
                        }}
                        >USDC/DAI</MenuItem>
                    </MenuList>
                </Menu>
                 
                </Box>
                </HStack>

                <br></br>
                <Box ml={10}>
                    <HStack spacing='420px' ml={10} >
                            <Box w='100px' h='40px' >
                                <Text fontWeight='extrabold' fontSize="22px" > Pool</Text>
                            </Box>
                            <Box w='405px' h='40px'>
                                <Text fontWeight='extrabold' fontSize="22px" > Total Liquidity Provided</Text>
                            </Box>
                            <Box w='70px' h='40px'>
                                <Text  fontWeight='extrabold' fontSize="22px" > Fees </Text>
                            </Box>
                         
                       
                         
                    </HStack>

                </Box>
                <Box ml={10}>  
                              
                    <HStack spacing='310px' >
                            <Box w='150px' h='90px'  as= {Button} backgroundColor="white" fontWeight='bold' fontSize="23px"  mb={10}  mt={6} >
                               WETH/USDC
                            </Box>
                            <Box w='620px' h='90px' >
                                <Box  fontSize="21px" fontWeight='bold' ml={24} >Total WETH liquidity= {wethreserves_pair1}  {wethtokenname}</Box>
                                <br></br>
                                <Box  fontSize="21px" fontWeight='bold' ml={24}  >Total USDC liquidity= {usdcreserves_pair1}  {usdctokenname} </Box>
                            </Box>
                            <Box w='360px' h='70px' fontSize="23px" fontWeight='bold'>
                               0.3%
                            </Box>
                      
                    </HStack>
                </Box>
                <Box ml={10}>  
                              
                <HStack spacing='310px' >
                            <Box w='150px' h='90px'  as= {Button} backgroundColor="white" fontWeight='bold' fontSize="23px"  mb={10}  mt={6} >
                               WBTC/WETH
                            </Box>
                            <Box w='620px' h='70px'>
                                <Box  fontSize="21px" fontWeight='bold' ml={24} >Total WBTC liquidity= {wbtcreserves_pair2}  {wbtctokenname}</Box>
                                <br></br>
                                <Box  fontSize="21px" fontWeight='bold' ml={24}  >Total WETH liquidity= {wethreserves_pair2} {wethtokenname} </Box>
                            </Box>
                            <Box w='360px' h='70px' fontSize="23px" fontWeight='bold'>
                               1%
                            </Box>
                      
                </HStack>
                </Box>
                <Box ml={10}>  
                              
                              <HStack spacing='310px' >
                                          <Box w='150px' h='70px'  as= {Button} backgroundColor="white" fontWeight='bold' fontSize="23px"  mb={10}  mt={6} >
                                             USDC/DAI
                                          </Box>
                                          <Box w='620px' h='70px'>
                                              <Box  fontSize="21px" fontWeight='bold' ml={24} >Total USDC liquidity= {usdcreserves_pair3} {usdctokenname}</Box>
                                              <br></br>
                                              <Box  fontSize="21px" fontWeight='bold' ml={24}  >Total DAI liquidity= {daireserves_pair3} {daitokenname} </Box>
                                          </Box>
                                          <Box w='340px' h='30px' fontSize="23px" fontWeight='bold'>
                                             0.05%
                                          </Box>
                                    
                              </HStack>
                              </Box>

                
            </VStack>
          ):(
            <VStack
            divider={<StackDivider borderColor='azure' />}
            spacing={2}
            align='stretch'
            >    
                <Box>
                    <Flex justify = "center" fontFamily="Lucida Console"  fontSize="27px" fontWeight="extrabold" padding={20}>
                        Connect Wallet to view liquidity pools
                    </Flex>
                 
                </Box>
            </VStack>

          )}

                
          </Box>
          
          <Modal isOpen={isOpen} onClose={onClose} size="xl" >
            
        
            <ModalOverlay />
            {    (token1name == "WETH" && token2name =="USDC")
                ?
                
            <ModalContent>
            <ModalHeader>WETH/USDC pool</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Tabs variant='unstyled' isFitted>
                    <TabList>
                        <Tab _selected={{ color: 'white', bg: 'cyan.600' }}>Add Liquidity</Tab>
                        <Tab _selected={{ color: 'white', bg: 'cyan.600' }}>Remove Liquidity </Tab>
                    </TabList>
                    <TabPanels>
                  
                        <TabPanel>
                        <Container  border='1px' borderColor='cyan.800' height="530px" borderWidth={1} borderRadius= "30px" >
                            <FormControl justify="center">

                        
                            <VStack
                                divider={<StackDivider borderColor='azure' />}
                                spacing={4}
                                align='stretch'
                                >
                            <br></br>
                            <Box h='80px' bg='white'>
                            <FormLabel for="wethamount1" fontSize={20}>{token1name} Amount</FormLabel>
                            <HStack spacing='24px'>
                                <Box w='350px' h='60px' bg='white'>
                                    <Input id="wethamount1" variant='outline' placeholder='0.0' height="60px" width="470px" borderWidth={1}  fontSize={25} />
                                </Box>
                        
                            
                            </HStack>
                                
                            </Box>
                            <Box h='80px' bg='white'>
                                <FormLabel for="usdcamount1" fontSize={20}>{token2name} amount</FormLabel>
                                <HStack spacing='24px'>
                                    <Box w='350px' h='60px' bg='white'>
                                        <Input id="usdcamount1" variant='outline' placeholder='0.0' height="60px"width="470px" borderWidth={1} fontSize={25} />
                                    </Box>
                                
                                </HStack>
                            </Box>
                                

                            <VStack
                            divider={<StackDivider borderColor='white' />}
                            spacing={4}
                            align='stretch'
                            >

                                <Box h='10px' bg='white' fontSize={15}>
                                    Total WETH Liquidity in the WETH/USDC pool = {wethreserves_pair1} {token1name}
                                </Box>
                                <Box h='11px' bg='white' fontSize={15}>
                                    Total USDC Liquidity in the WETH/USDC pool = {usdcreserves_pair1} {token2name} 
                                </Box>
                                <Box h='4px' bg='white' fontSize={15}>
                                    Your WETH liquidity in the pool= {mywethamount_pair1} {token1name}
                                </Box>
                                <Box h='4px' bg='white' fontSize={15}>
                                    Your USDC liquidity in the pool = {myusdcamount_pair1} {token2name}
                                </Box>
                            </VStack>
                           

                            <Box bg='white'>

                                <Button 
                                backgroundColor="cyan.700"
                                fontWeight='extrabold'
                                fontSize="25px"
                                colorScheme='green' 
                                variant='solid'
                                borderRadius= "100px"
                                width="150px"
                                height="62px"
                                ml="165px"
                                type='submit'
                                onClick={addliquidity_wethusdcpair}
                                >Add
                                </Button>
                            </Box>
                    </VStack>
                                
                        
                    </FormControl>
                  </Container>
                
                        </TabPanel>
                               
                         
                       
                        <TabPanel>
                        <Container  border='1px' borderColor='cyan.800' height="320px" borderWidth={1} borderRadius= "30px" >
                            <FormControl justify="center">
                            <VStack
                                divider={<StackDivider borderColor='azure' />}
                                spacing={4}
                                align='stretch'
                                >
                            <br></br>
                            <Box h='80px' bg='white'>
                            <FormLabel for="lptokens" fontSize={20}>LP tokens % Amount</FormLabel>
                            <HStack spacing='24px'>
                                <Box w='120px' h='60px' bg='white'>
                                        <Select id = "lptokens1"  height="60px" width="140px" borderWidth={3} mb={10} borderRadius={75}  >
                                            <option value='25'>25%</option>
                                            <option value='50'>50%</option>
                                            <option value='75'>75%</option>
                                            <option value='100'>100%</option>
                                            
                                        
                                        </Select>
                                </Box>
                            </HStack>
                                
                            </Box>
                            
                            <Box h='2px' bg='white' fontSize={15}>
                                Your LP tokens amount in WETH/USDC pool = {dexitalptokens_1} {dexitalptokenname}
                            </Box>
                            
                        
                            <Box bg='white' mt={7}>
                                <Button 
                                backgroundColor="cyan.700"
                                fontWeight='extrabold'
                                fontSize="25px"
                                colorScheme='green' 
                                variant='solid'
                                borderRadius= "100px"
                                width="150px"
                                height="62px"
                                ml="165px"
                                type='submit'
                                onClick={removeliquidity_wethusdc}
                                
                                >Remove
                                </Button>

                            </Box>



                     
                    </VStack>

                    </FormControl>
                  </Container>

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
             :
             (token1name == "WBTC" && token2name =="WETH")
             ?

             <ModalContent>
            <ModalHeader>WBTC/WETH pool</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Tabs variant='unstyled' isFitted>
                    <TabList>
                        <Tab _selected={{ color: 'white', bg: 'cyan.600' }}>Add Liquidity</Tab>
                        <Tab _selected={{ color: 'white', bg: 'cyan.600' }}>Remove Liquidity </Tab>
                    </TabList>
                    <TabPanels>
                  
                        <TabPanel>
                        <Container  border='1px' borderColor='cyan.800' height="530px" borderWidth={1} borderRadius= "30px" >
                            <FormControl justify="center">

                        
                            <VStack
                                divider={<StackDivider borderColor='azure' />}
                                spacing={4}
                                align='stretch'
                                >
                            <br></br>
                            <Box h='80px' bg='white'>
                            <FormLabel for="wbtcamount2" fontSize={20}>{token1name} Amount</FormLabel>
                            <HStack spacing='24px'>
                                <Box w='350px' h='60px' bg='white'>
                                    <Input id="wbtcamount2" variant='outline' placeholder='0.0' height="60px" width="470px" borderWidth={1}  fontSize={25} />
                                </Box>
                        
                            
                            </HStack>
                                
                            </Box>
                            <Box h='80px' bg='white'>
                                <FormLabel for="wethamount" fontSize={20}>{token2name} amount</FormLabel>
                                <HStack spacing='24px'>
                                    <Box w='350px' h='60px' bg='white'>
                                        <Input id="wethamount2" variant='outline' placeholder='0.0' height="60px"width="470px" borderWidth={1} fontSize={25} />
                                    </Box>
                                
                                </HStack>
                            </Box>
                                

                            <VStack
                            divider={<StackDivider borderColor='white' />}
                            spacing={4}
                            align='stretch'
                            >

                                <Box h='10px' bg='white' fontSize={15}>
                                    Total WBTC Liquidity in the WBTC/WETH pool = {wbtcreserves_pair2} {token1name}

                                </Box>
                                <Box h='11px' bg='white' fontSize={15}>
                                    Total WETH Liquidity in the WBTC/WETH pool= {wethreserves_pair2}  {token2name} 
                                </Box>
                                <Box h='4px' bg='white' fontSize={15}>
                                    Your WBTC liquidity in the pool = {mywbtcamount_pair2} {token1name}
                                </Box>
                                <Box h='4px' bg='white' fontSize={15}>
                                    Your WETH liquidity  in the pool= {mywethamount_pair2} {token2name}
                                </Box>
                            </VStack>
                           

                            <Box bg='white'>

                                <Button 
                                backgroundColor="cyan.700"
                                fontWeight='extrabold'
                                fontSize="25px"
                                colorScheme='green' 
                                variant='solid'
                                borderRadius= "100px"
                                width="150px"
                                height="62px"
                                ml="165px"
                                type='submit'
                                onClick={addliquidity_wbtcwethpair}
                                >Add
                                </Button>
                            </Box>
                    </VStack>
                                
                        
                    </FormControl>
                  </Container>
                
                        </TabPanel>
                               
                         
                       
                        <TabPanel>
                        <Container  border='1px' borderColor='cyan.800' height="320px" borderWidth={1} borderRadius= "30px" >
                            <FormControl justify="center">
                            <VStack
                                divider={<StackDivider borderColor='azure' />}
                                spacing={4}
                                align='stretch'
                                >
                            <br></br>
                            <Box h='80px' bg='white'>
                            <FormLabel for="lptokens" fontSize={20}>LP tokens % Amount</FormLabel>
                            <HStack spacing='24px'>
                                <Box w='120px' h='60px' bg='white'>
                                        <Select id = "lptokens2"  height="60px" width="140px" borderWidth={3} mb={10} borderRadius={75}  >
                                            <option value='25'>25%</option>
                                            <option value='50'>50%</option>
                                            <option value='75'>75%</option>
                                            <option value='100'>100%</option>
                                            
                                        
                                        </Select>
                                </Box>
                        
                            
                            </HStack>
                                
                            </Box>
                          
                            <Box h='2px' bg='white' fontSize={15}>
                            Your LP tokens amount in WBTC/ETH pool = {dexitalptokens_2} {dexitalptokenname}
                            </Box>
                        
                            <Box bg='white' mt={7}>
                                <Button 
                                backgroundColor="cyan.700"
                                fontWeight='extrabold'
                                fontSize="25px"
                                colorScheme='green' 
                                variant='solid'
                                borderRadius= "100px"
                                width="150px"
                                height="62px"
                                ml="165px"
                                type='submit'
                                onClick={removeliquidity_wbtcweth}
                              
                                
                                >Remove
                                </Button>

                            </Box>



                     
                    </VStack>

                    </FormControl>
                  </Container>

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
            :
            (token1name == "USDC" && token2name =="DAI")
            ?

            <ModalContent>
            <ModalHeader>USDC/DAI pool</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Tabs variant='unstyled' isFitted>
                    <TabList>
                        <Tab _selected={{ color: 'white', bg: 'cyan.600' }}>Add Liquidity</Tab>
                        <Tab _selected={{ color: 'white', bg: 'cyan.600' }}>Remove Liquidity </Tab>
                    </TabList>
                    <TabPanels>
                  
                        <TabPanel>
                        <Container  border='1px' borderColor='cyan.800' height="530px" borderWidth={1} borderRadius= "30px" >
                            <FormControl justify="center">

                        
                            <VStack
                                divider={<StackDivider borderColor='azure' />}
                                spacing={4}
                                align='stretch'
                                >
                            <br></br>
                            <Box h='80px' bg='white'>
                            <FormLabel for="usdcamount3" fontSize={20}>{token1name} Amount</FormLabel>
                            <HStack spacing='24px'>
                                <Box w='350px' h='60px' bg='white'>
                                    <Input id="usdcamount3" variant='outline' placeholder='0.0' height="60px" width="470px" borderWidth={1}  fontSize={25} />
                                </Box>
                        
                            
                            </HStack>
                                
                            </Box>
                            <Box h='80px' bg='white'>
                                <FormLabel for="daiamount3" fontSize={20}>{token2name} amount</FormLabel>
                                <HStack spacing='24px'>
                                    <Box w='350px' h='60px' bg='white'>
                                        <Input id="daiamount3" variant='outline' placeholder='0.0' height="60px"width="470px" borderWidth={1} fontSize={25} />
                                    </Box>
                                
                                </HStack>
                            </Box>
                            <VStack
                            divider={<StackDivider borderColor='white' />}
                            spacing={4}
                            align='stretch'
                            >

                                <Box h='10px' bg='white' fontSize={15}>
                                    Total USDC liquidity in the USDC/DAI pool = {usdcreserves_pair3} {token1name}
                                </Box>
                                <Box h='11px' bg='white' fontSize={15}>
                                    Total DAI Liquidity in the USDC/DAI pool =  {daireserves_pair3} {token2name} 
                                </Box>
                                <Box h='4px' bg='white' fontSize={15}>
                                    Your USDC liquidity in the pool = {myusdcamount_pair3} {token1name}
                                </Box>
                                <Box h='4px' bg='white' fontSize={15}>
                                    Your DAI liquidity in the pool=  {mydaiamount_pair3} {token2name}
                                </Box>
                            </VStack>
                            <Box bg='white'>

                                <Button 
                                backgroundColor="cyan.700"
                                fontWeight='extrabold'
                                fontSize="25px"
                                colorScheme='green' 
                                variant='solid'
                                borderRadius= "100px"
                                width="150px"
                                height="62px"
                                ml="165px"
                                type='submit'
                                onClick={addliquidity_usdcdaipair}
                                >Add
                                </Button>
                            </Box>
                    </VStack>
                                
                    </FormControl>
                  </Container>
                
                        </TabPanel>
                               
                         
                       
                        <TabPanel>
                        <Container  border='1px' borderColor='cyan.800' height="320px" borderWidth={1} borderRadius= "30px" >
                            <FormControl justify="center">
                            <VStack
                                divider={<StackDivider borderColor='azure' />}
                                spacing={4}
                                align='stretch'
                                >
                            <br></br>
                            <Box h='80px' bg='white'>
                            <FormLabel for="lptokens" fontSize={20}>LP tokens % Amount</FormLabel>
                            <HStack spacing='24px'>
                                <Box w='120px' h='60px' bg='white'>
                                        <Select id = "lptokens3"  height="60px" width="140px" borderWidth={3} mb={10} borderRadius={75}  >
                                            <option value='25'>25%</option>
                                            <option value='50'>50%</option>
                                            <option value='75'>75%</option>
                                            <option value='100'>100%</option>
                                            
                                        </Select>
                                </Box>
                        
                            
                            </HStack>
                                
                            </Box>
                          
                            <Box h='2px' bg='white' fontSize={15}>
                                Your LP tokens amount in USDC/DAI pool = {dexitalptokens_3} {dexitalptokenname}

                            </Box>
                        
                            <Box bg='white' mt={7}>
                                <Button 
                                backgroundColor="cyan.700"
                                fontWeight='extrabold'
                                fontSize="25px"
                                colorScheme='green' 
                                variant='solid'
                                borderRadius= "100px"
                                width="150px"
                                height="62px"
                                ml="165px"
                                type='submit'
                                onClick={removeliquidity_usdcdai}
                                
                                
                                >Remove
                                </Button>

                            </Box>



                     
                    </VStack>

                    </FormControl>
                  </Container>

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

        
        :
        <Box>No pool choosen</Box>
    }
    
        </Modal>
    
        </VStack>
       
    );
};

export default LiquidityProvider;