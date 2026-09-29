export interface Partita {
  id: number;
  torneoId: number;
  torneoNome: string;
  gioco: string;
  squadraA: string;
  squadraB: string;
  dataOra: string;
  stato: 'programmata' | 'in_corso' | 'conclusa';
  quota1: number;
  quotaX: number;
  quota2: number;
  risultato?: '1' | 'X' | '2';
  punteggio?: string;
}
