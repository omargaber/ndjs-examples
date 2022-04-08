// Interface
interface Address {
    city: string;
    street: number;
    building: string;
    apartment: number
}

// Bank Account class
class Account {
    name: string;
    age: number;
    balance: number;
    address: Address;

    // Class Constructor
    constructor(name: string, age: number, balance: number, address: Address) {
        this.name = name;
        this.age = age;
        this.balance = balance;
        this.address = address;
    }

    accountInfo(): void {
        console.log('Client Name: %s', this.name);
        console.log('Available Balance: %d', this.balance)
    }

    // We will create two account functionalities:
    // Depositing using chaining
    // Withdrawal using asyn/await


    // Depositing into account with chaining
    deposit(amount: number): Promise<number> {
        return new Promise((resolve, reject)=> {
            setTimeout(()=> {
                try {
                    console.log("Contacting bank server")
                    resolve(amount);
                } catch (error) {
                    reject();
                }
            }, 1000);
        });
    };

    addAmount(amount: number): Promise<string> {
        return new Promise((resolve, reject)=> {
            setTimeout(()=> {
                try {
                    this.balance += amount;
                    console.log("Amount deposit successful.");
                    resolve(`New balance is ${this.balance}` )
                } catch (error) {
                    reject()
                }
            },1000);
        });
    };


    // Withdrawing from account using async/await
    withdraw(amount: number): void {
            const operation = async () => {
            try{
                const current = await this.getCurrentBalance(amount);
                const compare = await this.balanceCompare(amount, current);
                if (compare ==true) {
                    this.balance-=amount;
                    console.log(`New balance is ${this.balance}`);
                }
                else{
                    console.log("Insufficient Funds.")
                }
            }
            catch (error){
                console.log("There was an error.")
            }
        }
        operation();
    }


    balanceCompare(amount: number, current: number): Promise<boolean> {
        return new Promise((resolve, reject)=> {
            try {
                setTimeout(() => {
                    if (current >= amount){
                        resolve(true);
                    }
                    else {
                        resolve(false);
                    }
                }, 1000);
            } catch(error) {
                reject();
            }
        });
    }
    
    
    getCurrentBalance(amount: number): Promise<number> {
        return new Promise((resolve, reject)=> {
            try {
                setTimeout(() => {
                    console.log("Checking current balance");
                    resolve(this.balance)
                }, 1000);
            } catch(error) {
                reject();
            }
        });
    };


}


const homeAddress: Address = {
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