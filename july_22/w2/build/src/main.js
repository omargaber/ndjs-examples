"use strict";
// Session task
// Create an interface for the user address
// Important note: Everything should be explicitly typed.
// Bank Account class
// Create a bank account class with the following properties and functionality
// - Attributes should be name, age, balance and address
// - Class constructor explicitly typed
// - Create a method "accountInfo" that is going to print out the client name and balance without returning anything
// - For the deposit action, do the following (USING PROMISES)
//      = Create a method "deposit" that takes in the amount, simulates contacting bank server (maybe a timeout of 1000ms) and resolves the amount
//      = Create a method  "addAmount" that takes in the amount, adds it to the balance and returns a message with the new amount
// - For the withdraw method, do the following (USING ASYNC/AWAIT)
//      = Create a method "balanceCompare" that takes in the amount and checks if there is enough balance, return True if it is. (simulate using timeout 1000ms)
//      = Create a method "withdraw" that takes the amount to be withdrawn in case the previous method returned True, update account balance and return message containing new balance
// - After creating the methods, you need to test your implementation. Instantiate an object and test both withdraw and deposit functions. Use log statements where necessary
