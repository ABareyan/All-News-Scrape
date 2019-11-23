// scraping
// ========

var request = require("request");
var cheerio = require("cheerio");

var scrape = function (cb) {
    request("https://www.npr.org/sections/news/", function(err, res, body) {
        
        var $ = cheerio.load(body);
        var articles = [];
        // console.log($);
        
        $(".item-info").each(function(i, element) {
            
            var head = $(this).children(".title").children("a").text().trim();
            // console.log(head + "head");
            
            var sum = $(this).children(".teaser").children("a").text().trim();
            // console.log(sum + "sum");
            
            if(head && sum) {
                
                var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
                var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
    
                var dataToAdd = {
                    headline: headNeat, 
                    summary: sumNeat
                };
                articles.push(dataToAdd);
            }
        });
        cb(articles);
    });
};

module.exports = scrape;
