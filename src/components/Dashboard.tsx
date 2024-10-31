import { FC, useEffect, useState } from "react";
import { Doughnut, Bar } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { StacksTestnet } from "@stacks/network";
import { UserSession } from "@stacks/connect";
import { callReadOnlyFunction, cvToJSON, stringAsciiCV } from "@stacks/transactions";

// Register Chart.js components
Chart.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const Dashboard: FC<{
    walletAddress: string;
    userSession: UserSession;
    showDashboard: boolean;
    setDashboard: (state: boolean) => void;
    passCandidates: any[];
}> = ({ walletAddress, userSession, showDashboard, setDashboard, passCandidates }) => {
    const [candidatesPerVotes, setCandidatesPerVotes] = useState<Map<string, number>>(new Map());
    const [loading, setLoading] = useState(false);

    const fetchVotesPerCandidate = async (candidatesList: string[]) => {
        if (!walletAddress) return;
        setLoading(true);
        const network = new StacksTestnet();
        const votesMap = new Map<string, number>();

        for (let candidate of candidatesList) {
            console.log(candidate);
            const txOptions = {
                contractAddress: "ST1VSYCCDQ5K5G8TBMPZM3QV2YDGBWWMTWMXJ8XHP",
                contractName: 'core_vote',
                functionName: 'get-candidate-votes',
                functionArgs: [stringAsciiCV(candidate)],
                network,
                senderAddress: walletAddress,
            };
            try {
                const result = await callReadOnlyFunction(txOptions);
                const votes = cvToJSON(result).value.value;
                votesMap.set(candidate, votes);
            } catch (error) {
                console.error(`Error fetching votes for ${candidate}:`, error);
            }
        }
        setCandidatesPerVotes(votesMap);
        setLoading(false);
    };

    useEffect(() => {
        fetchVotesPerCandidate(passCandidates.map((c) => c.value));
    }, [passCandidates]);

    // Extract labels and data for the charts from the Map
    const candidateNames = Array.from(candidatesPerVotes.keys());
    const candidateVotes = Array.from(candidatesPerVotes.values());

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Resultados de la elección</p>
            
            {/* Doughnut Chart */}
            <div className="container-chart" style={{ width: '30%', float: 'left', marginRight: '5%' }}>
                <Doughnut
                    data={{
                        labels: candidateNames, // Use candidate names from the map
                        datasets: [
                            {
                                label: '# de Votos',
                                data: candidateVotes, // Use the votes data from the map
                                backgroundColor: [
                                    'rgba(255, 99, 132)',
                                    'rgba(54, 162, 235)',
                                    'rgba(255, 206, 86)',
                                    'rgba(75, 192, 192)',
                                    'rgba(153, 102, 255)',
                                ],
                                borderColor: [
                                    'rgba(255, 99, 132, 1)',
                                    'rgba(54, 162, 235, 1)',
                                    'rgba(255, 206, 86, 1)',
                                    'rgba(75, 192, 192, 1)',
                                    'rgba(153, 102, 255, 1)',
                                ],
                                borderWidth: 1,
                            },
                        ],
                    }}
                    options={{
                        responsive: true,
                        maintainAspectRatio: true,
                        plugins: {
                            legend: {
                                position: 'top',
                                labels: {
                                    color:'white'
                                }
                            },
                        },
                    }}
                />
            </div>

            {/* Bar Chart */}
            <div className="container-chart" style={{ width: '60%', float: 'left' }}>
                <Bar
                    data={{
                        labels: candidateNames, // Use candidate names from the map
                        datasets: [
                            {
                                label: 'Votos por candidato',
                                data: candidateVotes, // Use the votes data from the map
                                backgroundColor: 'rgba(75, 192, 192)',
                                borderColor: 'rgba(75, 192, 192, 1)',
                                borderWidth: 1,
                            },
                        ],
                    }}
                    options={{
                        responsive: true,
                        maintainAspectRatio: true,
                        scales: {
                            x: {
                                beginAtZero: true,
                                ticks: {
                                    color: 'white',}
                            },
                            y: {
                                beginAtZero: true,
                                ticks: {
                                    color: 'white',}
                            },
                        },
                        plugins: {
                            legend: {
                                position: 'top',
                                labels: {
                                    color:'white'
                                }   
                            },
                        },
                    }}
                />
            </div>

            {/* Clear Floats */}
            <div style={{ clear: 'both' }}></div>
        </div>
    );
};

export default Dashboard;
