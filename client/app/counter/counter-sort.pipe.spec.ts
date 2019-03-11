import { CounterSortPipe } from './counter-sort.pipe';

describe('SortPipe', () => {

    it('create an instance', () => {
        const pipe = new CounterSortPipe();
        expect(pipe).toBeTruthy();
    });
});
