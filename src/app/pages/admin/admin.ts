import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { BettingService } from '../../services/betting.service';

@Component({
  selector: 'app-admin',
  imports: [],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Admin {
  private readonly bettingService = inject(BettingService);

  protected readonly partite = this.bettingService.partite;
  protected readonly strapiUrl = this.bettingService.strapiUrl;
  protected readonly strapiConnesso = this.bettingService.strapiConnesso;

  protected readonly logMessaggio = signal<string | null>(null);

  // Simula casualmente il vincitore per tutte le partite in programma
  simulaTutti(): void {
    const num = this.bettingService.simulaPartiteCasuali();
    if (num > 0) {
      this.mostraLog(`Simulazione completata con successo per ${num} incontri! Le scommesse sono state refertate.`);
    } else {
      this.mostraLog('Nessuna partita da refertare: tutti gli incontri sono già conclusi.');
    }
  }

  // Risoluzione manuale di una singola partita
  concludiManuale(partitaId: number, risultato: '1' | 'X' | '2'): void {
    const p = this.bettingService.getPartitaById(partitaId);
    if (!p) return;
    this.bettingService.concludiPartita(partitaId, risultato);
    this.mostraLog(`Incontro "${p.squadraA} vs ${p.squadraB}" concluso con esito ${risultato}.`);
  }

  // Test riconnessione a Strapi
  async ricaricaDaStrapi(): Promise<void> {
    await this.bettingService.tentaConnessioneStrapi();
    if (this.strapiConnesso()) {
      this.mostraLog('Connessione a Strapi attiva su http://localhost:1337!');
    } else {
      this.mostraLog('Strapi non risponde (normale se non è ancora stato avviato). Modalità Demo attiva.');
    }
  }

  private mostraLog(msg: string): void {
    this.logMessaggio.set(msg);
  }
}
