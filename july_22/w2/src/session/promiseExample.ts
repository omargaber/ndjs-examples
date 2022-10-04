
const fun = async () => {
    await setTimeout(() => {
        console.log("VALUE");
        return "HELLO"
    }, 9000);
}

const foo = async () => {
    console.log("Start");
    let response = await fun()
    console.log("FINISH")
    console.log(`This is ${response}`)
    setTimeout(() => {
        console.log("TEMP")
        console.log(`This is ${response}`);
    }, 10000);

}

foo();