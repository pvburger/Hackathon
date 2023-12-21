document.addEventListener('DOMContentLoaded', () => {
  // document.body.style.background =
  //   'linear-gradient(120deg, Red, Orange, Yellow, Green, Blue, Indigo, Violet, #DD4124, Cyan, #D65076)';
  
  // initialize an empty object
  // const stockNames = ['tsla', 'aapl', 'goog', 'amzn'];
  // example stock price dictionary
  let exPrices = {
    TSLA: '254.50 (+7.36)',
    AAPL: '194.68 (+0.10)',
    GOOG: '141.80 (+2.14)',
    AMZN: '153.84 (+1.72)',
  };
  // let exChange = {
  //   TSLA: ,
  //   AAPL: -0.15,
  //   GOOG: ,
  //   AMZN
  // }
  // const stockPrices = [247.14, 194.83, 139.66, 152.12];
  // const stockChange = [-10.08, -2.11, 1.56, -1.67];

  // check storage for current stocks
  chrome.storage.sync.get(['key']).then((result) => {
    // declare empty var stockNames and push to it
    let stockNames = [];
    if (Array.isArray(result.key)) {
      for (let el of result.key) {
        stockNames.push(el.toUpperCase());
      }
    } else stockNames.push(result.key);

    // create page elements for each array element
    for (let i = 0; i < stockNames.length; i++) {
      // create h2
      let el = stockNames[i];
      let price = getPrice(el) || exPrices[el];
      let change = '';
      // let price = stockPrices[i];
      // let change = stockChange[i];
      const myHead = document.createElement('h2');
      myHead.innerText = el.toUpperCase() + ' ' + price + ' ' + change;
      document.querySelector('body').appendChild(myHead);

      // // // create line break
      // linebreak1 = document.createElement('br');
      // document.querySelector('body').appendChild(linebreak1);

      // create yahoo link
      const a = document.createElement('a');
      const linkText = document.createTextNode('Daily Charts ');
      a.appendChild(linkText);
      a.href = 'https://finance.yahoo.com/quote/' + el;
      document.querySelector('body').appendChild(a);

      // // create line break
      linebreak2 = document.createElement('br');
      document.querySelector('body').appendChild(linebreak2);

      // create twitter link
      const b = document.createElement('a');
      const linkTextb = document.createTextNode('Market Sentiment ');
      b.appendChild(linkTextb);
      b.href = 'https://twitter.com/search?q=%24' + el;
      document.querySelector('body').appendChild(b);

      // // create line break
      linebreak3 = document.createElement('br');
      document.querySelector('body').appendChild(linebreak3);

      // create seeking alpha link
      const c = document.createElement('a');
      const linkTextc = document.createTextNode('Expert Articles ');
      c.appendChild(linkTextc);
      c.href = 'https://seekingalpha.com/symbol/' + el.toUpperCase();
      document.querySelector('body').appendChild(c);

      // create line break
      linebreak4 = document.createElement('br');
      document.querySelector('body').appendChild(linebreak4);
    }
  });

  const myButton = document.querySelector('#myButton');
  myButton.onclick = function () {
    // chrome.storage.sync.set({ key: null }).then(() => {
    //   alert('Cleared stocks');
    // });
    chrome.storage.sync.clear();
    location.reload();
    // alert('cleared stocks');
    // alert('onclick registered')
  };

  const form = document.querySelector('form');
  form.addEventListener('submit', (e) => {
    let ticker = document.getElementById('ticker').value.toUpperCase();

    chrome.storage.sync.get(['key']).then((result) => {
      if (result.key) {
        chrome.storage.sync.set({ key: result.key.push(ticker) });
      } else {
        chrome.storage.sync.set({ key: [ticker] });
      }
    });
  });
});

function getPrice(ticker) {
  const data = null;

  const xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener('readystatechange', function () {
    if (this.readyState === this.DONE) {
      console.log();
      let output = JSON.parse(this.responseText);
      let price = output.regularMarketPrice.raw;
      return price;
    }
  });

  xhr.open(
    'GET',
    'https://yahoo-finance127.p.rapidapi.com/price/' + ticker.toLowerCase()
  );
  xhr.setRequestHeader(
    'X-RapidAPI-Key',
    '708f0cd5admsh2b57c850ece1aecp1aff81jsn8604d3017cf0'
  );
  xhr.setRequestHeader('X-RapidAPI-Host', 'yahoo-finance127.p.rapidapi.com');

  xhr.send(data);
}