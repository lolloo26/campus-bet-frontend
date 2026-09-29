import { Component, ChangeDetectionStrategy, inject, signal, computed } from '@angular/core';
import { BettingService } from '../../services/betting.service';
import { TorneoCard } from '../../components/torneo-card/torneo-card';

@Component({
  selector: 'app-tornei',
  imports: [TorneoCard],
  templateUrl: './tornei.html',
  styleUrl: './tornei.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Tornei {
  private readonly bettingService = inject(BettingService);

  protected readonly tornei = this.bettingService.tornei;

  // Filtri attivi
  protected readonly giocoFiltro = signal('tutti');
  protected readonly statoFiltro = signal('tutti');

  // Giochi disponibili per il filtro
  protected readonly giochiDisponibili = [
    'tutti',
    'Rocket League',
    'Valorant',
    'League of Legends',
    'FIFA / FC 25',
  ];

  // Stati disponibili per il filtro
  protected readonly statiDisponibili = [
    { valore: 'tutti', etichetta: 'Tutti gli stati' },
    { valore: 'in_corso', etichetta: 'In corso' },
    { valore: 'programmato', etichetta: 'Programmati' },
    { valore: 'concluso', etichetta: 'Conclusi' },
  ];

  // Lista tornei filtrata con computed
  protected readonly torneiFiltrati = computed(() => {
    const gioco = this.giocoFiltro();
    const stato = this.statoFiltro();

    return this.tornei().filter((t) => {
      const matchGioco = gioco === 'tutti' || t.gioco.toLowerCase().includes(gioco.toLowerCase());
      const matchStato = stato === 'tutti' || t.stato === stato;
      return matchGioco && matchStato;
    });
  });

  impostaGioco(gioco: string): void {
    this.giocoFiltro.set(gioco);
  }

  impostaStato(event: Event): void {
    const val = (event.target as HTMLSelectElement).value;
    this.statoFiltro.set(val);
  }
}
