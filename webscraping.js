const request = require('request');
const cheerio = require('cheerio');
const express = require('express');
const PORT = 3000 || process.env.PORT;
app = express();
app.listen(PORT, ()=>{console.log(`Server is starting at port number ${PORT}`)});

let array = []        // stores the overall data in map format 
let size = 0;         // stores the number of the cryptocurrency
let store  = [];      // stores the names of the cryptocurrency
let prices = [];      // stores the price of the cryptocurrency
let circ   = [];      // stores the circulation of the cryptocurrency
let changes = [];     // stores the market change of the cryptocurrency
let Market_Cap = [];  // stores the Market Cap of the crypocurrency
let Volume24h = [];   // stores the Volume of the cryptocurrency

function format(name, storage)  // formats and stores the data in correct format
{
    var names = name.replace(/\n|\r/g,"").replace(/\s{5,}/g,"@");
    for(var i=0;i<names.length;i++)
    {
        var temp;
        if(names[i]=="@")
            continue;
        while(names[i]!="@")
        {
            temp+=names[i];
            i++;
        }
        storage.push(temp);
        temp = "";
    }
    size = store.length;
}

// Data Scrap part....
request("https://goldprice.org/cryptocurrency-price",(error,response,html)=>
{
    if(!error && response.statusCode==200)
    {
        const $=cheerio.load(html);
        const names = $(".views-field.views-field-field-crypto-proper-name").text();
        const price = $(".views-field.views-field-field-crypto-price.views-align-right").text();
        const circulation = $(".views-field.views-field-field-crypto-circulating-supply.views-align-right").text();
        const change = $(".views-field.views-field-field-crypto-price-change-pc-24h.views-align-right").text();
        const MarketCap = $(".views-field.views-field-field-market-cap.views-align-right.hidden-xs").text();
        const Volume = $(".views-field.views-field-field-crypto-volume.views-align-right.hidden-xs").text();

        format(names,   store);
        format(price,   prices);
        format(circulation,circ);
        format(change,  changes);
        format(MarketCap,Market_Cap);
        format(Volume,  Volume24h);

        for(var i=1; i<size; i++)
        {
            array.push(
            {
                Name:store[i], 
                Volume_24h:Volume24h[i], 
                Price:prices[i], 
                Market_Cap_24h:Market_Cap[i], 
                Circulating_Supply:circ[i], 
                Change_24h:changes[i]
            });
        }
    
        app.get('/api/all',(req,res)=>{
            const json = JSON.stringify(array);
            res.send(json);
        });

        app.get('/api/crypto/:id',(req,res)=>{
            const names = req.params.id; 
            console.log(names);
            let found=false;
            for(var i=0;i<array.length;i++)
            {
                if(names == array[i].Name)
                {
                    const json = JSON.stringify(array[i]);
                    res.send(json);
                    found = true;
                }
            }
            if(!found)
                res.status("400").send("Not found");
        });
    }
});