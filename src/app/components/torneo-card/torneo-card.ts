import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Torneo } from '../../models/torneo.model';

@Component({
  selector: 'app-torneo-card',
  imports: [RouterLink],
  templateUrl: './torneo-card.html',
  styleUrl: './torneo-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TorneoCard {
  readonly torneo = input.required<Torneo>();
}
