const fs = require("fs");

function promisify(func) {
  return function (...args) {
    return new Promise( (resolve, reject) => {
      let callback = function(...args) {
        resolve(args)
      }
      // 给func函数主动塞入一个callback，这样在func中调用callback的时候实际执行的时候就是
      // 我们这里定义的callback函数，然后在我们的callback中调用resolve,
      // 这样一来，本来想要通过回调执行的操作就可以放在then函数中进行执行了
      func.apply(null, [...args, callback])
    })
  }
}


// exports.transBase64 = (fileUrl) => {
//   const imageData = promisify(fs.readFileSync(fileUrl));
//   const imageBase64 = imageData.toString("base64");
//   const imagePrefix = "data:image/png;base64,";
//   console.log(imagePrefix + imageBase64)

//   return imageBase64
// }

exports.transBase64 = (fileUrl) => {
  const file = fs.readFileSync(fileUrl)
  // console.log(file);
  // const imageData = promisify(fs.readFileSync(fileUrl));
    const imageBase64 = file.toString("base64");
    // const imagePrefix = "data:image/png;base64,";
    // console.log(imagePrefix + imageBase64)
  
    return imageBase64
}