Root
├── Users
│ ├── {userId}
│ │ ├── username: string
│ │ ├── email: string
│ │ ├── avatar: string (URL or emoji)
│ │ ├── score: number
│ │ ├── gamesPlayed: number
│ │ ├── createdAt: timestamp
│ │ ├── lastActive: timestamp
│ │ ├── friends: [userId1, userId2, ...]
│ │ └── currentGameId: string (optional, if in-game)
│
├── Games
│ ├── {gameId}
│ │ ├── status: string ("waiting", "in-progress", "completed")
│ │ ├── hostId: string (userId)
│ │ ├── createdAt: timestamp
│ │ ├── startedAt: timestamp
│ │ ├── players
│ │ │ ├── {playerId}
│ │ │ │ ├── username: string
│ │ │ │ ├── score: number
│ │ │ │ └── answers: [questionId1: boolean, questionId2: boolean, ...]
│ │ ├── questions
│ │ │ ├── {questionId}
│ │ │ │ ├── questionText: string
│ │ │ │ ├── options: [string, string, string, string]
│ │ │ │ ├── correctOption: number (index of the correct answer)
│ │ │ │ └── timeLimit: number (in seconds)
│ │ ├── chat
│ │ │ ├── {messageId}
│ │ │ │ ├── senderId: string
│ │ │ │ ├── messageText: string
│ │ │ │ ├── timestamp: timestamp
│ │ │ └── ...
│ │ └── endedAt: timestamp
│
├── Questions (Global Question Bank)
│ ├── {questionId}
│ │ ├── questionText: string
│ │ ├── options: [string, string, string, string]
│ │ ├── correctOption: number
│ │ ├── category: string
│ │ ├── difficulty: string ("easy", "medium", "hard")
│ │ ├── createdAt: timestamp
│ │ └── createdBy: string (userId or "admin")
│
└── Leaderboard
├── {entryId}
│ ├── userId: string
│ ├── username: string
│ ├── score: number
│ ├── rank: number
│ └── timestamp: timestamp
