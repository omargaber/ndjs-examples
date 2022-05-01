import express from 'express';
import * as utils from '../../utils/utils';
import { promises as fsPromises, readFile } from 'fs';

const loans = express.Router();

// Get Loans
loans.get('/', (req, res) => {
  if (req.query == {}) {
    res.send('Loans ready.');
  } else {
  }
});

loans.post('/', utils.logger, (req, res) => {
  const data = req.body;
  const writeData = async () => {
    try {
      const clientName = `${data.first_name}${data.last_name}`;
      const dirPath = `./assets/accounts/${data.first_name}${data.last_name}.json`;
      const loanPath = `./assets/loans/${data.first_name}${data.last_name}.json`;
      const clientExist = utils.loansFileChecker(clientName);

      if (clientExist) {
        const loanFileInfo = await fsPromises.open(`${loanPath}`, 'a+');
        const accountInfo = await readFile(
          dirPath,
          'utf-8',
          async (err, data) => {
            const accountInfo = JSON.parse(data);
            accountInfo['loan_amount'] = accountInfo.balance * 10000;
            accountInfo['status'] = 'Approved';
            delete accountInfo['balance'];
          }
        );
        await loanFileInfo.write(JSON.stringify(accountInfo));

        res.send('Loan Created Successfully');
      } else {
        res.send("Client doesn't exist");
      }
    } catch (err) {
      console.log(err);
    }
  };
  writeData();
});

export default loans;
