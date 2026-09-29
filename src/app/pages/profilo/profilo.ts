import { Component, ChangeDetectionStrategy, inject, signal, computed } from '@angular/core';
import { BettingService } from '../../services/betting.service';

@Component({
  selector: 'app-profilo',
  imports: [],
  templateUrl: './profilo.html',
  styleUrl: './profilo.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Profilo {
  private readonly bettingService = inject(BettingService);

  protected readonly utente = this.bettingService.utente;
  protected readonly classifica = this.bettingService.classifica;
  protected readonly pronostici = this.bettingService.pronostici;

  protected readonly nuovoNomeInput = signal('');
  protected readonly messaggioFeedback = signal<string | null>(null);

  // Posizione in classifica dell'utente
  protected readonly posizioneClassifica = computed(() => {
    const username = this.utente().username;
    const sorted = [...this.classifica()].sort((a, b) => b.crediti - a.crediti);
    const index = sorted.findIndex((u) => u.username === username);
    return index !== -1 ? index + 1 : '-';
  });

  // Totale scommesso
  protected readonly totaleScommesso = computed(() => {
    const username = this.utente().username;
    return this.pronostici()
      .filter((p) => p.utenteUsername === username)
      .reduce((sum, p) => sum + p.importo, 0);
  });

  // Percentuale successo
  protected readonly winrate = computed(() => {
    const u = this.utente();
    if (u.pronosticiEffettuati === 0) return 0;
    return Math.round((u.pronosticiVinti / u.pronosticiEffettuati) * 100);
  });

  // Ricarica 500 crediti virtuali
  ricaricaCrediti(): void {
    this.bettingService.ricaricaCrediti(500);
    this.mostraMessaggio('Ricarica effettuata! +500 crediti virtuali accreditati.');
  }

  // Cambio utente rapido (Martina, Luca, Andrea, ecc.)
  cambiaUtente(nome: string): void {
    this.bettingService.cambiaUtente(nome);
    this.mostraMessaggio(`Ora stai impersonando l'utente: ${nome}`);
  }

  onNomeInput(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.nuovoNomeInput.set(val);
  }

  creaNuovoProfilo(): void {
    const nome = this.nuovoNomeInput().trim();
    if (!nome) return;
    this.bettingService.cambiaUtente(nome);
    this.nuovoNomeInput.set('');
    this.mostraMessaggio(`Benvenuto! Profilo creato per ${nome}`);
  }

  resetCompleto(): void {
    if (confirm('Vuoi davvero reimpostare tutti i dati demo al valore originale?')) {
      this.bettingService.resetDati();
    }
  }

  private mostraMessaggio(testo: string): void {
    this.messaggioFeedback.set(testo);
    setTimeout(() => {
      this.messaggioFeedback.set(null);
    }, 4000);
  }
}
