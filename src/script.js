document.addEventListener('DOMContentLoaded', () => {
    console.log('Script cargado correctamente'); // Comprobación de que el script se está ejecutando

    const botonesAddToCart = document.querySelectorAll('.add-to-cart-btn');

    console.log(`Se encontraron ${botonesAddToCart.length} botones Add to Cart`); // Comprobación de la cantidad de botones encontrados

    botonesAddToCart.forEach(boton => {
        boton.addEventListener('click', async () => {
            console.log('Botón Add to Cart presionado'); // Para verificar que el evento click se está capturando
            const idProducto = boton.dataset.productId;
            const cantidad = 1;

            try {
                const response = await fetch(`/products/${idProducto}/add-to-cart`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ productId: idProducto, quantity: cantidad }),
                });

                const data = await response.json();

                if (response.ok) {
                    alert(`¡Producto con ID ${idProducto} agregado al carrito!`);
                    window.location.href = '/carts';
                } else {
                    alert(data.message || 'Error al agregar el producto al carrito');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error al agregar el producto al carrito');
            }
        });
    });
});
