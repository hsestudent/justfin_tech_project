var Airtable = require('airtable');

require("dotenv").config();
const SECRET_API_TOKEN = process.env.SECRET_API_TOKEN;
const BASE_ID = process.env.BASE_ID;
var base = new Airtable({ apiKey: SECRET_API_TOKEN }).base(BASE_ID);

base('Available soft products').select({
    filterByFormula: `{Even} != "0"`,
    view: "Grid view"
}).eachPage(function page(records, fetchNextPage) {
    // This function (`page`) will get called for each page of records.

    records.forEach(function(record) {
        console.log(record.get('Name') + ", $" + record.get('Price (USD per user)') + ", " + record.get('Category'));
    });
    // If there are more records, `page` will get called again.
    // If there are no more records, `done` will get called.
    fetchNextPage();

}, function done(err) {
    if (err) { console.error(err); return; }
});
