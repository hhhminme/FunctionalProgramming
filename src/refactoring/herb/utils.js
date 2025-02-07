const { performance } = require("perf_hooks");
const Map = (array, f) => {
  for (let i = 0; i < array.length; i++) {
    f(i, array[i]);
  }
};

const Filter = (array, f) => {
  const tmp = [];
  Map(array, (idx, value) => {
    if (f(idx, value)) {
      tmp.push(array[idx]);
    }
  });

  return tmp;
};

const Reduce = (array, f, initValue) => {
  const copyArray = array;
  let init = initValue ?? 0;
  Map(copyArray, (_, cur) => {
    init = f(init, cur);
  });

  return init;
};

const array = [...Array(10000).keys()];

const t0 = performance.now();
console.log("---------------Map----------------");
Map(array, (idx, value) => {
  console.log(`value : ${value}, index : ${idx}`);
});

console.log("---------------Filter----------------");
const filteredArray = Filter(array, (idx, value) => {
  if (value % 2 === 1) {
    return value;
  }
});
console.log(filteredArray);

console.log("---------------Reduce----------------");
const reduce = Reduce(
  [1, 2, 3, 4, 5],
  (acc, cur) => {
    return acc + cur;
  },
  10
);

console.log(reduce);
const t1 = performance.now();
console.log(`Iterator Call to doSomething took ${t1 - t0} milliseconds.`);
