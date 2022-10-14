import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter ,Routes, Route,Link } from "react-router-dom";
import {ethers} from 'ethers';
import { useToast } from '@chakra-ui/react'
import dexcontractabi from './Contractdata/DexitaSwapDex.json';
import wbtccontractabi from './Contractdata/WBTC.json';
import wethcontractabi from './Contractdata/WETH.json';
import usdccontractabi from './Contractdata/USDC.json';
import daicontractabi from './Contractdata/DAI.json';

import Navbar from './pages/navbar.js';
import Swap from './pages/swap.js';
import Home from './pages/home.js';
import LiquidityProvider from './pages/liquidity.js';

function App() {
  const [accounts , setaccounts] = useState([]);
  const toast = useToast();
  // pairs 
  // pair 1 WETH/USDC
  const [wethreserves_pair1,setwethreserves_pair1] = useState();
  const [usdcreserves_pair1,setusdcreserves_pair1] = useState();
  // pair 2 WBTC/WETH
  const [wbtcreserves_pair2,setwbtcreserves_pair2] = useState();
  const [wethreserves_pair2,setwethreserves_pair2] = useState();
    // pair 3 USDC/DAI
    const [usdcreserves_pair3,setusdcreserves_pair3] = useState();
    const [daireserves_pair3,setdaireserves_pair3] = useState();

  const [dexcontract, setdexcontract] = useState({});
  const [wbtccontract, setwbtccontract] = useState({});
  const [wethcontract, setwethcontract] = useState({});
  const [usdccontract, setusdccontract] = useState({});
  const [daicontract, setdaicontract] = useState({});

  const dexcontract_address= "0x5F78A8C12cFDC308ab1b107636f7239C8fF6389b";
  const usdccontract_address= "0xB34F183Dcc188a9D73A57F32D66df2A6F217Fd3b";
  const wbtccontract_address= "0xf88768aD198AE951c612d00e5436946F23320687";
  const wethcontract_address= "0x48492f77176c1A0e992f6D29B1C7E97Da0688B70";
  const daicontract_address= "0x01d8fd689A1484A8051cd739d1025E73fF70C0FB";

  const  connectwallet = async () => {
    if (window.ethereum) {
        const accounts = await window.ethereum.request ({
            method: "eth_requestAccounts",
        }); 
        const provider = await new ethers.providers.Web3Provider(window.ethereum);
        const signer = await provider.getSigner();
        setaccounts(accounts);
      

        window.ethereum.on('accountsChanged', async function (accounts) {
            setaccounts(accounts[0])
            
            await connectwallet()
          })
          
        connectdexcontract(signer);
        connectwbtccontract(signer);
        connectwethcontract(signer);
        connectdaicontract(signer);
        connectusdccontract(signer);

    }
    else {
      toast({
        title: 'Error! MetaMask Not Found',
        description: "You have not installed MetaMask",
        status: 'error',
        duration: 2200,
        isClosable: true,
        position: 'top',   
    });


    }

  }
  
  const connectdexcontract = async (signer) => {
    const dexcontract = new ethers.Contract(dexcontract_address,dexcontractabi.dexabi,signer);
    setdexcontract(dexcontract);
  }
  //Connect to demo test coins
  //wbtc
  const connectwbtccontract = async (signer) => {
    const wbtccontract = new ethers.Contract(wbtccontract_address,wbtccontractabi.wbtcabi,signer);
    setwbtccontract(wbtccontract);
  }
  //weth
  const connectwethcontract = async (signer) => {
    const wethcontract = new ethers.Contract(wethcontract_address,wethcontractabi.wethabi,signer);
    setwethcontract(wethcontract);
  }
  //usdc
  const connectusdccontract = async (signer) => {
    const usdccontract = new ethers.Contract(usdccontract_address,usdccontractabi.usdcabi,signer);
    setusdccontract(usdccontract);
  }
  //dai 
  const connectdaicontract = async (signer) => {
    const daicontract = new ethers.Contract(daicontract_address,daicontractabi.daiabi,signer);
    setdaicontract(daicontract);
  }
  
  return (
    <div>
      <BrowserRouter>        
        <div className="App">
          <Navbar accounts={accounts} setaccounts={setaccounts} connectwallet={connectwallet} />
        </div>  
        <Routes>
          <Route path= "/" element={ <Home accounts = {accounts} wbtccontract={wbtccontract} wethcontract={wethcontract} usdccontract={usdccontract} daicontract={daicontract}/>}/>
          
          <Route path= "/swap" element={ <Swap accounts={accounts} wbtccontract={wbtccontract} wethcontract={wethcontract} 
           usdccontract={usdccontract} daicontract={daicontract} dexcontract ={dexcontract} 
           wethreserves_pair1 ={wethreserves_pair1} setwethreserves_pair1={setwethreserves_pair1}
           usdcreserves_pair1 ={usdcreserves_pair1} setusdcreserves_pair1={setusdcreserves_pair1}
           wbtcreserves_pair2 ={wbtcreserves_pair2} setwbtcreserves_pair2={setwbtcreserves_pair2}
           wethreserves_pair2={wethreserves_pair2} setwethreserves_pair2={setwethreserves_pair2}
           usdcreserves_pair3={usdcreserves_pair3} setusdcreserves_pair3={setusdcreserves_pair3}
           daireserves_pair3={daireserves_pair3} setdaireserves_pair3={setdaireserves_pair3} />}/>

          <Route path= "/liquiditypool" element={ <LiquidityProvider accounts={accounts} wbtccontract={wbtccontract} wethcontract={wethcontract} 
           usdccontract={usdccontract} daicontract={daicontract} dexcontract ={dexcontract} 
           wethreserves_pair1 ={wethreserves_pair1} setwethreserves_pair1={setwethreserves_pair1}
           usdcreserves_pair1 ={usdcreserves_pair1} setusdcreserves_pair1={setusdcreserves_pair1}
           wbtcreserves_pair2 ={wbtcreserves_pair2} setwbtcreserves_pair2={setwbtcreserves_pair2}
           wethreserves_pair2={wethreserves_pair2} setwethreserves_pair2={setwethreserves_pair2}
           usdcreserves_pair3={usdcreserves_pair3} setusdcreserves_pair3={setusdcreserves_pair3}
           daireserves_pair3={daireserves_pair3} setdaireserves_pair3={setdaireserves_pair3} />}/>
        </Routes>
      </BrowserRouter>
    </div>
   
  );
}

export default App;
