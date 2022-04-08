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
// Bank Account class
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
    // We will create two account functionalities:
    // Depositing using chaining
    // Withdrawal using asyn/await
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
                const current = yield this.getCurrentBalance(amount);
                const compare = yield this.balanceCompare(amount, current);
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
    balanceCompare(amount, current) {
        return new Promise((resolve, reject) => {
            try {
                setTimeout(() => {
                    if (current >= amount) {
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
    getCurrentBalance(amount) {
        return new Promise((resolve, reject) => {
            try {
                setTimeout(() => {
                    console.log("Checking current balance");
                    resolve(this.balance);
                }, 1000);
            }
            catch (error) {
                reject();
            }
        });
    }
    ;
}
const homeAddress = {
    city: "Liverpool",
    street: 1,
    building: '1',
    apartment: 2
};
const x = new Account("Mo Salah", 29, 100, homeAddress);
x.accountInfo();
// x.deposit(150).then((result: number)=> {
//     return x.addAmount(result)
// }).then((result: string)=>{
//     console.log(result)
// }).catch(()=>{
//     console.log("An error occurred.")
// })
x.withdraw(50);
