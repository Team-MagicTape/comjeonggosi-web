export interface ReportType {
  currentWeek: {
    overview: {
      totalQuizzes: number;
      correctAnswers: number;
      accuracy: number;
      improvementRate: number;
    };
    categoryStats: Array<{
      category: string;
      count: number;
      accuracy: number;
    }>;
    difficultyStats: Array<{
      difficulty: string;
      count: number;
      accuracy: number;
    }>;
    timeStats: {
      hourlyDistribution: number[];
      peakHour: {
        hour: number;
        count: number;
      };
      dailyAverage: number;
      activeDays: number;
    };
    streakData: {
      currentStreak: number;
      longestStreak: number;
      totalDaysActive: number;
      averageStreakLength: number;
    };
    weakAreas: string[];
    strongAreas: string[];
  };
  previousWeek: {
    overview: {
      totalQuizzes: number;
      correctAnswers: number;
      accuracy: number;
      improvementRate: number;
    };
    categoryStats: Array<{
      categoryId: string;
      categoryName: string;
      total: number;
      correct: number;
      accuracy: number;
    }>;
    difficultyStats: Array<{
      level: string;
      total: number;
      correct: number;
      accuracy: number;
    }>;
    timeStats: {
      hourlyDistribution: number[];
      peakHour: {
        hour: number;
        count: number;
      };
      dailyAverage: number;
      activeDays: number;
    };
    streakData: {
      currentStreak: number;
      longestStreak: number;
      totalDaysActive: number;
      averageStreakLength: number;
    };
    weakAreas: string[];
    strongAreas: string[];
  };
  comparison: {
    quizzesChange: number;
    accuracyChange: number;
  };
  insights: string[];
}

