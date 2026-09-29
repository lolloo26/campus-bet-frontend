import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BettingService } from '../../services/betting.service';
import { PartitaCard } from '../../components/partita-card/partita-card';
import { TorneoCard } from '../../components/torneo-card/torneo-card';

@Component({
  selector: 'app-home',
  imports: [RouterLink, PartitaCard, TorneoCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  private readonly bettingService = inject(BettingService);

  protected readonly utente = this.bettingService.utente;
  protected readonly tornei = this.bettingService.tornei;
  protected readonly partite = this.bettingService.partite;
  protected readonly classifica = this.bettingService.classifica;
  protected readonly strapiConnesso = this.bettingService.strapiConnesso;

  // Prossime partite (aperte per scommettere)
  protected readonly prossimiIncontri = computed(() =>
    this.partite().filter((p) => p.stato === 'programmata')
  );

  // Tornei in evidenza (in corso o programmati)
  protected readonly torneiInEvidenza = computed(() =>
    this.tornei().slice(0, 3)
  );

  // Top 3 classifica generale
  protected readonly topClassifica = computed(() =>
    this.classifica().slice(0, 3)
  );
}
