(function(buyItem, cartCountElem) {
    [].forEach.call(buyItem, element => {
      element.addEventListener('click', event => {
        event.preventDefault();
        fetch('/cart/add', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ productId: event.target.id })
        })
          .then(res => res.json())
          .then(function(cart) {
            cartCountElem.innerHTML = cart.count;
          });
      });
    });
  })(
    document.getElementsByClassName('item__price'),
    document.getElementsByClassName('cart__count__item')[0]
  );