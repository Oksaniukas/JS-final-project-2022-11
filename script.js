let url = 'https://635d0154cb6cf98e56aa96bd.mockapi.io/productCards';
let productList;
let wrapper  = document.querySelector(".cards-list");
let producerList = ["TOSHIBA", "APPLE", "HP", "ACER", "ASUS", "LENOVO", "DELL"];
let processorList = ["AMD", "Intel", "AppleM1", "AppleM2"];
let screenSizeList = [13, 13.3, 14, 15.6, 16, 17.3];
let ramList = [4, 8, 16, 32, 64];
let ssdList = ["128GB", "256GB", "512GB", "1TB", "2TB", "4TB"];
// let priceList = ["600,00", "750,00", "900,00", "1100,00", "1220,00", "1500,00", "1800,00", "2200,00", "3000,00"]

function render(list, parent) {
  parent.innerHTML = '';

  list.forEach((card) => {
    let newCard = document.createElement('div');
    newCard.innerHTML = `
    <div class="product-card">
      <div class="product-image">
        <img src="${card.image}" alt="Laptop">
      </div>
      <div class="product-name">
        ${card.description}
      </div>
      <div class="product-specs">
        <div class="spec-line">
          <div class="label">Atmintinė: </div>
          <div class="value"> ${card.specs.ram}GB</div>
        </div>
        <div class="spec-line">
          <div class="label">Ekrano įstrižainė: </div>
          <div class="value"> ${card.specs.screenSizeText}</div>
        </div>
        <div class="spec-line">
          <div class="label">SSD: </div>
          <span> </span>
          <div class="value"> ${card.specs.ssd}</div>
        </div>
      </div>
      <div class="product-price">
      ${card.price} €
      </div>
      <div class="product-action-block">
        <div class="to-cart-button">
          <img src="https://www.topocentras.lt/140fe2aeea6055f5fc2782fbc940be96.svg" alt="cart">
          <span>Į krepšelį</span>
        </div>
        <div class="favourite-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>                  
        </div>
      </div>
      <div class="product-tax">
        + 7,01 € Laikmenos mokestis
      </div>

      <div class="delivery-footer ${card.availableInShop ? 'show' : ''}">
        <img src="https://www.topocentras.lt/assets/icons/shipping.svg" alt="Delivery car">
        <span>Turime! Atsiimkite per 30min.</span>
      </div>

      <div class="discount-code ${card.discount ? 'show' : ''}">
        <img src="https://www.topocentras.lt/media/amasty/amlabel/1112184x84px-ikona-B.png" alt="discount">
      </div>

      <div class="e-price ${card.ePrice ? 'show' : ''}">E-kaina</div>
      <div class="shop-price">Tik Topocentras.lt</div>
    </div>
      `
    parent.append(newCard)
  });
};

function countAmount(filterList, productList) { ///producer + processor
  filterList.forEach(prod => {
    let amount = 0;

    productList.forEach(product => {
      if (product.producer === prod || product.processor === prod) 
      amount++
    })

    let el = document.querySelector(`.${prod}.result-amount`)
    el.innerHTML = `(${amount})`;
  })
};

function countScreen(filterList, productList) {
  let elScreen = document.querySelectorAll('.screen.result-amount');
  filterList.forEach(screen => {
    let amount = 0;

    productList.forEach(product => {
      if (product.specs.screenSizeValue === screen) 
      amount++
    })

    elScreen.forEach(screenFilterEl => {
      if (screenFilterEl.dataset.screen == screen) {
        screenFilterEl.innerHTML = `(${amount})`;
      }
    })
    
  })
};

function countRam(filterList, productList) {
  let elRam = document.querySelectorAll('.ram.result-amount');
  filterList.forEach(ram => {
    let amount = 0;

    productList.forEach(product => {
      if (product.specs.ram === ram) 
      amount++
    })

    elRam.forEach(ramFilterEl => {
      if (ramFilterEl.dataset.ram == ram) {
        ramFilterEl.innerHTML = `(${amount})`;
      }
    })
    
  })
};

function countSsd(filterList, productList) {
  let elSsd = document.querySelectorAll('.disk.result-amount');
  filterList.forEach(disk => {
    let amount = 0;
    productList.forEach(product => {
      if (product.specs.ssd === disk)
      amount++
    })

    elSsd.forEach(ssdFilterEl => {
      if (ssdFilterEl.dataset.ssd === disk) {
        ssdFilterEl.innerHTML = `(${amount})`;
      }
    })
  })
};

function countPrice(productList) {
  let elPrice = document.querySelectorAll('.price.result-amount');
  elPrice.forEach(label => {
    let priceRange = label.dataset.price /// 600/
    if (priceRange === '600/') {
      let amount = productList.filter(product => 
        parseFloat(product.price) < 600).length  //parseFloat возвращает число с плавающей точкой//вернёт массис с ценами ниже 600, .length  - длина массива, котор записываем в скобки
        // console.log(amount)
        label.innerHTML = `(${amount})`
    }

    if (priceRange === '600/750') {
      let amount = productList.filter(product => 
      parseFloat(product.price) >= 600 && parseFloat(product.price) < 750).length  
      label.innerHTML = `(${amount})`
    }

    if (priceRange === '750/900') {
      let amount = productList.filter(product => 
      parseFloat(product.price) >= 750 && parseFloat(product.price) < 900).length  
      label.innerHTML = `(${amount})`
    }

    if (priceRange === '900/1100') {
      let amount = productList.filter(product => 
      parseFloat(product.price) >= 900 && parseFloat(product.price) < 1100).length  
      label.innerHTML = `(${amount})`
    }

    if (priceRange === '1100/1220') {
      let amount = productList.filter(product => 
      parseFloat(product.price) >= 1100 && parseFloat(product.price) < 1220).length  
      label.innerHTML = `(${amount})`
    }

    if (priceRange === '1220/1500') {
      let amount = productList.filter(product => 
      parseFloat(product.price) >= 1220 && parseFloat(product.price) < 1500).length  
      label.innerHTML = `(${amount})`
    }

    if (priceRange === '1500/1800') {
      let amount = productList.filter(product => 
      parseFloat(product.price) >= 1500 && parseFloat(product.price) < 1800).length  
      label.innerHTML = `(${amount})`
    }

    if (priceRange === '1800/2200') {
      let amount = productList.filter(product => 
      parseFloat(product.price) >= 1800 && parseFloat(product.price) < 2200).length  
      label.innerHTML = `(${amount})`
    }

    if (priceRange === '2200/3000') {
      let amount = productList.filter(product => 
      parseFloat(product.price) >= 2200 && parseFloat(product.price) < 3000).length  
      label.innerHTML = `(${amount})`
    }

    if (priceRange === '/3000') {
      let amount = productList.filter(product => 
      parseFloat(product.price) >= 3000).length  
      label.innerHTML = `(${amount})`
    }
  })
}

///sort product by price/name/// // arr.sort( (a, b) => a - b );///// sort( (a, b) => a > b ? 1 : -1) )
let select = document.querySelector('.sort-select'); //<select class="sort-select">
select.addEventListener("click", (e) => {
  if (e.target.value === "price_asc") {
    let sortedProductList = productList.sort((a, b) => {  
      return parseFloat(a.price) - parseFloat(b.price) ;
    });
    wrapper.innerHTML = '';
    render(sortedProductList, wrapper)
  };

  if (e.target.value === "price_desc") {
    let sortedProductList = productList.sort((a, b) => {  
      return parseFloat(b.price) - parseFloat(a.price) ;
    });
    wrapper.innerHTML = '';
    render(sortedProductList, wrapper)
  };

  if (e.target.value === "name") {
    let sortedProductList = productList.sort((producer) => {  
      return producer;
    });
    wrapper.innerHTML = '';
    render(sortedProductList, wrapper)
  };

  if (e.target.value === "discount") {
    let sortedProductListBy = productList.filter((item) => item.discount === true);
      wrapper.innerHTML = '';
      render(sortedProductListBy, wrapper)    
  };

  if (e.target.value === "bestsellers") {
    let sortedProductList = productList.filter((item) => item.ePrice === true);
      wrapper.innerHTML = '';
      render(sortedProductList, wrapper)    
  };

  if (e.target.value === "all") {
      wrapper.innerHTML = '';
      render(productList, wrapper)    
  };
});

///show cards
let select2 = document.querySelector('.sort-select2') //<select class="sort-select2">
select2.addEventListener("click", (e) => {
  if (+e.target.value === 0) {
    wrapper.innerHTML = '';
    render(productList, wrapper)
  };
  if (+e.target.value === 5) {
    let sortedCard = productList.slice(0, 5);
    wrapper.innerHTML = '';
    render(sortedCard, wrapper)
  };
  if (+e.target.value === 10) {
    let sortedCard = productList.slice(0, 10);
    wrapper.innerHTML = '';
    render(sortedCard, wrapper)
  };
  if (+e.target.value === 15) {
    let sortedCard = productList.slice(0, 15);
    wrapper.innerHTML = '';
    render(sortedCard, wrapper)
  };
  if (+e.target.value === 20) {
    let sortedCard = productList.slice(0, 20);
    wrapper.innerHTML = '';
    render(sortedCard, wrapper)
  };
  if (+e.target.value === 30) {
    let sortedCard = productList.slice(0, 30);
    wrapper.innerHTML = '';
    render(sortedCard, wrapper)
  };
});


let x;
async function getx() {
  let response = await fetch(url)
  let dataResponse = await response.json()
  let data = dataResponse[0].data;
  console.log(data);
  // console.log(dataResponse)

  productList = data;
  render(data, wrapper);
  countAmount(producerList, data);
  countAmount(processorList, data);
  countScreen(screenSizeList, data);
  countRam(ramList, data);
  countSsd(ssdList, data);
  countPrice(data);
}
getx();

//Checkbox//
let checkboxProducer = document.querySelectorAll('.check-producer');

checkboxProducer.forEach (el => {
  el.addEventListener('click', () => {
    if (this.checked === true) {
      let filteredList = productList.filter((item) => item.producer === prod)
      wrapper.innerHTML = '';
      render(filteredList, wrapper)
    } 
    else {
      wrapper.innerHTML = '';
    }
  })
})

    

//// Check document.getElementById("checkbox").checked = true;
// Uncheck  document.getElementById("checkbox").checked = false;


  












