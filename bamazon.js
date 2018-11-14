var mysql = require("mysql");
var inquirer = require("inquirer");
var product = new Object;
var itemArray = [];
var priceArray = [];
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

