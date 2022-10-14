import {Button , HStack , Container, Flex,Text , FormControl , FormLabel, Input,Box,Link,VStack,StackDivider } from '@chakra-ui/react'
import { Select } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/react'
import { Icon } from '@chakra-ui/react'
import { ArrowUpDownIcon } from '@chakra-ui/icons'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { ethers } from 'ethers';


const Swap = ({accounts,wbtccontract,wethcontract,usdccontract,daicontract,dexcontract,wethreserves_pair1,setwethreserves_pair1,usdcreserves_pair1,setusdcreserves_pair1,wbtcreserves_pair2,setwbtcreserves_pair2,wethreserves_pair2,setwethreserves_pair2, usdcreserves_pair3,setusdcreserves_pair3, daireserves_pair3,setdaireserves_pair3}) => {
    const iswalletconnected = Boolean(accounts[0]);
    const toast = useToast();
  

    const swaptokens= async () =>{
       
            const amountin = document.getElementById('amountin').value;
            const amountin_ethformat = ethers.utils.parseEther(amountin.toString());

            const tokensin = document.getElementById("choosetokensin");
            const tokensout = document.getElementById("choosetokensout");
            var tokennamein = tokensin.options[tokensin.selectedIndex].text;
            var tokennameout = tokensout.options[tokensout.selectedIndex].text;
            try {
                if (tokennamein == "WETH" && tokennameout == "USDC"){
                    const wethusdc = await dexcontract.GetReservesPerpair(1,wethcontract.address , usdccontract.address);
                
                    const outputusdctokenamount= await dexcontract.GetOutputTokenAmount(amountin_ethformat, wethusdc[0], wethusdc[1], 1);
                    document.getElementById('amountout').value = Number(outputusdctokenamount)/1e18;
                    toast({
                        title: 'Fess on WETH/USDC pair swapping',
                        description: "There are 0.3% market fees on that pair",
                        status: 'info',
                        duration: 2000,
                        isClosable: true,
                        position: 'top',   
                    });
                    const txapproval =  await (await wethcontract.approve(dexcontract.address,amountin_ethformat ) ).wait();
                    if ( txapproval.hash ||txapproval.transactionHash){
                        toast({
                            title: 'WETH Aprroval Success',
                            description: "Wait for next MetaMask confirmation to complete swapping process",
                            status: 'success',
                            duration: 2000,
                            isClosable: true,
                            position: 'top-left',   
                        });
                    }

                    const wethtousdc_transaction = await (await dexcontract.swaptwotokens (wethcontract.address, usdccontract.address,amountin_ethformat, 1, 1 ) ).wait();
                    if ( wethtousdc_transaction.hash ||wethtousdc_transaction.transactionHash){
                        toast({
                            title: 'Swap done Successfully',
                            description: "Done! You swapped WETH to USDC",
                            status: 'success',
                            duration: 2100,
                            isClosable: true,
                            position: 'top-left',   
                        });
                    }
                
                }

                else if (tokennamein == "USDC" && tokennameout == "WETH"){
                    const usdcweth = await dexcontract.GetReservesPerpair(1,  usdccontract.address,wethcontract.address);
                    const outputwethtokenamount= await dexcontract.GetOutputTokenAmount(amountin_ethformat, usdcweth[0], usdcweth[1], 1);
                    document.getElementById('amountout').value = Number(outputwethtokenamount)/1e18;
                    toast({
                        title: 'Fess on USDC/WETH swapping',
                        description: "There are 0.3% market fees on that pair",
                        status: 'info',
                        duration: 2000,
                        isClosable: true,
                        position: 'top',   
                    });
                    const txapproval =  await (await usdccontract.approve(dexcontract.address,amountin_ethformat ) ).wait();
                    if ( txapproval.hash ||txapproval.transactionHash){
                        toast({
                            title: 'USDC Aprroval Success',
                            description: "Wait for next MetaMask confirmation to complete swapping process",
                            status: 'success',
                            duration: 2000,
                            isClosable: true,
                            position: 'top-left',   
                        });
                    }
                    const usdctoweth_transaction = await (await dexcontract.swaptwotokens (usdccontract.address, wethcontract.address,amountin_ethformat, 1, 1 ) ).wait();
                    if ( usdctoweth_transaction.hash ||usdctoweth_transaction.transactionHash){
                        toast({
                            title: 'Swap done Successfully',
                            description: "Done! You swapped USDC to WETH",
                            status: 'success',
                            duration: 2100,
                            isClosable: true,
                            position: 'top-left',   
                        });
                    }

                }

                else if (tokennamein == "WBTC" && tokennameout == "WETH"){
                    const wbtcweth = await dexcontract.GetReservesPerpair(2,  wbtccontract.address,wethcontract.address);
                    const outputwethtokenamount= await dexcontract.GetOutputTokenAmount(amountin_ethformat, wbtcweth[0], wbtcweth[1], 2);
                    document.getElementById('amountout').value = Number(outputwethtokenamount)/1e18;
                    toast({
                        title: 'Fess on WBTC/WETH swapping',
                        description: "There are 1% market fees on that pair",
                        status: 'info',
                        duration: 2000,
                        isClosable: true,
                        position: 'top',   
                    });
                    const txapproval =  await (await wbtccontract.approve(dexcontract.address,amountin_ethformat ) ).wait();
                    if ( txapproval.hash ||txapproval.transactionHash){
                        toast({
                            title: 'WBTC Aprroval Success',
                            description: "Wait for next MetaMask confirmation to complete swapping process",
                            status: 'success',
                            duration: 2000,
                            isClosable: true,
                            position: 'top-left',   
                        });
                    }
                    const wbtctoweth_transaction = await (await dexcontract.swaptwotokens (wbtccontract.address, wethcontract.address,amountin_ethformat, 3, 2) ).wait();
                    if ( wbtctoweth_transaction.hash ||wbtctoweth_transaction.transactionHash){
                        toast({
                            title: 'Swap done Successfully',
                            description: "Done! You swapped WBTC to WETH",
                            status: 'success',
                            duration: 2100,
                            isClosable: true,
                            position: 'top-left',   
                        });
                    }

                }


                else if (tokennamein == "WETH" && tokennameout == "WBTC"){
                    const wethwbtc = await dexcontract.GetReservesPerpair(2,  wethcontract.address,wbtccontract.address);
                    const outputwbtctokenamount= await dexcontract.GetOutputTokenAmount(amountin_ethformat, wethwbtc[0], wethwbtc[1], 2);
                    document.getElementById('amountout').value = Number(outputwbtctokenamount)/1e18;
                    toast({
                        title: 'Fess on WETH/WBTC swapping',
                        description: "There are 1% market fees on that pair",
                        status: 'info',
                        duration: 2000,
                        isClosable: true,
                        position: 'top',   
                    });
                    const txapproval =  await (await wethcontract.approve(dexcontract.address,amountin_ethformat ) ).wait();
                    if ( txapproval.hash ||txapproval.transactionHash){
                        toast({
                            title: 'WETH Aprroval Success',
                            description: "Wait for next MetaMask confirmation to complete swapping process",
                            status: 'success',
                            duration: 2000,
                            isClosable: true,
                            position: 'top-left',   
                        });
                    }
                    const wethwbtc_transaction = await (await dexcontract.swaptwotokens (wethcontract.address, wbtccontract.address,amountin_ethformat, 3, 2) ).wait();
                    if ( wethwbtc_transaction.hash ||wethwbtc_transaction.transactionHash){
                        toast({
                            title: 'Swap done Successfully',
                            description: "Done! You swapped WETH to WBTC",
                            status: 'success',
                            duration: 2100,
                            isClosable: true,
                            position: 'top-left',   
                        });
                    }

                }


                else if (tokennamein == "USDC" && tokennameout == "DAI"){
                    const usdcdai = await dexcontract.GetReservesPerpair(3,  usdccontract.address,daicontract.address);
                    const outputdaitokenamount= await dexcontract.GetOutputTokenAmount(amountin_ethformat, usdcdai[0], usdcdai[1], 3);
                    document.getElementById('amountout').value = Number(outputdaitokenamount)/1e18;
                    toast({
                        title: 'Fess on USDC/DAI swapping',
                        description: "There are 0.05% market fees on that pair",
                        status: 'info',
                        duration: 2000,
                        isClosable: true,
                        position: 'top',   
                    });
                    const txapproval =  await (await usdccontract.approve(dexcontract.address,amountin_ethformat ) ).wait();
                    if ( txapproval.hash ||txapproval.transactionHash){
                        toast({
                            title: 'USDC Aprroval Success',
                            description: "Wait for next MetaMask confirmation to complete swapping process",
                            status: 'success',
                            duration: 2000,
                            isClosable: true,
                            position: 'top-left',   
                        });
                    }
                    const usdctodai_transaction = await (await dexcontract.swaptwotokens (usdccontract.address, daicontract.address,amountin_ethformat, 2, 3) ).wait();
                    if ( usdctodai_transaction.hash ||usdctodai_transaction.transactionHash){
                        toast({
                            title: 'Swap done Successfully',
                            description: "Done! You swapped USDC to DAI",
                            status: 'success',
                            duration: 2100,
                            isClosable: true,
                            position: 'top-left',   
                        });
                    }

                }

                else if (tokennamein == "DAI" && tokennameout == "USDC"){
                    const daisusdc = await dexcontract.GetReservesPerpair(3,  daicontract.address,usdccontract.address);
                    const outputusdctokenamount= await dexcontract.GetOutputTokenAmount(amountin_ethformat, daisusdc[0], daisusdc[1], 3);
                    document.getElementById('amountout').value = Number(outputusdctokenamount)/1e18;
                    toast({
                        title: 'Fess on DAI/USDC swapping',
                        description: "There are 0.05% market fees on that pair",
                        status: 'info',
                        duration: 2000,
                        isClosable: true,
                        position: 'top',   
                    });
                    const txapproval =  await (await daicontract.approve(dexcontract.address,amountin_ethformat ) ).wait();
                    if ( txapproval.hash ||txapproval.transactionHash){
                        toast({
                            title: 'DAI Aprroval Success',
                            description: "Wait for next MetaMask confirmation to complete swapping process",
                            status: 'success',
                            duration: 2000,
                            isClosable: true,
                            position: 'top-left',   
                        });
                    }
                    const daitousdc_transaction = await (await dexcontract.swaptwotokens (daicontract.address, usdccontract.address,amountin_ethformat, 2, 3) ).wait();
                    if ( daitousdc_transaction.hash ||daitousdc_transaction.transactionHash){
                        toast({
                            title: 'Swap done Successfully',
                            description: "Done! You swapped DAI to USDC",
                            status: 'success',
                            duration: 2100,
                            isClosable: true,
                            position: 'top-left',   
                        });
                    }

                }
                else{
                    toast({
                        title: 'Error! This pair has no liquidity Pool',
                        description: "No liquidity provided in that pair",
                        status: 'error',
                        duration: 2100,
                        isClosable: true,
                        position: 'top-left',   
                    });

                }


            
        }
        catch(error){
            console.log(error.error.data.message)
            if (error.error.data.message === "VM Exception while processing transaction: revert Dex has no liquidity"){
                toast({
                    title: 'Error',
                    description: 'DEXita Swap has no enough liquidity for that pool',
                    status: 'error', 
                    duration: 2100,
                    isClosable: true,
                    position: 'top-left',   
                });
            }
            if (error.error.data.message === "VM Exception while processing transaction: revert you do not have these amount of tokens"){
                toast({
                    title: 'Error',
                    description: 'You do not have this amount of this token "Insufficient balance"',
                    status: 'error', 
                    duration: 2000,
                    isClosable: true,
                    position: 'top-left',   
                });
            }

            
        }
    }
   
    
    const exchangetokens =  () =>{
        const tokensin = document.getElementById("choosetokensin");
        const tokensout = document.getElementById("choosetokensout");
        var temp = tokensin.value;
        tokensin.value = tokensout.value;
        tokensout.value = temp;
    }
 
    return (

        <VStack
        divider={<StackDivider borderColor='white' />}
        spacing={2}
        align='stretch'
        >
          <Box bgGradient='linear(to-r, white,azure,azure)' height="878px">
          <br></br>  <br></br><br></br><br></br><br></br><br></br><br></br>
                  <Container  border='1px' borderColor='cyan.800' height="447px" borderWidth={3} borderRadius= "50px" >
                    <FormControl justify="center">
                        
                        
                    <VStack
                        divider={<StackDivider borderColor='azure' />}
                        spacing={4}
                        align='stretch'
                        >
                        <br></br>
                        <Box h='95px' bg='azure'>
                        <FormLabel for="amountin" fontSize={20}>From</FormLabel>
                        <HStack spacing='24px'>
                            <Box w='350px' h='60px' bg='azure'>
                                <Input id="amountin" variant='outline' placeholder='0.0' height="60px" width="362px" borderWidth={1}  fontSize={25} />
                            </Box>
                            <Box w='120px' h='60px' bg='azure'>
                                <Select id="choosetokensin"  height="60px" width="110px" borderWidth={1} mb={10} >
                                    <option value='WETH'>WETH</option>
                                    <option value='WBTC'>WBTC</option>
                                    <option value='USDC'>USDC</option>
                                    <option value='DAI'>DAI</option>
                                  
                                </Select>
                            </Box>
                        </HStack>
                                                
                        </Box>
                        
                        <Flex justify="center" h="1px">
                            <Button backgroundColor="azure"  variant='solid'
                            borderRadius= "80px" width="20px" onClick={exchangetokens}>
                            <Icon as={ArrowUpDownIcon} w={100} h={9} />
                            </Button>

                        </Flex>
                        <Box h='94px' bg='azure' >
                            <FormLabel for="amountin" fontSize={20}>To</FormLabel>
                            <HStack spacing='24px'>
                                <Box w='350px' h='60px' bg='azure'>
                                    <Input id="amountout" variant='outline' placeholder='0.0' height="60px" width="362px" borderWidth={1} fontSize={25} />
                                </Box>
                                <Box w='120px' h='60px' bg='azure'>
                                    <Select id = "choosetokensout"  height="60px" width="110px" borderWidth={1} mb={10} >
                                        <option value='WBTC'>WBTC</option>
                                        <option value='WETH'>WETH</option>
                                        <option value='USDC'>USDC</option>
                                        <option value='DAI'>DAI</option>
                                        
                                     
                                    </Select>
                                </Box>
                            </HStack>
                        </Box>
                        
                        <Box bg='azure'>
                            <Button 
                              backgroundColor="cyan.900"
                              fontWeight='extrabold'
                              fontSize="25px"
                              colorScheme='green' 
                              variant='solid'
                              borderRadius= "100px"
                              width="200px"
                              height="70px"
                              ml="150px"
                              type='submit'
                              onClick={swaptokens}
                             
                              >Swap
                            </Button>

                        </Box>
                    </VStack>
                    </FormControl>
                  </Container>
          </Box>
         
        </VStack>


     


    );
};

export default Swap;