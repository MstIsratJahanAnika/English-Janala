const createElements = (arr) =>
    // map jehetu ase, array return korbe
{
    const htmlElements = arr.map( elem => `<span class ="btn">${elem}</span>`);
    console.log(htmlElements.join(" ")); //convert to string, seperated with space
}

const synonyms = ['hello', 'hi', 'anneho'];
createElements(synonyms);