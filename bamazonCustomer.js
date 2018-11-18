var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('cli-table3');
var itemArray = [];

var connection;

function createConnection() {
    connection = mysql.createConnection({
        host: "localhost",
        // Your port; if not 3306
        port: 3306,
        // Your username
        user: "root",
        // Your password
        password: "Dam3Acc3soAMySQL",
        database: "bamazon"
    });
}

function buildTable(headerArray,widthArray,itemArray){
    var table = new Table({
        head: headerArray,
        colWidths: widthArray,
        wordWrap:true,
        chars: {
            'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
            , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
            , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
            , 'right': '║' , 'right-mid': '╢' , 'middle': '│' 
        }
    });

    for (var i = 0; i<itemArray.length;i++){
        table.push([
            itemArray[i].id,
            itemArray[i].name,
            itemArray[i].price
        ]);
    }
    var tempArray = table.toString().split("║");
    var inquireArray = [];
    for (var i = 0; i < tempArray.length;i++){
        if (i%2 === 1 && i > 2) {
            inquireArray.push(tempArray[i]);
        }
    }
    console.log(tempArray[1]);
    return inquireArray;
}

function readItems() {
    console.log("Retrieving available items...\n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            var product = {
                id: res[i].item_id,
                name: res[i].product_name,
                price: '$'+res[i].price
            };
            itemArray.push(product);
        }
        buildTable(['ID','PRODUCT','PRICE'],[4,50,13],itemArray);
    });
}
/*
function start() {
    inquirer.prompt([{
        type: "list",
        choices: ["POST", "BID"],
        message: "Would you like to bid on an item or post an item?",
        name: "action"
    }, ])
    .then(function (res) {
        // If the inquirerResponse confirms, we displays the inquirerResponse's username and pokemon from the answers.
        if (res.action === "POST") {
            console.log("\nPlease provide the following info");
            postItem();
        } else {
            console.log("\nSelect an item to bid on");
            readItems();
        }
    });
}
*/

createConnection();
readItems();