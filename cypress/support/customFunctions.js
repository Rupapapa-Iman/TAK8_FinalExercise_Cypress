function randomizers(array){
    const size = Object(array);
    if (!array || size.length === undefined) {
         throw new Error('Invalid array passed to randomizer'); 
    }
    return Math.floor(Math.random() * size.length);
};

function random_Qty(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
};

module.exports = { randomizers, random_Qty };