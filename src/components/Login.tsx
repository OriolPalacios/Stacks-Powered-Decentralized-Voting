import { FC, useEffect } from "react";
import { AppConfig, UserSession, showConnect } from "@stacks/connect";
import Button from "./Button"; // Assuming you have a Button component
import { Container, Navbar, Row, Nav, Col, Image, Alert } from "react-bootstrap";
import projectLogo from './projectLogo.jpg';
import favicon from './favicon.svg';
import styles from './Login.module.css';

const appConfig = new AppConfig(['store_write']);

const Login: FC<{
  setWalletAddress: (address: string) => void;
  setUserSession: (session: UserSession) => void;
  setShowDashboard: (state: boolean) => void;
  showDashboard: boolean;
}> = ({ setWalletAddress, setUserSession, setShowDashboard, showDashboard }) => {

  const userSession = new UserSession({ appConfig });

  useEffect(() => {
    if (userSession.isUserSignedIn()) {
      const { testnet } = userSession.loadUserData().profile.stxAddress;
      setWalletAddress(testnet);
      setUserSession(userSession);
    }
  }, [setWalletAddress, setUserSession]);

  const connectWallet = () => {
    showConnect({
      appDetails: { name: "StacksVote", icon: "./projectLogo.jpg" },
      onFinish: () => {
        setWalletAddress(userSession.loadUserData().profile.stxAddress.testnet);
        setUserSession(userSession);
        window.location.reload();
      },
      userSession,
    });
  };

  const disconnectWallet = () => {
    if (userSession.isUserSignedIn()) {
      userSession.signUserOut(window.location.href);
      setWalletAddress('');
      setUserSession(null);
    }
  };

  const TruncatedText = ({ text, maxLength = 13 }) => {
    const stringText = String(text.props.children);
  
    if (stringText.length <= maxLength) {
      return <span>{stringText}</span>;
    }
  
    const start = stringText.slice(0, maxLength / 2);
    const end = stringText.slice(-maxLength / 2);
    
    return (
      <span>
        {start}...{end}
      </span>
    );
  };

  return (
    <Container fluid style={{ padding: "0" }}>
      <Navbar bg="dark" variant="dark" expand="lg" className="d-flex justify-content-around">
        <Row className="align-items-center">
          <Col xs="auto">
            <Image src={projectLogo} roundedCircle style={{ width: '100px', height: '100px' }}  />
          </Col>
          <Col xs="auto">
            <Navbar.Brand href="#home" className="text-white">Stacks-Powered Decentralized Voting</Navbar.Brand>
          </Col>
        </Row>

        <Nav className="ml-auto gap-3">

          <Nav.Item className={`d-flex align-items-center wallet-container ${styles.walletContainer}`}>
            <p className="mx-2 text-white">
              <TruncatedText text={userSession.isUserSignedIn() ? (
                <span>{userSession.loadUserData().profile.stxAddress.testnet}</span>
              ) : (
                <span>Desconectado</span>
              )} />
              
            </p>
          </Nav.Item>

          <Nav.Item className="d-flex align-items-center">
            <Button variant="outline-light" className="mx-2" onClick={()=>setShowDashboard(!showDashboard)} label={showDashboard ? "Votar" : "Ver Dashboard"} />
          </Nav.Item>

          <Nav.Item className="d-flex align-items-center">
            {userSession.isUserSignedIn() ? (
              <Button variant="outline-light" onClick={disconnectWallet} label={"Desconectar"} />
            ) : (
              <Button variant="outline-light" onClick={connectWallet} label="Conectar Wallet" />
            )}
          </Nav.Item>
        </Nav>
      </Navbar>
    </Container>
  );
};

export default Login;

