import { Component, ChangeDetectionStrategy, inject, signal, computed } from '@angular/core';
import { BettingService } from '../../services/betting.service';

@Component({
  selector: 'app-classifica',
  imports: [],
  templateUrl: './classifica.html',
  styleUrl: './classifica.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Classifica {
  private readonly bettingService = inject(BettingService);

  protected readonly utente = this.bettingService.utente;
  protected readonly classifica = this.bettingService.classifica;

  // Criterio di ordinamento ('crediti' | 'winrate')
  protected readonly ordinamento = signal<'crediti' | 'winrate'>('crediti');

  // Classifica ordinata dinamicamente
  protected readonly classificaOrdinata = computed(() => {
    const lista = [...this.classifica()];
    const crit = this.ordinamento();

    if (crit === 'crediti') {
      return lista.sort((a, b) => b.crediti - a.crediti);
    } else {
      return lista.sort((a, b) => {
        const rateA = a.pronosticiEffettuati > 0 ? a.pronosticiVinti / a.pronosticiEffettuati : 0;
        const rateB = b.pronosticiEffettuati > 0 ? b.pronosticiVinti / b.pronosticiEffettuati : 0;
        return rateB - rateA;
      });
    }
  });

  impostaOrdinamento(criterio: 'crediti' | 'winrate'): void {
    this.ordinamento.set(criterio);
  }
}
