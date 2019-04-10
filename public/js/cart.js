function postCartData(type, data) {
    return fetch('/cart/' + type, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => res.json());
  }
  
  const cartController = (function() {
    return {
      updateItemCount: function(itemId, count, price, totalCount) {
        count = count || 0;
        if (count > 0) {
          document.querySelectorAll('button[data-id="' + itemId + '"]')[0].innerHTML = count;
          document.querySelectorAll(
            'span[class="total__price"][data-id="' + itemId + '"]'
          )[0].innerHTML = 'Rs.' + price * count;
        } else {
          let elem = document.querySelectorAll('div[class="cart-item"][data-id="' + itemId + '"]')[0];
          elem.parentNode.removeChild(elem);
        }
        document.getElementsByClassName('cart-header__text')[0].innerHTML = 'My Cart (' + totalCount + ' items)';
      }
    };
  })();
  
  (function(removeItemElems, addItemElems, cartCountElem, cartController) {
    [{ elems: removeItemElems, type: 'remove' }, { elems: addItemElems, type: 'add' }].forEach(function(elemsOperation) {
      [].forEach.call(elemsOperation.elems, element => {
        element.addEventListener('click', event => {
          event.preventDefault();
          let productId = event.target.getAttribute('data-id');
          postCartData(elemsOperation.type, { productId: productId }).then(function(cart) {
            cartCountElem.innerHTML = cart.count + ' items';
            let cartProductDetail = cart.items.find(item => item.product.id === productId);
            cartController.updateItemCount(
              productId,
              cartProductDetail && cartProductDetail.count,
              cartProductDetail && cartProductDetail.product.price,
              cart.count
            );
          });
        });
      });
    });
  })(
    document.getElementsByClassName('minus__count'),
    document.getElementsByClassName('fa-plus'),
    document.getElementsByClassName('cart__count__item')[0],
    cartController
  );