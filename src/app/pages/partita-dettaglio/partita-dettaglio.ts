import { Component, ChangeDetectionStrategy, inject, signal, computed } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BettingService } from '../../services/betting.service';

@Component({
  selector: 'app-partita-dettaglio',
  imports: [RouterLink],
  templateUrl: './partita-dettaglio.html',
  styleUrl: './partita-dettaglio.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PartitaDettaglio {
  private readonly route = inject(ActivatedRoute);
  private readonly bettingService = inject(BettingService);

  protected readonly utente = this.bettingService.utente;

  protected readonly partitaId = signal<number>(
    Number(this.route.snapshot.paramMap.get('id')) || 1
  );

  protected readonly partita = computed(() =>
    this.bettingService.getPartitaById(this.partitaId())
  );

  // Stato del form pronostico
  protected readonly esitoSelezionato = signal<'1' | 'X' | '2'>('1');
  protected readonly importo = signal<number>(100);
  protected readonly messaggio = signal<{ tipo: 'successo' | 'errore'; testo: string } | null>(null);

  // Quota corrispondente alla scelta
  protected readonly quotaSelezionata = computed(() => {
    const p = this.partita();
    if (!p) return 1;
    switch (this.esitoSelezionato()) {
      case '1':
        return p.quota1;
      case 'X':
        return p.quotaX;
      case '2':
        return p.quota2;
    }
  });

  // Calcolo dinamico vincita
  protected readonly potenzialeVincita = computed(() => {
    const imp = this.importo();
    const quota = this.quotaSelezionata();
    if (imp <= 0) return 0;
    return Math.round(imp * quota * 100) / 100;
  });

  // Gestione click su esito 1, X, 2
  selezionaEsito(esito: '1' | 'X' | '2'): void {
    this.esitoSelezionato.set(esito);
    this.messaggio.set(null);
  }

  // Gestione input importo
  onImportoChange(event: Event): void {
    const valore = Number((event.target as HTMLInputElement).value);
    this.importo.set(valore > 0 ? valore : 0);
    this.messaggio.set(null);
  }

  // Scorciatoie importo (+50, +100, ecc.)
  aggiungiImporto(delta: number): void {
    const nuovo = this.importo() + delta;
    this.importo.set(nuovo > 0 ? nuovo : 0);
  }

  impostaTuttoIlSaldo(): void {
    this.importo.set(this.utente().crediti);
  }

  // Invio pronostico
  confermaPronostico(): void {
    const res = this.bettingService.piazzaPronostico(
      this.partitaId(),
      this.esitoSelezionato(),
      this.importo()
    );

    if (res.ok) {
      this.messaggio.set({
        tipo: 'successo',
        testo: `Pronostico registrato! Potenziale vincita: ${this.potenzialeVincita()} crediti.`,
      });
    } else {
      this.messaggio.set({
        tipo: 'errore',
        testo: res.messaggio,
      });
    }
  }
}
