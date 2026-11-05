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
}