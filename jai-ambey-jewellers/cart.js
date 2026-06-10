// ==========================================
// 🛒 JAI AMBEY JEWELLERS - LOCAL STORAGE CART
// ==========================================
async function loadLiveProductsFromDB() {
    try {
        const response = await fetch('https://jai-ambey-jewellers.onrender.com/api/products');
        if (!response.ok) return;

        const databaseProducts = await response.json();
        const mainContainer = document.querySelector('.product-container');
        
        if (mainContainer && databaseProducts.length > 0) {
            mainContainer.innerHTML = ''; 

            databaseProducts.forEach(prod => {
                const card = document.createElement('div');
                card.className = 'product-card';
                card.style = "border: 1px solid #ddd; padding: 15px; border-radius: 8px; text-align: center; background: var(--card-bg, #fff); box-shadow: 0 4px 6px rgba(0,0,0,0.05);";

                const base64Data = btoa(unescape(encodeURIComponent(JSON.stringify(prod))));

                card.innerHTML = `
                    <img src="${prod.image}" alt="${prod.name}" style="width:100%; height:200px; object-fit:cover; border-radius:8px;">
                    <h3 style="margin: 10px 0 5px 0; font-size:1.2rem;">${prod.name}</h3>
                    <p style="color: #b59410; font-weight: bold; font-size: 1.1rem; margin: 5px 0;">₹${Number(prod.price).toLocaleString('en-IN')}</p>
                    <span style="font-size: 0.85rem; color: gray; text-transform: uppercase; display:block; margin-bottom:10px;">${prod.category || 'Jewellery'}</span>
                    
                    <button class="live-add-cart-btn" data-item="${base64Data}" style="background: #b59410; color: white; border: none; padding: 8px 15px; border-radius: 5px; cursor: pointer; font-weight: bold; width: 100%;">
                        Add to Cart 🛒
                    </button>
                `;
                mainContainer.appendChild(card);
            });

            // Add to cart event listener
            document.querySelectorAll('.live-add-cart-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const encoded = e.target.getAttribute('data-item');
                    const parsedItem = JSON.parse(decodeURIComponent(escape(atob(encoded))));
                    
                    // LocalStorage se purani cart nikalna
                    let currentCart = JSON.parse(localStorage.getItem('myShopCart')) || [];
                    
                    // Naya item jodhna
                    currentCart.push(parsedItem);
                    
                    // Wapas store karna
                    localStorage.setItem('myShopCart', JSON.stringify(currentCart));
                    
                    alert(`🎉 ${parsedItem.name} ko aapki Cart me save kar diya gaya hai!`);
                });
            });
        }
    } catch (err) {
        console.error("Live products fetch nahi ho paye:", err);
    }
}

// Background load
setTimeout(loadLiveProductsFromDB, 1000);