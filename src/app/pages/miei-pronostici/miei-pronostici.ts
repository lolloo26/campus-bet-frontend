import { Component, ChangeDetectionStrategy, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BettingService } from '../../services/betting.service';

@Component({
  selector: 'app-miei-pronostici',
  imports: [RouterLink],
  templateUrl: './miei-pronostici.html',
  styleUrl: './miei-pronostici.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MieiPronostici {
  private readonly bettingService = inject(BettingService);

  protected readonly utente = this.bettingService.utente;
  protected readonly tuttiPronostici = this.bettingService.pronostici;

  // Filtro stato ('tutti', 'in_attesa', 'vinto', 'perso')
  protected readonly filtroStato = signal('tutti');

  // Pronostici dell'utente corrente filtrati
  protected readonly pronosticiUtente = computed(() => {
    const username = this.utente().username;
    const lista = this.tuttiPronostici().filter((p) => p.utenteUsername === username);
    const filtro = this.filtroStato();

    if (filtro === 'tutti') {
      return lista;
    }
    return lista.filter((p) => p.stato === filtro);
  });

  // Statistiche riepilogative
  protected readonly totaleGiocato = computed(() => {
    const username = this.utente().username;
    return this.tuttiPronostici()
      .filter((p) => p.utenteUsername === username)
      .reduce((acc, p) => acc + p.importo, 0);
  });

  protected readonly totaleIncassato = computed(() => {
    const username = this.utente().username;
    return this.tuttiPronostici()
      .filter((p) => p.utenteUsername === username && p.stato === 'vinto')
      .reduce((acc, p) => acc + p.vincitaOttenuta, 0);
  });

  protected readonly bilancioNetto = computed(() => {
    return Math.round((this.totaleIncassato() - this.totaleGiocato()) * 100) / 100;
  });

  impostaFiltro(stato: string): void {
    this.filtroStato.set(stato);
  }
}
