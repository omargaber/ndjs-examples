import {User, UserStore} from '../models/user';

const store = new UserStore();

describe("Testing Database Models functionality", ()=> {
    
    it('Should have an index method', ()=> {
        expect(store.index).toBeDefined();
    })

    it("Expect retrieval of list of users", async()=>{
        const res = await store.index();
        expect(res).toEqual([]);
    })

})