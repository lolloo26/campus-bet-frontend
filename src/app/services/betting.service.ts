import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Torneo } from '../models/torneo.model';
import { Partita } from '../models/partita.model';
import { Pronostico } from '../models/pronostico.model';
import { Utente } from '../models/utente.model';

@Injectable({
  providedIn: 'root',
})
export class BettingService {
  private readonly http = inject(HttpClient);

  // URL per Strapi (se attivo in localhost)
  readonly strapiUrl = signal('http://localhost:1337');
  readonly strapiConnesso = signal(false);

  // Utente loggato
  readonly utente = signal<Utente>({
    id: '1',
    username: 'studente',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=studente',
    crediti: 1000,
    creditiIniziali: 1000,
    pronosticiEffettuati: 2,
    pronosticiVinti: 1,
  });

  // Lista tornei
  readonly tornei = signal<Torneo[]>([
    {
      id: 1,
      nome: 'Rocket League Championship',
      gioco: 'Rocket League',
      stato: 'in_corso',
      dataInizio: '2026-03-20',
      dataFine: '2026-04-10',
      numeroPartecipanti: 8,
      immagine: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
      descrizione: 'Il massimo campionato continentale di Rocket League con le migliori 8 squadre universitarie.',
      squadre: ['Team Alpha', 'Team Omega', 'Vitality eSport', 'Karmine Squad', 'Falcons RL', 'BDS Academy', 'G2 Campus', 'Ninjas RL'],
    },
    {
      id: 2,
      nome: 'Valorant Campus Masters',
      gioco: 'Valorant',
      stato: 'in_corso',
      dataInizio: '2026-03-15',
      dataFine: '2026-04-05',
      numeroPartecipanti: 6,
      immagine: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80',
      descrizione: 'Sfida tattica al cardiopalma su Valorant. Solo il miglior team conquisterà la coppa.',
      squadre: ['Fnatic Campus', 'Sentinels IT', 'Paper Rex IT', 'LOUD eSport', 'DRX Team', 'KOI Squad'],
    },
    {
      id: 3,
      nome: 'League of Legends Winter Cup',
      gioco: 'League of Legends',
      stato: 'programmato',
      dataInizio: '2026-04-01',
      dataFine: '2026-04-20',
      numeroPartecipanti: 8,
      immagine: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80',
      descrizione: 'Torneo a eliminazione diretta nella Landa degli Evocatori.',
      squadre: ['T1 Campus', 'Gen.G Italia', 'G2 Academy', 'Fnatic Rising', 'MAD Lions', 'Heretics IT'],
    },
    {
      id: 4,
      nome: 'FC 25 eSports Challenge',
      gioco: 'FIFA / FC 25',
      stato: 'concluso',
      dataInizio: '2026-02-10',
      dataFine: '2026-03-01',
      numeroPartecipanti: 4,
      immagine: 'https://images.unsplash.com/photo-1489944445387-6000f6329337?auto=format&fit=crop&w=800&q=80',
      descrizione: 'Torneo concluso di calcio virtuale ad alto livello competitivo.',
      squadre: ['Real Milano eSport', 'Campus FC', 'Roma Gaming', 'Napoli eSports'],
    },
  ]);

  // Lista partite
  readonly partite = signal<Partita[]>([
    {
      id: 1,
      torneoId: 1,
      torneoNome: 'Rocket League Championship',
      gioco: 'Rocket League',
      squadraA: 'Team Alpha',
      squadraB: 'Team Omega',
      dataOra: 'Domani, ore 18:00',
      stato: 'programmata',
      quota1: 1.80,
      quotaX: 3.20,
      quota2: 2.10,
    },
    {
      id: 2,
      torneoId: 1,
      torneoNome: 'Rocket League Championship',
      gioco: 'Rocket League',
      squadraA: 'Vitality eSport',
      squadraB: 'Karmine Squad',
      dataOra: 'Oggi, ore 21:00',
      stato: 'programmata',
      quota1: 1.65,
      quotaX: 3.50,
      quota2: 2.30,
    },
    {
      id: 3,
      torneoId: 2,
      torneoNome: 'Valorant Campus Masters',
      gioco: 'Valorant',
      squadraA: 'Fnatic Campus',
      squadraB: 'Sentinels IT',
      dataOra: 'Oggi, ore 19:30',
      stato: 'programmata',
      quota1: 1.95,
      quotaX: 3.10,
      quota2: 1.90,
    },
    {
      id: 4,
      torneoId: 2,
      torneoNome: 'Valorant Campus Masters',
      gioco: 'Valorant',
      squadraA: 'Paper Rex IT',
      squadraB: 'LOUD eSport',
      dataOra: 'Ieri, ore 20:00',
      stato: 'conclusa',
      quota1: 1.75,
      quotaX: 3.40,
      quota2: 2.15,
      risultato: '1',
      punteggio: '2 - 0',
    },
    {
      id: 5,
      torneoId: 4,
      torneoNome: 'FC 25 eSports Challenge',
      gioco: 'FIFA / FC 25',
      squadraA: 'Real Milano eSport',
      squadraB: 'Campus FC',
      dataOra: '25 Febbraio 2026',
      stato: 'conclusa',
      quota1: 2.05,
      quotaX: 3.00,
      quota2: 1.85,
      risultato: '2',
      punteggio: '1 - 3',
    },
  ]);

  // Lista pronostici
  readonly pronostici = signal<Pronostico[]>([
    {
      id: 1,
      utenteUsername: 'studente',
      partitaId: 4,
      partitaTitolo: 'Paper Rex IT vs LOUD eSport',
      scelta: '1',
      sceltaLabel: 'Paper Rex IT',
      quota: 1.75,
      importo: 100,
      potenzialeVincita: 175,
      stato: 'vinto',
      vincitaOttenuta: 175,
      data: '28/03/2026, 17:30',
    },
    {
      id: 2,
      utenteUsername: 'studente',
      partitaId: 5,
      partitaTitolo: 'Real Milano eSport vs Campus FC',
      scelta: '1',
      sceltaLabel: 'Real Milano eSport',
      quota: 2.05,
      importo: 50,
      potenzialeVincita: 102.5,
      stato: 'perso',
      vincitaOttenuta: 0,
      data: '24/02/2026, 15:45',
    },
  ]);

  // Classifica utenti
  readonly classifica = signal<Utente[]>([
    {
      id: '2',
      username: 'Martina',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Martina',
      crediti: 2450,
      creditiIniziali: 1000,
      pronosticiEffettuati: 15,
      pronosticiVinti: 12,
    },
    {
      id: '3',
      username: 'Luca',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Luca',
      crediti: 2220,
      creditiIniziali: 1000,
      pronosticiEffettuati: 14,
      pronosticiVinti: 10,
    },
    {
      id: '4',
      username: 'Andrea',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Andrea',
      crediti: 2050,
      creditiIniziali: 1000,
      pronosticiEffettuati: 13,
      pronosticiVinti: 9,
    },
    {
      id: '5',
      username: 'Sofia',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Sofia',
      crediti: 1680,
      creditiIniziali: 1000,
      pronosticiEffettuati: 10,
      pronosticiVinti: 6,
    },
    {
      id: '1',
      username: 'studente',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=studente',
      crediti: 1025,
      creditiIniziali: 1000,
      pronosticiEffettuati: 2,
      pronosticiVinti: 1,
    },
  ]);

  constructor() {
    this.caricaDatiLocali();
    this.tentaConnessioneStrapi();
  }

  // Tenta il caricamento da Strapi se disponibile
  async tentaConnessioneStrapi(): Promise<void> {
    try {
      const url = `${this.strapiUrl()}/api/tournaments?populate=*`;
      const res: any = await firstValueFrom(this.http.get(url));
      if (res && res.data) {
        this.strapiConnesso.set(true);
        console.log('Connesso a Strapi con successo!');
      }
    } catch {
      this.strapiConnesso.set(false);
      console.log('Strapi non attivo o non configurato. Uso dati locali/demo.');
    }
  }

  // Salva stato locale
  private salvaDatiLocali(): void {
    try {
      localStorage.setItem('campus_bet_utente', JSON.stringify(this.utente()));
      localStorage.setItem('campus_bet_partite', JSON.stringify(this.partite()));
      localStorage.setItem('campus_bet_pronostici', JSON.stringify(this.pronostici()));
      localStorage.setItem('campus_bet_classifica', JSON.stringify(this.classifica()));
    } catch (e) {
      console.warn('LocalStorage non disponibile', e);
    }
  }

  private caricaDatiLocali(): void {
    try {
      const u = localStorage.getItem('campus_bet_utente');
      if (u) this.utente.set(JSON.parse(u));

      const p = localStorage.getItem('campus_bet_partite');
      if (p) this.partite.set(JSON.parse(p));

      const pr = localStorage.getItem('campus_bet_pronostici');
      if (pr) this.pronostici.set(JSON.parse(pr));

      const c = localStorage.getItem('campus_bet_classifica');
      if (c) this.classifica.set(JSON.parse(c));
    } catch (e) {
      console.warn('Errore lettura LocalStorage', e);
    }
  }

  // Trova partita per ID
  getPartitaById(id: number): Partita | undefined {
    return this.partite().find((p) => p.id === id);
  }

  // Trova torneo per ID
  getTorneoById(id: number): Torneo | undefined {
    return this.tornei().find((t) => t.id === id);
  }

  // Piazza un pronostico
  piazzaPronostico(
    partitaId: number,
    scelta: '1' | 'X' | '2',
    importo: number
  ): { ok: boolean; messaggio: string } {
    const partita = this.getPartitaById(partitaId);
    if (!partita) {
      return { ok: false, messaggio: 'Partita non trovata.' };
    }

    if (partita.stato === 'conclusa') {
      return { ok: false, messaggio: 'Questa partita è già conclusa!' };
    }

    if (importo <= 0) {
      return { ok: false, messaggio: 'Inserisci un importo valido (almeno 1 credito).' };
    }

    if (importo > this.utente().crediti) {
      return { ok: false, messaggio: 'Crediti insufficienti nel tuo portafoglio virtuale!' };
    }

    // Calcolo quota e label
    let quota = partita.quota1;
    let label = partita.squadraA;
    if (scelta === 'X') {
      quota = partita.quotaX;
      label = 'Pareggio';
    } else if (scelta === '2') {
      quota = partita.quota2;
      label = partita.squadraB;
    }

    const potenzialeVincita = Math.round(importo * quota * 100) / 100;
    const nuovoPronostico: Pronostico = {
      id: Date.now(),
      utenteUsername: this.utente().username,
      partitaId: partita.id,
      partitaTitolo: `${partita.squadraA} vs ${partita.squadraB}`,
      scelta,
      sceltaLabel: label,
      quota,
      importo,
      potenzialeVincita,
      stato: 'in_attesa',
      vincitaOttenuta: 0,
      data: new Date().toLocaleString('it-IT', { dateStyle: 'short', timeStyle: 'short' }),
    };

    // Scala crediti all'utente
    this.utente.update((u) => ({
      ...u,
      crediti: u.crediti - importo,
      pronosticiEffettuati: u.pronosticiEffettuati + 1,
    }));

    // Aggiungi pronostico in cima alla lista
    this.pronostici.update((lista) => [nuovoPronostico, ...lista]);

    // Aggiorna anche utente in classifica
    this.aggiornaUtenteInClassifica();
    this.salvaDatiLocali();

    return { ok: true, messaggio: 'Pronostico piazzato con successo!' };
  }

  // Risolve o conclude una partita assegnando un risultato
  concludiPartita(partitaId: number, risultato: '1' | 'X' | '2', punteggio?: string): void {
    const punteggioFinale = punteggio || (risultato === '1' ? '2 - 1' : risultato === 'X' ? '1 - 1' : '1 - 2');

    // 1. Aggiorna stato della partita
    this.partite.update((lista) =>
      lista.map((p) =>
        p.id === partitaId
          ? { ...p, stato: 'conclusa' as const, risultato, punteggio: punteggioFinale }
          : p
      )
    );

    // 2. Calcola i pronostici collegati
    let creditiVintiTotali = 0;
    let pronosticiVintiAggiunti = 0;

    this.pronostici.update((lista) =>
      lista.map((pr) => {
        if (pr.partitaId === partitaId && pr.stato === 'in_attesa') {
          const vinto = pr.scelta === risultato;
          if (vinto) {
            creditiVintiTotali += pr.potenzialeVincita;
            pronosticiVintiAggiunti += 1;
            return {
              ...pr,
              stato: 'vinto' as const,
              vincitaOttenuta: pr.potenzialeVincita,
            };
          } else {
            return {
              ...pr,
              stato: 'perso' as const,
              vincitaOttenuta: 0,
            };
          }
        }
        return pr;
      })
    );

    // 3. Se l'utente ha vinto crediti, accredita al wallet
    if (creditiVintiTotali > 0 || pronosticiVintiAggiunti > 0) {
      this.utente.update((u) => ({
        ...u,
        crediti: Math.round((u.crediti + creditiVintiTotali) * 100) / 100,
        pronosticiVinti: u.pronosticiVinti + pronosticiVintiAggiunti,
      }));
    }

    this.aggiornaUtenteInClassifica();
    this.salvaDatiLocali();
  }

  // Funzione richiesta dalla sezione H del progetto:
  // "determinare CASUALMENTE il vincitore di ogni singolo incontro"
  simulaPartiteCasuali(): number {
    const partiteAperte = this.partite().filter((p) => p.stato !== 'conclusa');
    const esiti: ('1' | 'X' | '2')[] = ['1', 'X', '2'];

    for (const partita of partiteAperte) {
      const esitoCasuale = esiti[Math.floor(Math.random() * esiti.length)];
      const goalA = esitoCasuale === '1' ? 2 : esitoCasuale === 'X' ? 1 : 0;
      const goalB = esitoCasuale === '2' ? 2 : esitoCasuale === 'X' ? 1 : 0;
      this.concludiPartita(partita.id, esitoCasuale, `${goalA} - ${goalB}`);
    }

    return partiteAperte.length;
  }

  // Ricarica crediti demo
  ricaricaCrediti(ammontare: number = 500): void {
    this.utente.update((u) => ({
      ...u,
      crediti: u.crediti + ammontare,
    }));
    this.aggiornaUtenteInClassifica();
    this.salvaDatiLocali();
  }

  // Cambio utente per testare la classifica (Martina, Luca, Andrea o un nuovo nome)
  cambiaUtente(nuovoNome: string): void {
    const nome = nuovoNome.trim();
    if (!nome) return;

    const esistente = this.classifica().find((u) => u.username.toLowerCase() === nome.toLowerCase());
    if (esistente) {
      this.utente.set({ ...esistente });
    } else {
      const nuovo: Utente = {
        id: String(Date.now()),
        username: nome,
        avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(nome)}`,
        crediti: 1000,
        creditiIniziali: 1000,
        pronosticiEffettuati: 0,
        pronosticiVinti: 0,
      };
      this.utente.set(nuovo);
      this.classifica.update((c) => [...c, nuovo]);
    }
    this.salvaDatiLocali();
  }

  // Sincronizza l'utente corrente con la classifica ordinata per crediti
  private aggiornaUtenteInClassifica(): void {
    const u = this.utente();
    this.classifica.update((lista) => {
      const aggiornata = lista.map((item) => (item.username === u.username ? { ...u } : item));
      return aggiornata.sort((a, b) => b.crediti - a.crediti);
    });
  }

  // Reset completo ai valori demo
  resetDati(): void {
    localStorage.removeItem('campus_bet_utente');
    localStorage.removeItem('campus_bet_partite');
    localStorage.removeItem('campus_bet_pronostici');
    localStorage.removeItem('campus_bet_classifica');
    window.location.reload();
  }
}
