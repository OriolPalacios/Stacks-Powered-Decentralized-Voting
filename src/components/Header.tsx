import React from 'react';
import Button from './Button'; // Assuming you're using the Button component you already have

interface HeaderProps {
  walletAddress: string;
  connectWallet: () => void;
  disconnectWallet: () => void;
  isUserSignedIn;
}

const Header: React.FC<HeaderProps> = ({ walletAddress, connectWallet, disconnectWallet, isUserSignedIn }) => {
  return (
    <header className="d-flex justify-content-between align-items-center p-3 border-bottom bg-light">
      {/* Left side: Dashboard Button */}
      <div className="d-flex align-items-center">
        <div className="me-3 bg-secondary rounded-circle" style={{ width: '40px', height: '40px' }}></div>
        <Button label="Dashboard" onClick={() => { /* Add your routing or logic */ }} />
      </div>

      {/* Center: Wallet Address */}
      <div className="text-muted">
        {isUserSignedIn ? `Wallet: ${walletAddress}` : 'No Wallet Connected'}
      </div>

      {/* Right side: Connect/Disconnect Button */}
      <div>
        {isUserSignedIn ? (
          <Button label="Disconnect Wallet" onClick={disconnectWallet} />
        ) : (
          <Button label="Connect Wallet" onClick={connectWallet} />
        )}
      </div>
    </header>
  );
};

export default Header;
