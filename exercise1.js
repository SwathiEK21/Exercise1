const fs = require('fs');
const { JSDOM } = require('jsdom');

const htmlContent = fs.readFileSync('index.html', 'utf-8');

const dom = new JSDOM(htmlContent);
const doc = dom.window.document;

// Extract data from specific elements
const dataContainer = doc.getElementById('main');
const items = [];

dataContainer.querySelectorAll('ul li').forEach((item) => {
  const capital = item.querySelector('.capital').textContent.trim();
  const state = item.querySelector('.state').textContent.trim();
  items.push({ capital, state });
});

const resultJson = {
  capitals: items,
  summary: {
    numberOfCapitals: items.length,
  },
};

fs.writeFileSync('results.json', JSON.stringify(resultJson, null, 2));
