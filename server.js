//vamos criar server para gerar valores para usar nesta app
module.exports = ()=>{
    const data = {
        products:[]
    }

    for(let i = 0; i<1000; i++){
        data.products.push(
            {
                id:i+1,
                price:80,
                title:`camiseta ${i+1}`
            }
        )
    }
    return data;
}