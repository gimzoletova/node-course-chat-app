const expect = require('expect');

const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate valid message object', () => {
        let from = 'test-user', text = 'test=text';
        let result = generateMessage(from, text);
        // expect(result.from).toBe('test-user');
        // expect(result.text).toBe('test=text'); //instead of these 2 lines we can use:
        expect(result).toInclude({from, text});
        expect(result.createdAt).toBeA('number');
    })
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        let from = 'test-user', lat = 0, lng = 0, url = 'https://www.google.com/maps?q=0,0';
        let result = generateLocationMessage(from, lat, lng);
        expect(result.createdAt).toBeA('number');
        expect(result).toInclude({from, url});
    });
});