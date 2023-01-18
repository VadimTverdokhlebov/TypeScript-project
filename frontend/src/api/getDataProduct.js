export async function getDataProduct() {

    const url = 'http://localhost:3000/api/products';
    const response = await fetch(url);
    const json = await response.json();
    
    return json;
}
