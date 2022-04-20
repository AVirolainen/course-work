const axios = require("axios");
const cheerio = require("cheerio");

// let url = `https://rozetka.com.ua/mobile-phones/c80003/`;
let rozetkaUrl = `https://rozetka.com.ua/notebooks/c80004`;

function parseRozetkaData(amount, blank, html) {
    const items = [];

    for (let i = 0; i < amount; i++) {
        let device = {};
        blank(".goods-tile__inner", html)[i].children.forEach(function (item) {
            let className = item.attribs?.class ? item.attribs?.class : " ";
            if (className.startsWith("goods-tile__picture")) {
                device.src = item.attribs.href;
                device.img = item.children[0].attribs.src;
            } else if (className.startsWith("goods-tile__heading")) {
                device.model = item.attribs.title;
            } else if (className.startsWith("goods-tile__prices")) {
                device.price = blank(".goods-tile__price-value", item).text();
            }
        });
        items.push(device);
    }
    return items;
}

// const rozetkaData = axios(url).then((responce) => {
//     const html = responce.data;
//     const $ = cheerio.load(html);

//     return parseRozetkaData(5, $, html);
// });

// Data parsing foxtrot

let foxtrotUrl = `https://www.foxtrot.com.ua/ru/shop/noutbuki.html`;

function parseFoxtrotData(amount, blank, html) {
    const items = [];
	
	for(let i = 0; i<amount; i++){
		let device = {};
		
		device.src = "https://www.foxtrot.com.ua" + blank(".card__image", html)[i].children[1].attribs.href
		device.model = blank(".card__body", html)[i].children[1].attribs.title;
		device.price = blank(".card-price", html)[i].children[0].data.replace(/\s/g, '')
		device.img = blank("img", ".card__image")[i].attribs.src
		
		items.push(device)
	}

    return items;
}

// const foxtrotData = axios(foxtrotUrl).then((responce) => {
//     const html = responce.data;
//     const $ = cheerio.load(html);

//     console.log(parseFoxtrotData(5, $, html));
// });
