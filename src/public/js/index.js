
const socket = io()
socket.on('productos', productos =>{
    const tbody = document.getElementById('productos-body')
    tbody.innerHTML = ''

    productos.forEach(producto => {
        const row = tbody.insertRow()

        row.innerHTML = `
        <td>${producto._id}</td>
        <td>${producto.title}</td>
        <td>${producto.description}</td>
        <td>${producto.code}</td>
        <td>${producto.price}</td>
        <td>${producto.status}</td>
        <td>${producto.stock}</td>
        <td>${producto.category}</td>
        <td>${producto.status ? 'Stock en sucursal':'Pedir Reposicion'}</td>
        <td>${producto.thumbnails}</td>        
        `
    });
})

const formulario = document.getElementById('form-producto')
    formulario.addEventListener('submit', function(event){
    event.preventDefault()
    const ftitle = document.getElementById('title').value
    const fdescription = document.getElementById('description').value
    const fcode = document.getElementById('code').value
    const fprice = document.getElementById('price').value
    const fstock = document.getElementById('stock').value
    const fstatus = document.getElementById('status').value
    const fthumbnails = document.getElementById('thumbnails').value
    const fcategory = document.getElementById('category').value

    const newproduct = {
        title:ftitle,
        description:fdescription,
        code:fcode,
        price:fprice,
        stock:fstock,
        status:fstatus,
        thumbnails:fthumbnails,
        category:fcategory
    }

    socket.emit('addProducto',newproduct)
    formulario.reset()
})

module.exports = socket
