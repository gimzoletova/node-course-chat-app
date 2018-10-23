const expect = require('expect');

const {generateMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate valid message object', () => {
        let from = 'test-user', text = 'test=text';
        let result = generateMessage(from, text);
        // expect(result.from).toBe('test-user');
        // expect(result.text).toBe('test=text'); //instead of these 2 lines we can use:
        expect(result).toInclude({from: from, text});
        expect(result.createdAt).toBeA('number');
    })
})