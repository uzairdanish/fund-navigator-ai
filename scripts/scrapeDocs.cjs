// scripts/scrapeDocs.cjs
const fs = require('fs');
const fetch = require('node-fetch');
const cheerio = require('cheerio');
(async () => {
  console.log('Fetching documentation index…');
  const res = await fetch('https://www.pictonmahoney.com/documentation/');
  const html = await res.text();
  const $ = cheerio.load(html);

  // select all <a> that say "Learn more"
  const docs = $('a')
    .filter((_, el) => $(el).text().trim().toLowerCase() === 'learn more')
    .map((_, el) => {
      const url = $(el).attr('href');
      // look backwards for the nearest <h3> to get the section title
      const name = $(el)
        .prevAll('h3')
        .first()
        .text()
        .trim();
      return { name, url };
    })
    .get();

  console.log(`Found ${docs.length} documents`);

  fs.writeFileSync(
    'src/data/documents.js',
    `export const documents = ${JSON.stringify(docs, null, 2)};\n` +
    `export default documents;`
  );
  console.log('Wrote src/data/documents.js');
})();