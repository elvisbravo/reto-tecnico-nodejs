import chai from 'chai';
import chaiHttp from 'chai-http';

import Config from '../src/context/config';

chai.use(chaiHttp);
const expect = chai.expect;


describe('serviceGetAllTasks', () => {

  it('debería retornar los datos correctamente', async () => {
    const res = await chai
      .request(Config.API_TASKS)
      .get('/api/tasks');
    expect(res).to.have.status(200);
    expect(res.body.message).to.equal('Datos Cargados Correctamente');
    expect(res.body.data).to.be.an('array');
  });

});
