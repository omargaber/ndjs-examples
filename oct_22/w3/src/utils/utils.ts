import { strictEqual } from 'assert';
import express from 'express';
import { existsSync, mkdirSync } from 'fs';

const logger = (
  req: express.Request,
  res: express.Response,
  next: Function
): void => {
  console.log('LOGGER MIDDLEWARE CALLED!');
  
  // To modify the response, following the docs here is the method
  // Reference: http://expressjs.com/en/api.html
  
  // res.write("TEST");
  // Why is next important??
  next();
};

const dirExistChecker = (resourceName: string): string => {
  const dirPath = `./assets/${resourceName}`;

  if (!existsSync(dirPath)) {
    mkdirSync(dirPath);
    console.log('Directory Created.');
  } else {
    console.log('Directory Exists');
  }
  return dirPath;
};

const loansFileChecker = (clientName: string): boolean => {
  const dirPath = `./assets/accounts/${clientName}.json`;

  if (!existsSync(dirPath)) {
    console.log("Client doesn't exist.");
    return false;
  } else {
    return true;
  }
};

const paramValidator = (request: express.Request): [boolean, string] => {
  try {
    if (!request.query.first_name && !request.query.last_name) {
      return [true, 'INDEX'];
    } else if (!request.query.first_name) {
      return [false, 'First Name missing.'];
    } else if (!request.query.last_name) {
      return [false, 'Last Name Missing.'];
    } else {
      return [true, `${request.query.first_name}${request.query.last_name}`];
    }
  } catch (err) {
    return [false, 'Error Occurred'];
  }
};

export { logger, dirExistChecker, loansFileChecker, paramValidator };
