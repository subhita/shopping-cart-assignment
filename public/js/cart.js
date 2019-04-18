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
      updateItemCount: function(itemId, count, price, totalCount, totalPrice) {
        count = count || 0;
        if (count > 0) {
          document.querySelectorAll('span[data-id="' + itemId + '"]')[0].innerHTML = count;
          document.querySelectorAll(
            'div[class="total__price"][data-id="' + itemId + '"]'
          )[0].innerHTML = 'Rs.' + price * count;
        } else {
          let elem = document.querySelectorAll('div[class="cart__item"][data-id="' + itemId + '"]')[0];
          elem.parentNode.removeChild(elem);
        }
        document.getElementsByClassName('cart__header__text')[0].innerHTML = 'My Cart (' + totalCount + ' items)';
        document.getElementsByClassName('button__price')[0].innerHTML = 'Rs.' + totalPrice;
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
            cartCountElem.innerHTML = cart.count;
            let cartProductDetail = cart.items.find(item => item.product.id === productId);
            cartController.updateItemCount(
              productId,
              cartProductDetail && cartProductDetail.count,
              cartProductDetail && cartProductDetail.product.price,
              cart.count,
              cart.totalPrice
            );
          });
        });
      });
    });
  })(
    document.getElementsByClassName('cart__item__count--minus'),
    document.getElementsByClassName('cart__item__count--plus'),
    document.getElementsByClassName('cart__count__item')[0],
    cartController
  );


// cart modal

  var modal = document.getElementById('myModal');
  var btn = document.getElementById("cart-modal");

  var span = document.getElementsByClassName("close")[0];

  // When the user clicks the button, open the modal
  btn.addEventListener("mouseover", function () {
      modal.style.display = "block";
  }
  );

  // When the user clicks on <span> (x), close the modal
  span.addEventListener("click", function () {
      modal.style.display = "none";
  }
  );

  // When the user clicks anywhere outside of the modal, close it
  window.onmouseover = function (event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
  }