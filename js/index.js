let productsInCart = []

function agregarAlCarrito (title, price, imgSrc) {
  Swal.fire({
    title: 'Producto añadido al carrito',
    icon: 'success',
    html: `
     <a  id="irAlCarritoBtn" class="mt-2" data-bs-toggle="modal" data-bs-target="#exampleModal">Ir al Carrito</a>
    `,
    confirmButtonText: 'CONTINUAR COMPRANDO',
    confirmButtonColor: 'black'
  })
  document.getElementById('irAlCarritoBtn').addEventListener('click', () => {
    Swal.close()
  })
  irAlCarritoBtn.style.cursor = 'pointer'

  const existingProductIndex = productsInCart.findIndex(
    item => item.objTitle === title
  )

  if (existingProductIndex !== -1) {
    productsInCart[existingProductIndex].objQuantity += 1
    productsInCart[existingProductIndex].objTotal =
      productsInCart[existingProductIndex].objQuantity *
      productsInCart[existingProductIndex].objPrice
  } else {
    const newProduct = {
      objTitle: title,
      objPrice: Number(price),
      objImg: imgSrc,
      objQuantity: 1,
      objTotal: Number(price)
    }

    productsInCart.push(newProduct)
  }

  actualizarCarrito()
}

function actualizarCarrito () {
  const carritoContenedorModal = document.getElementById(
    'carritoContenedorModal'
  )
  carritoContenedorModal.innerHTML = ''

  let totalCompraSinImpuesto = 0
  let totalImpuestos = 0

  productsInCart.forEach((item, index) => {
    const itemContainer = document.createElement('div')
    itemContainer.classList.add(
      'carrito-item',
      'd-flex',
      'mb-3',
      'align-items-start'
    )

    itemContainer.innerHTML = `
    <div class="carrito-numero">${index + 1}</div>
    <div class="carrito-detalle">
      <div class="carrito-detalle-izquierda">
        <div class="carrito-nombre">${item.objTitle}</div>
        <div class="carrito-imagen">
          <img src="${item.objImg}" style="max-width: 120px; height: auto;">
        </div>
      </div>
      <div class="carrito-detalle-derecha">
        <div class="carrito-cantidad">
          <div class="input-group">
            <button class="btn btn-sm btn-outline-secondary" type="button" onclick="decrementarCantidad(${index})">-</button>
            <span class="input-group-text">${item.objQuantity}</span>
            <button class="btn btn-sm btn-outline-secondary" type="button" onclick="incrementarCantidad(${index})">+</button>
          </div>
        </div>
        <div class="carrito-total ms-2 mt-2">L ${(
          item.objPrice * item.objQuantity
        ).toFixed(2)}</div>
      </div>
    </div>
  `
    carritoContenedorModal.appendChild(itemContainer)

    totalCompraSinImpuesto += item.objPrice * item.objQuantity
    totalImpuestos = totalCompraSinImpuesto * 0.15
  })

  const subtotalContainer = document.createElement('div')
  subtotalContainer.classList.add('carrito-subtotal')
  subtotalContainer.innerHTML = `<div>Subtotal: L${totalCompraSinImpuesto.toFixed(
    2
  )}</div>`
  carritoContenedorModal.appendChild(subtotalContainer)

  const impuestoContainer = document.createElement('div')
  impuestoContainer.classList.add('carrito-impuesto')
  impuestoContainer.innerHTML = `<div>Impuesto: L${totalImpuestos.toFixed(
    2
  )} </div>`
  carritoContenedorModal.appendChild(impuestoContainer)

  const impuesto = 0.15
  const totalCompra = totalCompraSinImpuesto + totalCompraSinImpuesto * impuesto

  const totalContainer = document.createElement('div')
  totalContainer.classList.add('carrito-total')
  totalContainer.innerHTML = `<div>Total: L${totalCompra.toFixed(2)}</div>`
  carritoContenedorModal.appendChild(totalContainer)
}
function realizarCheckout () {
  Swal.fire({
    title: 'Checkout realizado!',
    text: 'Carrito vacio',
    icon: 'success'
  })
  productsInCart = []
  actualizarCarrito()
}

function incrementarCantidad (index) {
  if (productsInCart[index].objQuantity < 999) {
    productsInCart[index].objQuantity++
  }
  actualizarCarrito()
}

function decrementarCantidad (index) {
  if (productsInCart[index].objQuantity > 1) {
    productsInCart[index].objQuantity--
  }
  actualizarCarrito()
}

//Login form
function login () {
  document.getElementById('loginBtn').addEventListener('click', () => {
    let userName = document.getElementById('userName').value
    let pass = document.getElementById('pass').value

    if (pass === '' || userName === '') {
      Swal.fire({
        icon: 'error',
        title: 'Ooops...',
        text: 'La contraseña y el nombre de usuario no deben ir en blanco'
      })
    } else if (pass !== 'admin123' || userName !== 'moises') {
      Swal.fire({
        icon: 'error',
        tittle: 'Ooops...',
        text: 'Usuario o contraseña incorrectos'
      })
    } else if (pass == 'admin123' && userName == 'moises') {
      Swal.fire({
        icon: 'success',
        title: '¡Inicio de sesión exitoso!',
        text: 'Redirigiendo...'
      }).then(result => {
        if (result.isConfirmed) {
          window.location.href = 'index.html'
        }
      })
    }
  })
}
