const usingThen = () => {
    console.log("START");
    new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("TIMEOUT INITIATED.")
        }, 4000)
    }).then(() => console.log("THEN CALLED")).then(() => console.log("LAST THEN CALLED"));
    console.log("END.")
}


usingThen();