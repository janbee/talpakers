import { useEffect, useState } from 'react';
import { PredictionHistoryModel } from '@PlayAb/shared';

const usePredictionBetHistory = (predictionHistory: PredictionHistoryModel[]) => {
  const [winPercentage, setWinPercentage] = useState(0);

  useEffect(() => {
    const totalGames = predictionHistory.length;
    const teamWins: any = {};

    predictionHistory.forEach((game) => {
      const winner = game.winningTeam;
      teamWins[winner] = (teamWins[winner] || 0) + 1;
    });

    const winPercentages: any = {};
    Object.keys(teamWins).forEach((team) => {
      winPercentages[team] = Math.ceil((teamWins[team] / totalGames) * 100);
    });

    // Find the team with the highest win percentage
    const teamKeys = Object.keys(winPercentages);

    let topTeam: string | undefined;

    if (teamKeys.length > 0) {
      topTeam = teamKeys.reduce((a, b) => (winPercentages[a] > winPercentages[b] ? a : b), teamKeys[0]);
    }

    if (topTeam) {
      setWinPercentage(winPercentages[topTeam] || 0);
    } else {
      setWinPercentage(0);
    }
  }, [predictionHistory]);

  return { winPercentage };
};

export default usePredictionBetHistory;
