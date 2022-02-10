const axios = require("axios");
const cheerio = require("cheerio");

// let url = `https://rozetka.com.ua/mobile-phones/c80003/`;
let url = `https://rozetka.com.ua/notebooks/c80004`

function findInfo(amount, blank, html){
	const items = [];
	let device = {};

	for (let i = 0; i < amount; i++) {
		blank(".goods-tile__inner", html)[i].children.forEach(function (item) {
			let className = item.attribs?.class ? item.attribs?.class : " ";
			if (className.startsWith("goods-tile__heading")) {
				device.model = item.attribs.title;
			} else if (className.startsWith("goods-tile__prices")) {
				device.price = blank(".goods-tile__price-value", item).text();
			}
		});
		items.push(device)
		device = {}
	}

	return items
}

const data = axios(url).then((responce) => {
	const html = responce.data;
	const $ = cheerio.load(html);

	console.log(findInfo(5, $, html))
});