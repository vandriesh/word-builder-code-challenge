import { Dictionary } from './dictionary';

describe('Dictionary', () => {
    let dictionary;

    beforeEach(() => {
        dictionary = new Dictionary();
        dictionary.add('qwe');
    });

    afterEach(() => {
        dictionary.reset();
    });

    it('should add word to dictionary', () => {
        expect(dictionary.getWords()).toEqual(['qwe']);

        dictionary.addWords(['qwe1', 'qwe']);
        expect(dictionary.getWords()).toEqual(['qwe', 'qwe1']);

        dictionary.reset();
        expect(dictionary.getWords()).toEqual([]);
    });

    it('should tell if words exists', function() {
        expect(dictionary.contains('zzz')).toBeFalsy();
        expect(dictionary.contains('qw')).toBeFalsy();
        expect(dictionary.contains('qwee')).toBeFalsy();
        expect(dictionary.contains('qwe')).toBeTruthy();
    });
});
