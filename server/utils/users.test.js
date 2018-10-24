const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {

    let users;
    beforeEach(() => {
        users = new Users();
        users.users = [{
            id : 'a',
            name : 'a',
            room: 'a'
        },
        {
            id : 'b',
            name : 'b',
            room: 'b'
        },
        {
            id : 'aa',
            name : 'aa',
            room: 'a'
        }]
    })

    it('should add a user', () => {
        let users = new Users();
        let user = {id: '123', name: 'a', room: 'a'};
        let res = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
        // expect(users.users[users.users.length-1]).toEqual(user);
    });

    it('should remove a user', () => {
        let removedUser = users.removeUser('a');
        expect(removedUser.id).toBe('a');
        expect(users.users).toEqual([{id : 'b', name : 'b', room: 'b'}, {id : 'aa', name : 'aa', room: 'a'}]);
    });
    it('should not remove a user', () => {
        let removedUser = users.removeUser('77');
        // expect(removedUser).toBe(undefined);
        expect(removedUser).toNotExist();
        expect(users.users).toEqual([{id : 'a', name : 'a', room: 'a'}, {id : 'b', name : 'b', room: 'b'}, {id : 'aa', name : 'aa', room: 'a'}]);
    });

    it('should find user', () => {
        let user = users.getUser('a');
        expect(user.id).toBe('a');
    });
    it('should find user', () => {
        let user = users.getUser('55');
        // expect(user).toBe(undefined);
        expect(user).toNotExist();
    });

    it('should return names for a room', () => {
        let userList = users.getUserList('a');
        expect(userList).toEqual(['a', 'aa'])
    });
    it('should return names for b room', () => {
        let userList = users.getUserList('b');
        expect(userList).toEqual(['b']);
    });
});