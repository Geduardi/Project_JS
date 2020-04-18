const add = (cart, req) => {
    cart.contents.push(req.body);
    cart.amount = cart.amount + req.body.price;
    return { name: req.body.product_name, newCart: JSON.stringify(cart, null, 4) };
};

const change = (cart, req) => {
    const find = cart.contents.find(el => el.id_product === +req.params.id);
    find.quantity += req.body.quantity;
    if (req.body.quantity < 0) {
        cart.amount = cart.amount - find.price;
    } else {
        cart.amount = cart.amount + find.price;
    }
    return { name: req.body.product_name, newCart: JSON.stringify(cart, null, 4) };
};


const remove = (cart, req) => {
    const find = cart.contents.find(el => el.id_product === +req.params.id);
    cart.amount -= find.price;
    cart.contents.splice(cart.contents.indexOf(find), 1);

    return { name: req.body.product_name, newCart: JSON.stringify(cart, null, 4) };
};

const clear = (cart, req) => {
    cart.contents.length = 0;
    cart.amount = 0;
    return { name: 'Cart clearing', newCart: JSON.stringify(cart, null, 4) };
};

module.exports = {
    add,
    change,
    remove,
    clear
};
