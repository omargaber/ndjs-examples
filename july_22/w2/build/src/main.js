"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
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
class Account {
    // Class Constructor
    constructor(name, age, balance, address) {
        this.name = name;
        this.age = age;
        this.balance = balance;
        this.address = address;
    }
    accountInfo() {
        console.log('Client Name: %s', this.name);
        console.log('Available Balance: %d', this.balance);
    }
    // Depositing into account with chaining
    deposit(amount) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    console.log("Contacting bank server");
                    resolve(amount);
                }
                catch (error) {
                    reject();
                }
            }, 1000);
        });
    }
    ;
    addAmount(amount) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    this.balance += amount;
                    console.log("Amount deposit successful.");
                    resolve(`New balance is ${this.balance}`);
                }
                catch (error) {
                    reject();
                }
            }, 1000);
        });
    }
    ;
    // Withdrawing from account using async/await
    withdraw(amount) {
        const operation = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const compare = yield this.balanceCompare(amount);
                if (compare == true) {
                    this.balance -= amount;
                    console.log(`New balance is ${this.balance}`);
                }
                else {
                    console.log("Insufficient Funds.");
                }
            }
            catch (error) {
                console.log("There was an error.");
            }
        });
        operation();
    }
    balanceCompare(amount) {
        return new Promise((resolve, reject) => {
            try {
                setTimeout(() => {
                    if (this.balance >= amount) {
                        resolve(true);
                    }
                    else {
                        resolve(false);
                    }
                }, 1000);
            }
            catch (error) {
                reject();
            }
        });
    }
}
exports.Account = Account;
const homeAddress = {
    city: "Liverpool",
    street: 1,
    building: '1',
    apartment: 2
};
const x = new Account("Mo Salah", 29, 100, homeAddress);
x.accountInfo();
// console.log("DEPOSIT OPERATION");
// x.deposit(50).then((result: number)=> {
//     return x.addAmount(result)
// }).then((result: string)=>{
//     console.log(result)
// }).catch(()=>{
//     console.log("An error occurred.")
// })
x.withdraw(50);
