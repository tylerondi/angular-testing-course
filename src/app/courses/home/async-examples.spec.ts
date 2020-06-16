import { fakeAsync, tick, flush, flushMicrotasks } from '@angular/core/testing';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

describe('Async Testing Examples', () => {

  it('Asynchronous test example with Jasmine done()', (done: DoneFn) => {

    let test = false;

    setTimeout(() => {

      test = true;

      expect(test).toBeTruthy();

      done();

    }, 1000);

  });

  it('Asyncronous test example - setTimeout()', fakeAsync(() => {

    let test = false;

    setTimeout(() => {

      console.log('running assertions setTimeout()');

      test = true;

    }, 1000);

    flush();

    expect(test).toBeTruthy();

  }));

  it('Asynchronous test example - plain Promise', fakeAsync(() => {

    let test = false;

    console.log('Creating promise');

    Promise.resolve().then(() => {

      console.log('Promise first then() evaluated successfully');

      return Promise.resolve();

    }).then(() => {

      console.log('Promise second then() evaluated successfully');

      test = true;

    });

    flushMicrotasks();

    console.log('Running test assertions');

    expect(test).toBeTruthy();

  }));

  it('Asynchronous test example - Promises + setTimeout()', fakeAsync(() => {

    let counter = 0;

    Promise.resolve().then(() => {

      counter += 10;

      setTimeout(() => {

        counter += 1;

      }, 1000);

    });

    expect(counter).toBe(0);

    flushMicrotasks();

    expect(counter).toBe(10);

    flush();

    expect(counter).toBe(11);

  }));

  it('Asyncronous test example - Observables', fakeAsync(() => {

    let test = false;

    const test$ = of(test).pipe(delay(1000));

    test$.subscribe(() => {

      test = true;

    });

    tick(1000);

    expect(test).toBe(true);

  }));

});
