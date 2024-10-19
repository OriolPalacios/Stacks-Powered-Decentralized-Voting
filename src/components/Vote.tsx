import { FC, useEffect, useState } from "react";
import { StacksTestnet } from "@stacks/network";
import { UserSession, showContractCall } from "@stacks/connect";
import { callReadOnlyFunction, cvToJSON, stringAsciiCV, AnchorMode, PostConditionMode, principalCV } from "@stacks/transactions";
import Button from "./Button";
import { Button as Btn } from "react-bootstrap";
import { Container, Stack, Card } from "react-bootstrap";
import styles from "./Vote.module.css";


const Vote: FC<{ walletAddress: string, userSession: UserSession, setPassCandidates: ([]) => void }> = ({ walletAddress, userSession, setPassCandidates }) => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasVoted, sethasVoted] = useState(false);
  const fetchCandidates = async () => {
    if (!walletAddress) return; // Exit if wallet address is not available
    const network = new StacksTestnet();
    const txOptions = {
      contractAddress: 'ST1VSYCCDQ5K5G8TBMPZM3QV2YDGBWWMTWMXJ8XHP',
      contractName: 'test_vote_2',
      functionName: 'get-candidates',
      functionArgs: [], // Adjust if arguments are needed
      network,
      senderAddress: walletAddress,
    };
    try {
      setLoading(true); // Set loading to true before fetching
      const result = await callReadOnlyFunction(txOptions);
      const candidatesListJSON = cvToJSON(result).value.value;
      const candidatesList = candidatesListJSON.map((value) => value);
      setCandidates(candidatesList);
      setPassCandidates(candidatesList);
    } catch (error) {
      console.error('Error :', error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const checkIfVoted = async () => {
    if (!walletAddress) return; // Exit if wallet address is not available
    const network = new StacksTestnet();
    const txOptions = {
      contractAddress: 'ST1VSYCCDQ5K5G8TBMPZM3QV2YDGBWWMTWMXJ8XHP',
      contractName: 'test_vote_2',
      functionName: 'has-address-voted',
      functionArgs: [principalCV(walletAddress)], // Adjust if arguments are needed
      network,
      senderAddress: walletAddress,
    };
    try {
      setLoading(true); // Set loading to true before fetching
      const result = await callReadOnlyFunction(txOptions);
      const hasVoted = cvToJSON(result).value;
      sethasVoted(hasVoted);
    } catch (error) {
      console.error('Error :', error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Function to cast a vote for a specific candidate
  const voteForCandidate = async (candidate: string) => {
    if (!walletAddress) return;

    const network = new StacksTestnet();

    // Estimate the fee
    const estimatedFee = 1000; // Set a higher estimated fee (in microSTX)

    const txOptions = {
      contractAddress: 'ST1VSYCCDQ5K5G8TBMPZM3QV2YDGBWWMTWMXJ8XHP',
      contractName: 'test_vote_2',
      functionName: 'vote',
      functionArgs: [stringAsciiCV(candidate)],
      senderKey: userSession.loadUserData().appPrivateKey,
      validateWithAbi: true,
      network,
      anchorMode: AnchorMode.Any,
      fee: estimatedFee,
      postConditionMode: PostConditionMode.Deny,
      onFinish: () => { sethasVoted(false) },
      onCancel: () => { sethasVoted(true) },
    };

    try {
      showContractCall(txOptions);
    } catch (error) {
      console.error('Failed to cast vote:', error);
    }
  };

  useEffect(() => {
    fetchCandidates(); // Call fetchCandidates when walletAddress changes
    checkIfVoted();
  }, [walletAddress]);

  if (loading) {
    return <p>Loading candidates...</p>; // Show loading message
  }

  return (
    <Container fluid className={`${styles.MainContainer}`}>
      <h3>Elija la opción de su preferencia</h3>
      <Stack direction="horizontal" gap={2} className="justify-content-center">
        {candidates.map((candidate, index) => (
          <Stack key={index} direction="vertical" className={`${styles.candidateContainer}`}>
            <Card className={`${styles.voteCard}`}>
              <Card.Body className={`${styles.voteCardBody}`}>
                <Stack direction="vertical" gap={2} className="justify-content-center">
                  <Card.Title className={styles.cartTitle}>{candidate.value}</Card.Title>
                  {/* <Button label="Votar" onClick={() => voteForCandidate(candidate.value)} disabled={!hasVoted} className="s s" variant="light"/> */}
                  <Btn variant="light" disabled={!hasVoted} onClick={() => voteForCandidate(candidate.value)} className={styles.btnCard}>Votar</Btn>
                </Stack>  
              </Card.Body>
            </Card>
          </Stack>
        ))}
      </Stack>
    </Container>
  );

};

export default Vote;