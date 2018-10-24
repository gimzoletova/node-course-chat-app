const expect = require('expect');

const {isRealString} = require('./validation');

describe('isRealString', () => {
    it('should reject non-string values', () => {
        let result = isRealString(true);
        expect(result).toBe(false);
    });

    it('should reject string with only spaces', () => {
        let result = isRealString('     ');
        expect(result).toBe(false);
    });

    it('should accept valid strings', () => {
        let result = isRealString('   tr  ue  ');
        expect(result).toBe(true);
    });
})
