export interface Pronostico {
  id: number;
  utenteUsername: string;
  partitaId: number;
  partitaTitolo: string;
  scelta: '1' | 'X' | '2';
  sceltaLabel: string;
  quota: number;
  importo: number;
  potenzialeVincita: number;
  stato: 'in_attesa' | 'vinto' | 'perso';
  vincitaOttenuta: number;
  data: string;
}
