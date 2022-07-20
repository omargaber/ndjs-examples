const usingAwait = async ()=> {
    console.log("START");

    let response = await setTimeout(() => {
        console.log('first await');
    }, 4000);
    console.log("LOG AFTER TIMEOUT.")
    console.log("END");
}

usingAwait();