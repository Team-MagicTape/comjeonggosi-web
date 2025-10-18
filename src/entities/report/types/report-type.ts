import { Period } from "./period-type";
export interface ReportType{
    period : Period,
    studyTime : number,
    completedQuizzes : number,
    averageScore : number,
    improvement : number

}
