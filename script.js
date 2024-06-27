// signup 
document.addEventListener('DOMContentLoaded', () => {
    const newsletterForm = document.getElementsByClassName('newsletter-signup');

    newsletterForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const email = document.getElementById('email').value;
        if (validateEmail(email)) {
            alert(`Thank you for subscribing with email: ${email}`);
        } else {
            alert('Please enter a valid email address.');
        }
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
});
 
// ordering steps 
document.addEventListener('DOMContentLoaded', () => {
    const steps = document.querySelectorAll('.progress-indicator .step');
    const stepContents = document.querySelectorAll('.steps-container .step-content');

    steps.forEach(step => {
        step.addEventListener('click', () => {
            const stepNum = step.dataset.step;

            // Remove 'active' class from all steps and step contents
            steps.forEach(s => s.classList.remove('active'));
            stepContents.forEach(content => content.classList.remove('active'));

            // Add 'active' class to the clicked step and corresponding step content
            step.classList.add('active');
            document.getElementById('step-' + stepNum).classList.add('active');
        });
    });
});

// /menu section 
document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const menuItems = document.querySelectorAll('.menu-item');
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const checkoutButton = document.getElementById('checkout');
    
    menuItems.forEach(item => {
        const button = item.querySelector('.add-to-cart');
        button.addEventListener('click', () => {
            const itemName = item.getAttribute('data-name');
            const itemPrice = parseInt(item.getAttribute('data-price'), 10);
            addToCart(itemName, itemPrice);
        });
    });

    checkoutButton.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty.');
        } else {
            alert('Thank you for your purchase!');
            clearCart();
        }
    });

    function addToCart(name, price) {
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ name, price, quantity: 1 });
        }
        renderCart();
    }

    function renderCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = `${item.name} (₹${item.price} x ${item.quantity})`;
            cartItemsContainer.appendChild(listItem);
            total += item.price * item.quantity;
        });

        totalPriceElement.textContent = `Total: ₹${total}`;
    }

    function clearCart() {
        cart.length = 0;
        renderCart();
    }
});

// delivery option 
document.addEventListener('DOMContentLoaded', () => {
    const deliveryOption = document.getElementById('delivery-option');
    const pickupOption = document.getElementById('pickup-option');
    const deliveryDetails = document.getElementById('delivery-details');
    const form = document.getElementById('delivery-pickup-form');

    function toggleDeliveryDetails() {
        if (deliveryOption.checked) {
            deliveryDetails.style.display = 'block';
        } else {
            deliveryDetails.style.display = 'none';
        }
    }

    deliveryOption.addEventListener('change', toggleDeliveryDetails);
    pickupOption.addEventListener('change', toggleDeliveryDetails);

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const orderType = document.querySelector('input[name="order-type"]:checked').value;
        const address = deliveryOption.checked ? document.getElementById('address').value : 'Pickup';
        const time = document.getElementById('time').value;

        console.log('Order Type:', orderType);
        console.log('Address:', address);
        console.log('Preferred Time:', time);

        alert(`Order Type: ${orderType}\nAddress: ${address}\nPreferred Time: ${time}`);

    });

    toggleDeliveryDetails();
});

// payment option 
document.addEventListener('DOMContentLoaded', () => {
    const creditCardRadio = document.getElementById('credit-card');
    const paypalRadio = document.getElementById('paypal');
    const creditCardDetails = document.getElementById('credit-card-details');
    const paypalDetails = document.getElementById('paypal-details');
    const paymentForm = document.getElementById('payment-form');

    function togglePaymentDetails() {
        if (creditCardRadio.checked) {
            creditCardDetails.style.display = 'block';
            paypalDetails.style.display = 'none';
        } else {
            creditCardDetails.style.display = 'none';
            paypalDetails.style.display = 'block';
        }
    }

    creditCardRadio.addEventListener('change', togglePaymentDetails);
    paypalRadio.addEventListener('change', togglePaymentDetails);

    paymentForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
        let paymentDetails = `Payment Method: ${paymentMethod}\n`;

        if (creditCardRadio.checked) {
            const cardNumber = document.getElementById('card-number').value;
            const expiryDate = document.getElementById('expiry-date').value;
            const cvv = document.getElementById('cvv').value;
            paymentDetails += `Card Number: ${cardNumber}\nExpiry Date: ${expiryDate}\nCVV: ${cvv}`;
        } else {
            paymentDetails += `You will be redirected to PayPal to complete your purchase.`;
        }

        alert(paymentDetails);
    });

    // Initialize the form display
    togglePaymentDetails();
});

// order confirmation 
document.addEventListener('DOMContentLoaded', () => {
    const emailForm = document.getElementById('email-form');

    // Function to retrieve cart data (mocked for demonstration)
    function getCartData() {
        return {
            items: [
                { name: 'Pizza Margherita', quantity: 2 },
                { name: 'Garlic Bread', quantity: 1 },
                { name: 'Soft Drink', quantity: 3 }
            ],
            totalPrice: 950,
            estimatedDeliveryTime: '30 minutes'
        };
    }

    // Function to display cart data on the order confirmation page
    function displayOrderDetails() {
        const orderDetails = document.getElementById('order-details');
        const cartData = getCartData();

        let html = '';
        html += `<p><strong>Items Ordered:</strong></p>`;
        html += `<ul>`;
        cartData.items.forEach(item => {
            html += `<li>${item.name} x ${item.quantity}</li>`;
        });
        html += `</ul>`;
        html += `<p><strong>Total Price:</strong> ₹${cartData.totalPrice}</p>`;
        html += `<p><strong>Estimated Delivery Time:</strong> ${cartData.estimatedDeliveryTime}</p>`;

        orderDetails.innerHTML = html;
    }

    // Event listener for form submission
    emailForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const email = document.getElementById('email').value;

        if (validateEmail(email)) {
            alert(`A confirmation email has been sent to ${email}`);
        } else {
            alert('Please enter a valid email address.');
        }
    });

    // Function to validate email format
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    // Call the function to display order details when the page loads
    displayOrderDetails();
});

// map integration 
document.addEventListener('DOMContentLoaded', () => {
    // Sample locations data (Replace with your actual data)
    const locations = [
        { name: 'Location 1', lat: 40.7128, lng: -74.0060 }, // New York
        { name: 'Location 2', lat: 34.0522, lng: -118.2437 }, // Los Angeles
        { name: 'Location 3', lat: 41.8781, lng: -87.6298 }, // Chicago
    ];

    // Initialize map
    const map = L.map('map').setView([37.7749, -122.4194], 8); // Default center (San Francisco)

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add markers for each location
    locations.forEach(location => {
        const marker = L.marker([location.lat, location.lng]).addTo(map);
        marker.bindPopup(`<b>${location.name}</b>`).openPopup();
    });
});

// locations details  
document.addEventListener('DOMContentLoaded', () => {
    const locations = [
        {
            name: 'Location 1',
            address: 'Rajkot, Gujrat 360001',
            phone: '123-456-7890',
            hours: 'Mon-Fri: 9am-5pm',
            lat: 40.7128,
            lng: -74.0060
        },
        {
            name: 'Location 2',
            address: 'Halvad Road, Dhrangadhra, Gujrat 363310',
            phone: '123-456-7890',
            hours: 'Mon-Fri: 9am-5pm',
            lat: 40.7128,
            lng: -74.0060
        },
        {
            name: 'Location 3',
            address: 'Rajpar, Dhrangadhra, Gujrat 363310',
            phone: '123-456-7890',
            hours: 'Mon-Fri: 9am-5pm',
            lat: 40.7128,
            lng: -74.0060
        },
        {
            name: 'Location 4',
            address: 'Vadhavan Road, Surendranagar, Gujrat 363001',
            phone: '123-456-7890',
            hours: 'Mon-Fri: 9am-5pm',
            lat: 40.7128,
            lng: -74.0060
        },
    ];

    const searchBtn = document.getElementById('search-btn');
    const searchInput = document.getElementById('search-input');
    const locationCardsContainer = document.getElementById('location-cards');

    searchBtn.addEventListener('click', () => { 
        const searchValue = searchInput.value.trim().toLowerCase();
        const filteredLocations = locations.filter(location =>
            location.name.toLowerCase().includes(searchValue) ||
            location.address.toLowerCase().includes(searchValue)
        );
        displayLocations(filteredLocations);
    });

    function displayLocations(locations) {
        locationCardsContainer.innerHTML = '';

        locations.forEach(location => {
            const card = document.createElement('div');
            card.classList.add('location-card');
            card.innerHTML = `
                <h3>${location.name}</h3>
                <p><strong>Address:</strong> ${location.address}</p>
                <p><strong>Phone:</strong> ${location.phone}</p>
                <p><strong>Hours:</strong> ${location.hours}</p>
                <a href="https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}" class="directions-link" target="_blank">Get Directions</a>
            `;
            locationCardsContainer.appendChild(card);
        });
    }

    // Display all locations initially
    displayLocations(locations);
});


// contact form 
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');

    contactForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the default form submission
        
        
    });
});


// FAQ section 
document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq');

    faqItems.forEach(item => {
        const question = item.querySelector('.question');
        const answer = item.querySelector('.answer');

        question.addEventListener('click', () => {
            answer.classList.toggle('active');
        });
    });
});







