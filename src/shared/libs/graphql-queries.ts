export const GET_CATEGORIES = `
  query GetCategories($page: Int = 1, $limit: Int = 100) {
    categories(page: $page, limit: $limit) {
      nodes {
        id
        name
        description
        quizCount
        articleCount
        createdAt
        updatedAt
      }
      pageInfo {
        page
        limit
        total
        totalPages
        hasNext
        hasPrev
      }
    }
  }
`;

export const GET_CATEGORY = `
  query GetCategory($id: ID!) {
    category(id: $id) {
      id
      name
      description
      quizCount
      articleCount
      questionCount
      averageDifficulty
      createdAt
      updatedAt
      parent {
        id
        name
      }
      subcategories {
        id
        name
        description
      }
    }
  }
`;

export const GET_CATEGORY_WITH_ARTICLES = `
  query GetCategoryWithArticles($categoryId: ID!, $limit: Int = 5) {
    category(id: $categoryId) {
      id
      name
      description
      recentArticles(limit: $limit) {
        id
        title
        content
        createdAt
        updatedAt
        category {
          id
          name
        }
        author {
          id
          nickname
          profileImageUrl
        }
      }
    }
  }
`;

export const GET_RECENT_ARTICLES = `
  query GetRecentArticles($categoryId: ID!, $limit: Int = 5) {
    category(id: $categoryId) {
      id
      recentArticles(limit: $limit) {
        id
        title
        content
        createdAt
        updatedAt
        category {
          id
          name
          description
        }
        author {
          id
          nickname
          profileImageUrl
        }
      }
    }
  }
`;

export const GET_WORKBOOKS = `
  query GetWorkbooks($page: Int = 1, $limit: Int = 20) {
    workbooks(page: $page, limit: $limit) {
      nodes {
        id
        name
        description
        quizCount
        totalSubmissions
        averageAccuracy
        createdAt
        updatedAt
        owner {
          id
          nickname
          profileImageUrl
        }
      }
      pageInfo {
        page
        limit
        total
        totalPages
        hasNext
        hasPrev
      }
    }
  }
`;

export const GET_WORKBOOK = `
  query GetWorkbook($id: ID!) {
    workbook(id: $id) {
      id
      name
      description
      quizCount
      totalSubmissions
      averageAccuracy
      createdAt
      updatedAt
      deletedAt
      owner {
        id
        nickname
        email
        profileImageUrl
        role
      }
      quizzes {
        id
        type
        category
        subcategory
        question
        choices {
          text
          isCorrect
        }
        answer
        explanation
        difficulty
        tags
        yearAppeared
        correctRate
        totalSubmissions
        createdAt
        updatedAt
      }
    }
  }
`;

export const GET_CATEGORY_QUIZZES = `
  query GetCategoryQuizzes(
    $categoryId: ID!
    $page: Int = 1
    $limit: Int = 20
    $difficulty: QuizDifficulty
    $random: Boolean = false
  ) {
    categoryQuizzes(
      categoryId: $categoryId
      page: $page
      limit: $limit
      difficulty: $difficulty
      random: $random
    ) {
      nodes {
        id
        type
        category
        subcategory
        question
        choices {
          text
          isCorrect
        }
        answer
        explanation
        difficulty
        tags
        yearAppeared
        correctRate
        totalSubmissions
      }
      pageInfo {
        page
        limit
        total
        totalPages
        hasNext
        hasPrev
      }
    }
  }
`;

export const GET_RANDOM_QUIZ = `
  query GetRandomQuizzes($count: Int = 1) {
    randomQuizzes(count: $count) {
      id
      type
      category
      subcategory
      question
      choices {
        text
        isCorrect
      }
      answer
      explanation
      difficulty
      tags
      yearAppeared
      correctRate
      totalSubmissions
    }
  }
`;

export const GET_CURRENT_USER = `
  query GetCurrentUser {
    me {
      id
      email
      nickname
      profileImageUrl
      provider
      createdAt
      updatedAt
    }
  }
`;

export const GET_QUIZ_BY_ID = `
  query GetQuizById($id: ID!) {
    quiz(id: $id) {
      id
      type
      category
      subcategory
      question
      choices {
        text
        isCorrect
      }
      answer
      explanation
      difficulty
      tags
      yearAppeared
      correctRate
      totalSubmissions
    }
  }
`;

export const GET_DASHBOARD_STATS = `
  query GetDashboardStats($period: String!) {
    dashboardStats(period: $period) {
      totalUsers
      activeUsers
      totalQuizzes
      totalRevenue
    }
  }
`;

export const GET_MY_SUBMISSIONS = `
  query GetMySubmissions($isCorrected: Boolean) {
    mySubmissions(isCorrected: $isCorrected) {
      id
      quizId
      answer
      isCorrect
      submittedAt
      quiz {
        id
        question
        category
        subcategory
        difficulty
      }
    }
  }
`;

export const GET_QUESTIONS = `
  query GetQuestions($categoryId: ID!) {
    questions(categoryId: $categoryId) {
      id
      title
      content
      categoryId
      userId
      status
      createdAt
      updatedAt
    }
  }
`;

export const GET_MY_QUESTIONS = `
  query GetMyQuestions {
    myQuestions {
      id
      title
      content
      categoryId
      userId
      status
      createdAt
      updatedAt
    }
  }
`;

export const GET_WORKBOOK_QUIZZES = `
  query GetWorkbookQuizzes($workbookId: ID!, $page: Int = 1, $limit: Int = 100) {
    workbookQuizzes(workbookId: $workbookId, page: $page, limit: $limit) {
      nodes {
        id
        type
        category
        subcategory
        question
        choices {
          text
          isCorrect
        }
        answer
        explanation
        difficulty
        tags
        yearAppeared
        correctRate
        totalSubmissions
        createdAt
        updatedAt
      }
      pageInfo {
        page
        limit
        total
        totalPages
        hasNext
        hasPrev
      }
    }
  }
`;
