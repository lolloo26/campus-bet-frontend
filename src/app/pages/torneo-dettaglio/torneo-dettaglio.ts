import { Component, ChangeDetectionStrategy, inject, signal, computed } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BettingService } from '../../services/betting.service';
import { PartitaCard } from '../../components/partita-card/partita-card';

@Component({
  selector: 'app-torneo-dettaglio',
  imports: [RouterLink, PartitaCard],
  templateUrl: './torneo-dettaglio.html',
  styleUrl: './torneo-dettaglio.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TorneoDettaglio {
  private readonly route = inject(ActivatedRoute);
  private readonly bettingService = inject(BettingService);

  protected readonly torneoId = signal<number>(
    Number(this.route.snapshot.paramMap.get('id')) || 1
  );

  protected readonly torneo = computed(() =>
    this.bettingService.getTorneoById(this.torneoId())
  );

  // Incontri di questo torneo
  protected readonly partiteDelTorneo = computed(() =>
    this.bettingService.partite().filter((p) => p.torneoId === this.torneoId())
  );

  // Partite ancora aperte per scommettere
  protected readonly pronosticiDisponibili = computed(() =>
    this.partiteDelTorneo().filter((p) => p.stato === 'programmata')
  );

  // Partite già concluse
  protected readonly partiteConcluse = computed(() =>
    this.partiteDelTorneo().filter((p) => p.stato === 'conclusa')
  );
}
