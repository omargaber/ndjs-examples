import express from 'express';
import * as utils from '../../utils/utils';
import { promises as fsPromises, readFile } from 'fs';

const accounts = express.Router();

// Get accounts
accounts.get('/', utils.logger,  async (req: express.Request, res: express.Response): Promise<void> => {
  const readData = async () => {
    const validatedData = utils.paramValidator(req);
    console.log(`========>> ${validatedData}`);

    if (validatedData[0]) {
      if (validatedData[1] != 'INDEX') {
        const dirPath = `./assets/accounts/${validatedData[1]}.json`;
        await readFile(dirPath, 'utf-8', async (err, data) => {
          res.send(JSON.parse(data));
        });
      }
      else {
        console.log("ENTERED HERE")
        res.send('Accounts Ready.');

        return;
      }
    } else {
      res.send(validatedData[1]);
    }
  };
  await readData()
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
      return;
    } catch (err) {
      console.log(err);
    }
  };
  writeData();
});

accounts.use('/accounts', accounts);

export default accounts;
