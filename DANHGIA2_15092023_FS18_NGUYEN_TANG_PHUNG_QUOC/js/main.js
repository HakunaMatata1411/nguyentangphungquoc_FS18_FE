function createId() {
  // trả về một chuỗi ngẫu nhiên gồm 12 ký tự: 0-9a-zA-Z;
  const characters = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
  ];
  let length = 12;
  let charactersLength = characters.length;
  let result = '';
  for (let i = 0; i < length; i++) {
    let idx = Math.floor(Math.random() * charactersLength);
    result += characters[idx];
  }
  return result;
}
const PRODUCTS = [
  {
    id: 'hBuZdx1elR5a',
    name: 'Fushigidane',
    thumb: 'Fushigidane.png',
    shortDesc:
      'Người ta thường thấy Fushigidane nằm ngủ dưới ánh nắng. Càng đắm mình trong nắng, hạt giống trên lưng chúng càng phát triển.',
    price: 12,
  },
  {
    id: 'fDQWzrgq6gXX',
    name: 'Hitokage',
    thumb: 'Hitokage.png',
    shortDesc: 'Tính cách ưa thích đồ nóng. Nghe nói khi trời mưa khói sẽ phụt ra từ đuôi của nó.',
    price: 15,
  },
  {
    id: 'aLjNSdeJi9Q2',
    name: 'Zenigame',
    thumb: 'Zenigame.png',
    shortDesc:
      'Chiếc mai của Zenigame không chỉ để tự vệ, mà còn làm giảm tối đa lực cản nước nhờ hình dáng tròn trịa cùng bề mặt nhiều rãnh, giúp chúng bơi nhanh hơn.',
    price: 25,
  },
  {
    id: 'rOYIHlZQlwdV',
    name: 'Pikachu',
    thumb: 'Pikachu.png',
    shortDesc: 'Những Pikachu có thể tạo ra dòng điện càng mạnh thì túi má càng mềm mại và lớn nhanh.',
    price: 32,
  },
  {
    id: 'zzC3HkWp9g4s',
    name: 'Purin',
    thumb: 'Purin.png',
    shortDesc:
      'Những bản thu âm tuyển tập bài hát ru kì lạ của Purin được bán tại các cửa hàng tạp hóa. Rất nhiều người coi chúng là vật gối đầu giường.',
    price: 9,
  },
];

let carts = [];
let count = 0;
let totalPriceOfCart = 0;
let totalProduct= 0;
let tempQuantity = createTempQuantity();

window.onload = () => {
  displayProduct();
  carts = saveProduct();
  clickBuy();
  addProductToCart();
  changeQuantity();
}

function displayProduct(){
  let xhtml = PRODUCTS.map(value => {
    return `
      <div class="row align-items-center">
        <div class="col-6 col-md-4">
          <img src="img/${value.thumb}" alt="" class="img-fluid">
        </div>
        <div class="col-6 col-md-8">
          <h6>${value.name}</h6>
          <h6>${value.shortDesc}</h6>
          <div class="form-group">
            <div class="d-flex">
              <button class="btn btn-primary"> - </button>
              <input type="text" class="form-control mx-1" value="1" min="1">
              <button class="btn btn-primary"> + </button>
            </div>
            <button class="btn btn-danger btn-block mt-1 btn-add-to-cart btn-buy">${value.price}</button>
          </div>
        </div>
      </div> 
    `
  });
  document.getElementById('listProducts').innerHTML = xhtml;
}

function addIntoCarts(id, name, price, quantity) {
  document.getElementById('cardProducts').innerHTML += `
    <tr class = "product-item">
      <td class="idBuy">${id}</td>
      <td class = "product-name">${name}</td>
      <td>$${price}</td>
      <td>
        <input type="number" class="form-control" value="${quantity}" min="0">
      </td>
      <td><span class="fw-bold cost">${price*quantity}</span></td>
      <td>
        <button type="button" class="btn btn-link btn-sm btn-rounded btn-update">Update</button>
        <button type="button" class="btn btn-link btn-sm btn-rounded btn-delete">Delete</button>
      </td>
    </tr>
    `;

  totalCart();
}

function totalCart() {
  document.getElementById('total-product').innerHTML = `
    <tr>
      <td colspan="4" >There are <span id="count" >${totalProduct}</span> items in your shopping cart.</td>
      <td colspan="2"><span class="fw-bold text-danger" id="toTal">${totalPriceOfCart}</span></td>
    </tr>
  `
}

function createTempQuantity() {
  let temp = [];
  for(let i = 0; i < PRODUCTS.length; i++)
    temp.push(0);
  return temp;
}

function changeQuantity(){
  arrFormProducts = document.getElementsByClassName('form-group');  
  for(let i = 0; i < arrFormProducts.length; i++){
    let btnChangeQuantity = arrFormProducts[i].querySelectorAll('.btn-primary');
    productChangeQuantity(btnChangeQuantity, i, arrFormProducts[i]);
    checkQuantityNumBuy(arrFormProducts[i].querySelector('input'), i);
  };
};

function checkQuantityNumBuy(input, index) {
  input.addEventListener('change', () =>{
    let temp = parseInt(input.value*1);
    if(isNaN(temp)){
      window.alert('Bạn cần nhập số');
      input.value = 1;
    }

  });
}

function productChangeQuantity(btn, index, value){
  btn.forEach(x => {
    let quantity;
    x.addEventListener('click', () =>{
      quantity = parseInt(value.querySelector('input').value);
      if(x.innerText === "-")
      {
        if(quantity > 1)
        value.querySelector('input').value = --quantity;
      }
      else
        value.querySelector('input').value = ++quantity;

    });
  });
}


function clickBuy() {
  let btnBuy = document.querySelectorAll('.btn-buy');
  for(let i = 0; i < btnBuy.length; i++)
  {
    btnBuy[i].addEventListener('click', () => {
      listProductInCart(i);
      return;
    });
  }
}

function addProductToCart(){
  if(carts != []){
    carts.forEach((value) => {
      totalProduct += value.quantity;
      let index = findProduct(value.name);
      tempQuantity[index] = value.quantity;
      count++;
      let totalPrice = value.price*value.quantity;
      totalPriceOfCart += totalPrice;
      addIntoCarts(value.id, value.name, value.price, value.quantity)
    })
    updateQuantity(document.querySelectorAll('.product-item'));
    deleteEvent(document.querySelectorAll('.product-item'));
  }
  totalCart();
}


function listProductInCart(index) {
  let quantity = parseInt(document.querySelectorAll('input[type="text"]')[index].value);
  let totalPrice = quantity*PRODUCTS[index].price;
  totalProduct += quantity;
  totalPriceOfCart += totalPrice;
  let temp = tempQuantity[index] + quantity;

  if(tempQuantity[index] === 0){
    addIntoCarts(++count, PRODUCTS[index].name, PRODUCTS[index].price, temp);
    saveProduct(temp, PRODUCTS[index].name, count,PRODUCTS[index].price);
    updateQuantity(document.querySelectorAll('.product-item'));
    deleteEvent(document.querySelectorAll('.product-item'));
  }
  else{
    let x = findProductInCarts(PRODUCTS[index].name);
    updateQuantityBuy(temp, index, x)
  }
  tempQuantity[index] = temp;
  if(carts != [])
    for(let i in carts){
      document.querySelectorAll('input[type="number"]')[i].value = carts[i].quantity;
    }
  document.querySelectorAll('input[type="text"]')[index].value = 1;
  totalCart();
}

function updateQuantityBuy(temp, index, keyCarts) {
  let productItem = document.querySelectorAll('.product-item');
  if(productItem[keyCarts].querySelector('.product-name').innerText === PRODUCTS[index].name)
  {
    productItem[keyCarts].querySelector('input[type="number"]').value = temp;
    productItem[keyCarts].querySelector('.cost').innerText = `${temp*PRODUCTS[index].price}`;
    saveProduct(temp, '', keyCarts + 1, '');
  }
}

function findProductInCarts(name) {
  let x = -1;
  document.querySelectorAll('.product-item').forEach((value,key) => {
    if(value.querySelector('.product-name').innerText === name)
      x = key;
  })
  return x;
}

function findProduct(name) {
  let x = -1;
  PRODUCTS.forEach((value,key) => {
    if(value.name === name){
      x = key;
    }
  });
  return x;
}

function deleteEvent(target) {
  target.forEach((element, index) => {
    element.querySelector('.btn-delete').addEventListener('click', ()=> {
      let key = findProduct(element.querySelector(".product-name").innerText);
      let cost = parseInt(element.querySelector('.cost').innerText);
      element.parentNode.removeChild(element);
      count--;
      totalPriceOfCart -= cost;
      totalProduct -= cost/PRODUCTS[key].price;
      tempQuantity[key] -= cost/PRODUCTS[key].price;
      deleteProductInCarts(index);
      resetCount();
      totalCart();

    });
    return;
  })
}

function resetCount() {
  let buyId = document.querySelectorAll('.idBuy');
  buyId.forEach((value, key) => {
    value.innerText = key + 1;
  });
}

function deleteProductInCarts(index) {
  carts.splice(index, 1);
  for(let i in carts)
    carts[i].id = parseInt(i) + 1;
  localStorage.setItem('carts', JSON.stringify(carts));
  carts = saveProduct();
}

function updateQuantity(target) {
  target.forEach((element) => {
    element.querySelector('.btn-update').addEventListener('click', ()=> {
      let key = findProduct(element.querySelector(".product-name").innerText);
      let quantity = element.querySelector('input[type = "number"]').value;
      let cost = parseInt(element.querySelector('.cost').innerText);
      let newCost = PRODUCTS[key].price*parseInt(quantity);
      element.querySelector('.cost').innerText = newCost;
      totalPriceOfCart += newCost - cost;
      totalProduct += (newCost - cost)/PRODUCTS[key].price;
      tempQuantity[key] += (newCost - cost)/PRODUCTS[key].price;
      let keyProduct = findProductInCarts(element.querySelector(".product-name").innerText);
      saveProduct(tempQuantity[key], '', keyProduct + 1, '');
      totalCart();
      return;
    });
  })
}

function saveProduct(num, name, id, price) {
  if(carts.length < id){
    carts.push({
      id: id,
      name: name,
      quantity: num,
      price: price
    })
  }
  else
  {
    carts[id - 1].quantity = num;
  }

  localStorage.setItem('carts', JSON.stringify(carts));
}

function saveProduct() {
  let exist = localStorage.getItem('carts');
  let localCarts = [];
  if(exist !== null){
    localCarts = JSON.parse(exist);
  }
  return localCarts;
}