let coures = [
    {
        id: 1,
        namne: 'PHP',
        coin: 500
    },
    {
        id: 2,
        namne: 'Reactjs',
        coin: 200
    },
    {
        id: 3,
        namne: 'NodeJs',
        coin: 100
    },
    {
        id: 4,
        namne: 'JS',
        coin: 300
    },
    {
        id: 5,
        namne: 'Java',
        coin: 250
    }
]

let totalCoin = 0 
for (const i of coures) {
       totalCoin += i.coin;
    }
console.log(totalCoin)

console.log(run({ name: 'Nguyen Van A', age: 16 }));
// Output:
// [
//     "Thuộc tính name có giá trị Nguyen Van A",
//     "Thuộc tính age có giá trị 16"
// ]
function run(obj) {
    for (const key in obj) {
        console.log("Thuoc tinh", key, "co gia tri", obj[key]);
    }
};
const run = (obj) =>{
    let temp= []
    for (const keys of Object.keys(obj)) {
        temp.push("Thuộc tính " + keys +" có giá trị "+obj[keys])
    }
    return temp
}
console.log(run({ name: 'Nguyen Van A', age: 16 }));

// var orders = [
//     {
//         name: 'Khóa học HTML - CSS Pro',
//         price: 3000000
//     },
//     {
//         name: 'Khóa học Javascript Pro',
//         price: 2500000
//     },
//     {
//         name: 'Khóa học React Pro',
//         price: 3200000
//     }
// ]
// output : [ten các khóa học]

for (const i in orders) {
    console.log(orders[i].name)
}
let arr=[]
for (const i in orders) {
    
    arr.unshift(orders[i].name)
}
console.log(arr)

const fruits = ["Banana", "Orange", "Lemon", "Apple", "Mango"];
// citrus contains ['Lemon']

const fruits = ["Banana", "Orange", "Lemon", "Apple", "Mango"];
console.log(fruits[2]);
console.log(fruits[fruits.indexOf("Lemon")]);
console.log([fruits.slice(-3,-2)])

const inventory = [
    { name: "apples", quantity: 2 },
    { name: "bananas", quantity: 0 },
    { name: "cherries", quantity: 5 },
  ];

  console.log(inventory.find(isCherries));
// { name: 'cherries', quantity: 5 }Viết func
const inventory = [
    { name: "apples", quantity: 2 },
    { name: "bananas", quantity: 0 },
    { name: "cherries", quantity: 5 },
  ];
  const find = "cherries"
  const found = (inven,findd) => {
      return inventory.find( e => e.name == find );
  };
  console.log(found(inventory,find));