// Mock data for the app — questions and leaderboard telemetry
import type { Question } from "@/types/quiz.types";

// ---- MOCK QUESTIONS ----
export const MOCK_QUESTIONS: Question[] = [
  {
    id: "q1",
    order: 1,
    title: "The Cipher at the North Wing",
    prompt:
      "A binary sequence was intercepted on the emergency frequency: 01000001 01001111 01010100. Decode it to find the department abbreviation. What is the decoded text?",
    type: "MULTIPLE_CHOICE",
    options: ["AOT", "BAK", "TAO", "OAT"],
    points: 100,
    penaltyPerAttempt: 20,
    clues: [
      {
        id: "c1-1",
        title: "Binary Primer",
        description:
          "Each group of 8 bits represents one ASCII character. A=65, O=79, T=84.",
        isUnlocked: false,
        costPoints: 25,
      },
    ],
  },
  {
    id: "q2",
    order: 2,
    title: "The Telegram Cipher",
    prompt:
      "The encoded telegram reads: GUVF VF GUR NAFJRE. It was encoded using a simple letter substitution. What cipher is this, and what does it say?",
    type: "MULTIPLE_CHOICE",
    options: [
      "ROT-13: THIS IS THE ANSWER",
      "ROT-13: THAT WAS THE CLUE",
      "Caesar +3: CODE IS HERE",
      "Vigenere: FIND THE KEY",
    ],
    points: 150,
    penaltyPerAttempt: 30,
    clues: [
      {
        id: "c2-1",
        title: "Cipher Hint",
        description: "ROT-13 shifts each letter 13 positions in the alphabet.",
        isUnlocked: false,
        costPoints: 40,
      },
    ],
  },
  {
    id: "q3",
    order: 3,
    title: "The Witness Statement",
    prompt:
      "Witness account: 'I arrived at 23:42 and left at 00:18. The suspect was there for exactly 36 minutes before me and left 12 minutes after me.' When did the suspect leave?",
    type: "MULTIPLE_CHOICE",
    options: ["00:30", "00:06", "23:06", "01:06"],
    points: 200,
    penaltyPerAttempt: 40,
    clues: [
      {
        id: "c3-1",
        title: "Timeline Aid",
        description:
          "Draw a timeline. Suspect arrived at 23:42 - 36 = 23:06. Left at 00:18 + 12 = 00:30.",
        isUnlocked: false,
        costPoints: 50,
      },
    ],
  },
  {
    id: "q4",
    order: 4,
    title: "The Spectrographic Anomaly",
    prompt:
      "The forensic spectrograph returned hash: 5f4dcc3b5aa765d61d8327deb882cf99. This is a well-known hash of a common word. What is the plaintext?",
    type: "MULTIPLE_CHOICE",
    options: ["password", "detective", "sherlock", "221baker"],
    points: 250,
    penaltyPerAttempt: 50,
    clues: [
      {
        id: "c4-1",
        title: "Hash Type",
        description: "This is an MD5 hash. Check common MD5 rainbow tables.",
        isUnlocked: false,
        costPoints: 60,
      },
    ],
  },
  {
    id: "q5",
    order: 5,
    title: "The Final Deduction",
    prompt:
      "Combining all previous evidence: AOT + ROT13 + 00:30 + password. The first letter of each answer forms a code. What is the 4-letter code?",
    type: "MULTIPLE_CHOICE",
    options: ["ARPP", "ATOP", "ATRO", "AOTP"],
    points: 500,
    penaltyPerAttempt: 100,
    clues: [
      {
        id: "c5-1",
        title: "The Final Clue",
        description:
          "Take the first character of each of your 4 previous answers in order.",
        isUnlocked: false,
        costPoints: 100,
      },
    ],
  },
];

// ---- MOCK LEADERBOARD ----
export interface LeaderboardEntry {
  rank: number;
  teamId: string;
  agencyName: string;
  leadInspector: string;
  score: number;
  solvedCount: number;
  avgSolveMs: number;
  isMyTeam?: boolean;
}

export const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  {
    rank: 1,
    teamId: "team-1",
    agencyName: "The Diogenes Society",
    leadInspector: "Mycroft H.",
    score: 1050,
    solvedCount: 5,
    avgSolveMs: 420000,
  },
  {
    rank: 2,
    teamId: "team-2",
    agencyName: "The Scotland Yard Unit",
    leadInspector: "Lestrade G.",
    score: 850,
    solvedCount: 4,
    avgSolveMs: 510000,
  },
  {
    rank: 3,
    teamId: "team-3",
    agencyName: "The Norwood Syndicate",
    leadInspector: "James M.",
    score: 800,
    solvedCount: 4,
    avgSolveMs: 540000,
  },
  {
    rank: 4,
    teamId: "team-4",
    agencyName: "The Baskerville Syndicate",
    leadInspector: "Henry B.",
    score: 650,
    solvedCount: 3,
    avgSolveMs: 600000,
  },
  {
    rank: 5,
    teamId: "team-5",
    agencyName: "Red-Headed League",
    leadInspector: "James W.",
    score: 500,
    solvedCount: 3,
    avgSolveMs: 680000,
  },
  {
    rank: 6,
    teamId: "team-6",
    agencyName: "The Irene Network",
    leadInspector: "Irene A.",
    score: 350,
    solvedCount: 2,
    avgSolveMs: 750000,
  },
  {
    rank: 7,
    teamId: "team-7",
    agencyName: "The Yard Operatives",
    leadInspector: "Greg L.",
    score: 200,
    solvedCount: 1,
    avgSolveMs: 900000,
  },
];
