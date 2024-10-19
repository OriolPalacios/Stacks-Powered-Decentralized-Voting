import { UserSession, showConnect } from '@stacks/connect';
import './App.css';
import Login from "./components/Login";
import Vote from "./components/Vote";
import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import {Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'normalize.css';


function App() {
  const [passCandidates, setPassCandidates] = useState([]);
  const [showDashboard, setShowDashboard] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [userSession, setUserSession] = useState();
  return (
    <Container className={`m-0 p-0 root-container container-full text-white`} fluid>
      <Login setWalletAddress={setWalletAddress} setUserSession={setUserSession} setShowDashboard={setShowDashboard} showDashboard={showDashboard} />
      {
        showDashboard ? <Dashboard walletAddress={walletAddress} userSession={userSession} showDashboard={showDashboard} setDashboard={setShowDashboard} passCandidates={passCandidates}/> : <Vote walletAddress={walletAddress} userSession={userSession} setPassCandidates={setPassCandidates}/>
      }
    </Container>
  );
}


export default App;
