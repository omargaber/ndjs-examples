import express from 'express';
import * as utils from '../../utils/utils';
import { promises as fsPromises, readFile } from 'fs';

const accounts = express.Router();

// Get accounts
accounts.get('/', utils.logger, (req: express.Request, res: express.Response) => {
  const readData = async () => {
    const validatedData = utils.paramValidator(req);

    if (validatedData[0]) {
      if (validatedData[1] != 'INDEX') {
        const dirPath = `./assets/accounts/${validatedData[1]}.json`;
        await readFile(dirPath, 'utf-8', async (err, data) => {
          res.send(JSON.parse(data));
        });
      } else {
        console.log('INDEX');
        res.send('Accounts Ready.');
      }
    } else {
      res.send(validatedData[1]);
    }
  };
  readData();
});

accounts.post('/', utils.logger, (req, res) => {
  const data = req.body;
  const writeData = async () => {
    try {
      const dirPath = utils.dirExistChecker('accounts');

      const accountInfoFile = await fsPromises.open(
        `${dirPath}/${data.first_name}${data.last_name}.json`,
        'a+'
      );
      await accountInfoFile.write(JSON.stringify(data));
      res.send('Created Successfully');
    } catch (err) {
      console.log(err);
    }
  };
  writeData();
});

accounts.use('/accounts', accounts);

export default accounts;
