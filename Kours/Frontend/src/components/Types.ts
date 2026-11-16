
import type {  ReactNode } from "react";

export type Course = {
  id: string;
  title: string;
  type: 'Cours complet' | 'Fiche révision';
  status: 'Publié' | 'Privé';
  domain: string;
  level: string;
  university: string;
  author: string;
  year: string;
  rating: number | string;
  likes: number;
  comments: number;
  previewImage?: string;
  extensions?: string[]; // ex: ['PDF', 'DOCX', 'ZIP']
  downloadUrl?: string;
}



 export type Question = {
    id: number;
    text: string;
    options: Option[];
    isExpanded: boolean;
}

export type Option = {
    id: string;
    text: string;
    isCorrect: boolean;
}

export type CreateQuizProps = {
    onSave?: (quizData: any) => void;
    onPublish?: (quizData: any) => void;
}

export type PopUpProps =
{
    IsOpen?:boolean;
    IsClosed?:boolean;
    children:ReactNode;
}
export type QuizDemoProps =  {
    questions: Question[];
    quizTitle?: string;
    onClose: () => void;
}
export type Space = {
    id: string;
    title: string;
    membersCount: number;
    role: 'Admin' | 'Membre';
    newCoursesCount: number;
}
export type JoinRequest = {
    id: string;
    userName: string;
    spaceName: string;
}