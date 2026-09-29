# ⚡ Campus Bet — Simulatore di Pronostici eSport

Applicazione didattica sviluppata per il corso **ITS**, basata su **Angular v22** (sintassi moderna: Signals, Standalone Components, Control Flow `@if` / `@for`, `input()`, `inject()`, `HttpClient` con `firstValueFrom` e `async/await`) e predisposta per comunicare con **Strapi**.

---

## 🎯 Funzionalità Implementate

1. **Home Page (`/`)**:
   - Banner hero esplicativo con funzionamento del simulatore.
   - Scheda riepilogo saldo crediti virtuali dell'utente loggato.
   - Prossimi incontri e quote rapide (Alpha vs Omega, ecc.).
   - Tornei in evidenza.
   - Podio Top 3 della classifica.

2. **Elenco Tornei (`/tornei`)**:
   - Elenco tornei eSport (Rocket League, Valorant, League of Legends, FC 25).
   - Filtri interattivi per **gioco** e **stato** (In corso, Programmati, Conclusi).

3. **Dettaglio Torneo (`/tornei/:id`)**:
   - Scheda descrittiva e date.
   - Elenco delle squadre partecipanti.
   - Calendario incontri e pronostici disponibili.
   - Risultati conclusi.

4. **Dettaglio Partita & Modulo Scommessa (`/partite/:id`)**:
   - Scontro visivo tra Squadra A e Squadra B con quote (1, X, 2).
   - Modulo per effettuare il pronostico con crediti virtuali gratuiti.
   - Calcolo automatico in tempo reale della potenziale vincita.
   - Validazione (crediti sufficienti, importo > 0, incontro non chiuso).
   - Feedback istantaneo di successo o errore.

5. **I Miei Pronostici (`/miei-pronostici`)**:
   - Riepilogo storico: totale giocato, incassato, bilancio netto (+/- crediti).
   - Filtri per stato: Tutti, In Attesa, Vinti, Persi.
   - Tabella con dettagli giocata, quota e vincita.

6. **Classifica Generale & Amici (`/classifica`)**:
   - Podio visivo (#1 Martina, #2 Luca, #3 Andrea...).
   - Ordinamento dinamico per saldo crediti o per % di vittorie.
   - Evidenziazione visiva dell'utente corrente ("Tu").

7. **Profilo & Portafoglio Virtuale (`/profilo`)**:
   - Statistiche personali complete (crediti, winrate, totale scommesso).
   - Ricarica rapida crediti virtuali gratuiti (+500 crediti).
   - Selettore per impersonare i compagni di gruppo o registrare nuovi profili per simulare le sfide di classe.
   - Reset dati demo.

8. **Pannello Admin & Simulatore Risultati (`/admin`)**:
   - Risponde al **Requisito H**: simulazione casuale automatica dei risultati per tutte le partite in programma, refertazione dei pronostici e accredito immediato delle vincite.
   - Permette anche l'assegnazione manuale dell'esito per singola partita.

---

## 🛠️ Architettura e Concetti Angular (come da lezione)

- **Signals (`signal()`, `set()`, `update()`)**: gestione dello stato reattivo immutabile (nessun mutamento sul posto, spread operator `...` per array e oggetti).
- **Template Control Flow**: `@if`, `@for (...; track ...)`, `@empty`.
- **Signal Inputs**: `input.required<T>()` nei componenti riutilizzabili (`PartitaCard`, `TorneoCard`).
- **Dependency Injection**: `inject(BettingService)`, `inject(HttpClient)`, `inject(ActivatedRoute)`.
- **Chiamate HTTP asincrone**: `firstValueFrom(http.get(...))` con `async/await` e `try/catch`.
- **Integrazione Strapi**: tenta la connessione a `http://localhost:1337/api/tournaments?populate=*`. Se Strapi non è attivo, l'app passa trasparentemente alla modalità demo locale su `localStorage`, permettendo il funzionamento completo senza errori.

---

## 🚀 Come Avviare il Progetto

```bash
# 1. Avviare il server di sviluppo Angular
npm start
# oppure
ng serve
```

Apri il browser su: **http://localhost:4200**

### Eseguire i test unitari
```bash
npm test
```
