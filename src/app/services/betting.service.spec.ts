import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { BettingService } from './betting.service';

describe('BettingService', () => {
  let service: BettingService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
    });
    service = TestBed.inject(BettingService);
  });

  it('should be created and have initial demo data', () => {
    expect(service).toBeTruthy();
    expect(service.tornei().length).toBeGreaterThan(0);
    expect(service.partite().length).toBeGreaterThan(0);
    expect(service.utente().crediti).toBe(1000);
  });

  it('should place a valid bet and decrement user balance', () => {
    const creditiIniziali = service.utente().crediti;
    const res = service.piazzaPronostico(1, '1', 100);

    expect(res.ok).toBe(true);
    expect(service.utente().crediti).toBe(creditiIniziali - 100);
    expect(service.pronostici()[0].importo).toBe(100);
    expect(service.pronostici()[0].scelta).toBe('1');
    expect(service.pronostici()[0].stato).toBe('in_attesa');
  });

  it('should reject a bet if user has insufficient credits', () => {
    const res = service.piazzaPronostico(1, '1', 99999);
    expect(res.ok).toBe(false);
    expect(res.messaggio).toContain('insufficienti');
  });

  it('should correctly settle bet and award credits when match concludes with winning outcome', () => {
    // Bet 100 on team 1 of match 1 (quota 1.80)
    service.piazzaPronostico(1, '1', 100);
    const balanceBeforeWin = service.utente().crediti;

    // Conclude match 1 with outcome '1'
    service.concludiPartita(1, '1', '2 - 0');

    const bet = service.pronostici().find((p) => p.partitaId === 1);
    expect(bet?.stato).toBe('vinto');
    expect(bet?.vincitaOttenuta).toBe(180);
    expect(service.utente().crediti).toBe(balanceBeforeWin + 180);
  });

  it('should correctly settle bet when outcome is lost', () => {
    service.piazzaPronostico(2, '1', 100);
    const balanceBeforeConclude = service.utente().crediti;

    // Conclude match 2 with outcome '2'
    service.concludiPartita(2, '2', '0 - 2');

    const bet = service.pronostici().find((p) => p.partitaId === 2);
    expect(bet?.stato).toBe('perso');
    expect(bet?.vincitaOttenuta).toBe(0);
    expect(service.utente().crediti).toBe(balanceBeforeConclude);
  });

  it('should simulate random results for all open matches', () => {
    const simulatedCount = service.simulaPartiteCasuali();
    expect(simulatedCount).toBeGreaterThan(0);

    const openMatches = service.partite().filter((p) => p.stato === 'programmata');
    expect(openMatches.length).toBe(0);
  });
});
