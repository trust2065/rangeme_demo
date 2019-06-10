function* fizzBuzz(max, config) {
  for (let i = 1; i <= max; i++) {
    let output = "";
    for (const [num, str] of config) {
      if (i % num === 0) {
        output += str;
        break;
      }
    }
    yield output || String(i);
  }
}

const iter = fizzBuzz(20, [[3, "fizz"], [5, "buzz"]]);
for (const output of iter) {
  console.log(output);
}

// console.log("" || "is empty string");
// console.log(null || "is null string");
// console.log(undefined || "is undefined string");
// console.log(false || "is false string");
// console.log(0 || "is 0 string");
// console.log({} || "is {} string");
// console.log([] || "is [] string");
// console.log(iter.next().value);
// console.log(iter.next().value);
// console.log(iter.next().value);
// console.log(iter.next().value);
// console.log(iter.next().value);
