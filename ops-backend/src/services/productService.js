// Filepath: ops-backend\src\services\productService.js
function getProductData(){
    return [
        { id: 1, name: "Laptop L101", category: "electronics", subcategory: "laptop", availableQty: 4, price: 88000.56 },
        { id: 2, name: "Monitor M201", category: "electronics", subcategory: "monitor", availableQty: 8, price: 24500 },
        { id: 3, name: "Keyboard K301", category: "accessories", subcategory: "keyboard", availableQty: 15, price: 3500 },
        { id: 4, name: "Mouse M401", category: "accessories", subcategory: "mouse", availableQty: 20, price: 1800 }
    ];
}

function addProduct(){
    console.log("Product inserted")
    return "Data inserted successfully"
}


export { getProductData, addProduct };