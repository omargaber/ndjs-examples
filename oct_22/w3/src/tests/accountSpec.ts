import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('Account test suite', () => {
  const path = '/api/accounts';
  beforeEach(()=> {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });
  
  it('Performs GET /', async (): Promise<void> => {
    const response: supertest.Response = await request.get(path);
    expect(response.status).toBe(200);
  });

  it('Last name missing', async (): Promise<void> => {
    const response: supertest.Response = await request.get(
      `${path}?first_name=Mo`
    );
    expect(response.text).toBe('Last Name Missing.');
  });
});
