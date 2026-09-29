export interface Torneo {
  id: number;
  nome: string;
  gioco: string;
  stato: 'programmato' | 'in_corso' | 'concluso';
  dataInizio: string;
  dataFine: string;
  numeroPartecipanti: number;
  immagine: string;
  descrizione: string;
  squadre: string[];
}
