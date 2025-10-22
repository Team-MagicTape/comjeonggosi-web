import mongoose, { Schema, Document, Types } from 'mongoose';

export enum QuizType {
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  TRUE_FALSE = 'TRUE_FALSE',
  SHORT_ANSWER = 'SHORT_ANSWER',
}

export enum QuizDifficulty {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD',
}

export interface IChoice {
  text: string;
  isCorrect: boolean;
}

export interface IQuiz extends Document {
  _id: Types.ObjectId;
  type: QuizType;
  category: string;
  subcategory?: string;
  difficulty: QuizDifficulty;
  question: string;
  choices?: IChoice[];
  answer?: string;
  explanation?: string;
  tags: string[];
  source?: string;
  yearAppeared?: number;
  metadata?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

export function getQuizIdString(quiz: IQuiz): string {
  return quiz._id.toString();
}

export function getQuizIdsStrings(quizzes: IQuiz[]): string[] {
  return quizzes.map((quiz) => quiz._id.toString());
}

const ChoiceSchema = new Schema(
  {
    text: { type: String, required: true },
    isCorrect: { type: Boolean, required: true },
  },
  { _id: false },
);

const QuizSchema = new Schema<IQuiz>(
  {
    type: {
      type: String,
      enum: Object.values(QuizType),
      required: true,
    },
    category: {
      type: String,
      required: true,
      index: true,
    },
    subcategory: {
      type: String,
      index: true,
    },
    difficulty: {
      type: String,
      enum: Object.values(QuizDifficulty),
      required: true,
      index: true,
    },
    question: {
      type: String,
      required: true,
    },
    choices: {
      type: [ChoiceSchema],
      required: function (this: IQuiz) {
        return this.type === QuizType.MULTIPLE_CHOICE;
      },
      validate: {
        validator: function (this: IQuiz, choices: IChoice[]) {
          if (this.type === QuizType.MULTIPLE_CHOICE) {
            return choices && choices.length >= 2 && choices.some((c) => c.isCorrect);
          }
          return true;
        },
        message:
          'Multiple choice questions must have at least 2 choices with at least one correct answer',
      },
    },
    answer: {
      type: String,
      required: function (this: IQuiz) {
        return this.type !== QuizType.MULTIPLE_CHOICE;
      },
    },
    explanation: String,
    tags: {
      type: [String],
      default: [],
    },
    source: String,
    yearAppeared: {
      type: Number,
      index: true,
    },
    metadata: {
      type: Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  },
);

QuizSchema.index({ category: 1, difficulty: 1 });
QuizSchema.index({ tags: 1 });
QuizSchema.index({ yearAppeared: -1 });
QuizSchema.index({ createdAt: -1 });
QuizSchema.index({ question: 'text' });

export const Quiz = mongoose.model<IQuiz>('Quiz', QuizSchema);
