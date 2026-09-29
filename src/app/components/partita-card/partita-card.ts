import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Partita } from '../../models/partita.model';

@Component({
  selector: 'app-partita-card',
  imports: [RouterLink],
  templateUrl: './partita-card.html',
  styleUrl: './partita-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PartitaCard {
  readonly partita = input.required<Partita>();
}
