import {User, UserStore} from '../models/user';
import supertest from 'supertest';
import app from '../server';

const store = new UserStore();

const request = supertest(app);

describe("Test Endpoint responses", ()=> {
    // done is specific to supertest
    // done is passed so supertest would know that the test is done so it disconnects from the server.
    it('Successful endpoint call', async () => {
        const response = await request.get('/show/1').set({"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmaXJzdF9uYW1lIjoib21hciIsImxhc3RfbmFtZSI6ImdhYmVyIiwiYmFsYW5jZSI6MTAwLCJlbWFpbCI6Im9nQGdlLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJFdTQXY1a1Y2Zi9yQ1Z5Wkoudk1LRGVrMm9reFlxTDFMYkhwZHA3bGJWVmN4RGU2by5tSnMyIn0sImlhdCI6MTY2MDE1MDAwNn0.st8J2KQimR_q0zrtLP0sXHO1ghB1BEWCk8YVCzuk_9U"});
        console.log(response.body);
        expect(response.status).toBe(200);
        // done();
        
    })
})

// describe("Testing Database Models functionality", ()=> {
    
//     it('Should have an index method', ()=> {
//         expect(store.index).toBeDefined();
//     })

//     it("Expect retrieval of list of users", async()=>{
//         const res = await store.index();
//         expect(res).toEqual([]);
//     })

// })