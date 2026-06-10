// const themeToggleBtn = document.getElementById('theme-toggle');
// const htmlElement = document.documentElement;

// Check for saved theme preference in local storage
// const savedTheme = localStorage.getItem('theme') || 'light';
// htmlElement.setAttribute('data-theme', savedTheme);
// updateButtonText(savedTheme);

// themeToggleBtn.addEventListener('click', () => {
//     const currentTheme = htmlElement.getAttribute('data-theme');
//     let newTheme = 'light';

//     if (currentTheme === 'light') {
//         newTheme = 'dark';
//     }

//     htmlElement.setAttribute('data-theme', newTheme);
//     localStorage.setItem('theme', newTheme);
//     updateButtonText(newTheme);
// });

// function updateButtonText(theme) {
//     if (theme === 'dark') {
//         themeToggleBtn.textContent = '☀️ Light Mode';
//     } else {
//         themeToggleBtn.textContent = '🌙 Dark Mode';
//     }
// }


// const themeToggleBtn = document.getElementById('theme-toggle');
// const htmlElement = document.documentElement;

// // ---- THEME SWITCHER (Purana Code) ----
// const savedTheme = localStorage.getItem('theme') || 'light';
// htmlElement.setAttribute('data-theme', savedTheme);
// updateButtonText(savedTheme);

// themeToggleBtn.addEventListener('click', () => {
//     const currentTheme = htmlElement.getAttribute('data-theme');
//     let newTheme = currentTheme === 'light' ? 'dark' : 'light';
//     htmlElement.setAttribute('data-theme', newTheme);
//     localStorage.setItem('theme', newTheme);
//     updateButtonText(newTheme);
// });

// function updateButtonText(theme) {
//     themeToggleBtn.textContent = theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
// }

// // ---- DATABASE SE DATA LAANA (Naya Fetch API Code) ----
// const productsGrid = document.getElementById('products-grid');

// async function fetchProducts() {
//     try {
//         // Backend API se data maanga
//         const response = await fetch('http://localhost:5000/api/products');
//         const products = await response.json();

//         // Grid ko khali kiya
//         productsGrid.innerHTML = "";

//         if(products.length === 0) {
//             productsGrid.innerHTML = `<p style="text-align:center; grid-column: 1/-1;">Abhi dukan me koi item stock me nahi hai.</p>`;
//             return;
//         }

//         // Loop chalakar ek ek item ko design me fit kiya aur screen par dikhaya
//         products.forEach(item => {
//             const card = document.createElement('div');
//             card.className = 'product-card';
//             card.innerHTML = `
//                 <img src="${item.image || 'https://via.placeholder.com/300'}" alt="${item.name}" class="product-img">
//                 <div class="product-info">
//                     <h3>${item.name}</h3>
//                     <p class="price">₹${Number(item.price).toLocaleString('en-IN')}</p>
//                     <button class="buy-btn">Buy / View Details</button>
//                 </div>
//             `;
//             productsGrid.appendChild(card);
//         });
//     } catch (error) {
//         console.error("Data load nahi ho paya:", error);
//         productsGrid.innerHTML = `<p style="text-align:center; grid-column: 1/-1; color:red;">Backend Server closed hai ya connection error hai!</p>`;
//     }
// }

// // Page load hote hi function automatic chal jaye
// window.addEventListener('DOMContentLoaded', fetchProducts);

// Database se products fetch karke UI par dikhane ka function
// async function fetchProducts() {
//     try {
//         // Backend API se saare jewellery items mangwana
//         const response = await fetch('http://127.0.0.1:5000/api/products');
        
//         if (!response.ok) {
//             throw new Error('Database se data nahi mil paya');
//         }

//         const products = await response.json();

//         // HTML ke product-container div ko pakadna
//         const productContainer = document.querySelector('.product-container');
        
//         // Purana koi bhi data ho toh use saaf karna
//         productContainer.innerHTML = '';

//         if (products.length === 0) {
//             productContainer.innerHTML = `<p style="text-align:center; width:100%;">Abhi koi jewellery item live nahi hai!</p>`;
//             return;
//         }

//         // Ek-ek karke saare products ko screen par chhapna
//         products.forEach(product => {
//             const productCard = document.createElement('div');
//             productCard.className = 'product-card';

//             productCard.innerHTML = `
//                 <img src="${product.image}" alt="${product.name}" style="width:100%; height:auto; border-radius:8px;">
//                 <h3 style="margin: 10px 0 5px 0;">${product.name}</h3>
//                 <p style="color: #b59410; font-weight: bold; font-size: 1.1rem;">₹${Number(product.price).toLocaleString('en-IN')}</p>
//                 <span style="font-size: 0.85rem; color: gray; text-transform: uppercase;">${product.category || 'Jewellery'}</span>
//             `;

//             productContainer.appendChild(productCard);
//         });

//     } catch (error) {
//         console.error('Error fetching products:', error);
//         const productContainer = document.querySelector('.product-container');
//         if (productContainer) {
//             productContainer.innerHTML = `<p style="color:red; text-align:center; width:100%;">Products load karne me dikkat aayi. Kripya check karein ki server chalu hai ya nahi.</p>`;
//         }
//     }
// }

// // Jaise hi page poora load ho, automatic products fetch ho jayein
// window.addEventListener('DOMContentLoaded', fetchProducts);
// ==========================================
//   🚀 1. DATABASE SE PRODUCTS LAANE KA CODE
// ==========================================
async function fetchProducts() {
    try {
        const response = await fetch('https://jai-ambey-jewellers.onrender.com/api/products');
        
        if (!response.ok) {
            throw new Error('Database se data nahi mil paya');
        }

        const products = await response.json();
        const productContainer = document.querySelector('.product-container');
        
        if (productContainer) {
            productContainer.innerHTML = ''; // Purana static data saaf karna

            if (products.length === 0) {
                productContainer.innerHTML = `<p style="text-align:center; width:100%;">Abhi koi jewellery item live nahi hai!</p>`;
                return;
            }

            // Ek-ek karke products screen par dikhana
            products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';

                productCard.innerHTML = `
                    <img src="${product.image}" alt="${product.name}" style="width:100%; height:auto; border-radius:8px;">
                    <h3 style="margin: 10px 0 5px 0;">${product.name}</h3>
                    <p style="color: #b59410; font-weight: bold; font-size: 1.1rem;">₹${Number(product.price).toLocaleString('en-IN')}</p>
                    <span style="font-size: 0.85rem; color: gray; text-transform: uppercase;">${product.category || 'Jewellery'}</span>
                `;
                productContainer.appendChild(productCard);
            });
        }
    } catch (error) {
        console.error('Error fetching products:', error);
        const productContainer = document.querySelector('.product-container');
        if (productContainer) {
            productContainer.innerHTML = `<p style="color:red; text-align:center; width:100%;">Products load karne me dikkat aayi.</p>`;
        }
    }
}

// ==========================================
//   🌓 2. DARK MODE & BUTTONS KA LOGIC
// ==========================================
function initUIFeatures() {
    // --- Dark Mode Switcher ---
    const themeToggle = document.getElementById('theme-toggle'); // Agar aapke button ki id kuch aur hai toh change kar lena
    const currentTheme = localStorage.getItem('theme') || 'light';

    // Pehle se saved theme apply karna
    document.documentElement.setAttribute('data-theme', currentTheme);

    // Agar toggler button hai toh uska logic
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            let theme = document.documentElement.getAttribute('data-theme');
            if (theme === 'dark') {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    // --- Aapke Baki Buttons Ka Logic Yahan Add Kar Sakte Hain ---
    console.log("UI Buttons initialized successfully!");
}

// ==========================================
//   🔄 3. PAGE LOAD PAR DONO KO CHALANA
// ==========================================
window.addEventListener('DOMContentLoaded', () => {
    fetchProducts();   // Database se product layega
    initUIFeatures();  // Dark mode aur baaki buttons chalu karega
});


// ==========================================
// 🛒 DYNAMIC PRODUCTS + CART SYSTEM (NEECE COPY-PASTE KAREIN)
// ==========================================
let cart = [];

async function fetchProducts() {
    try {
        const response = await fetch('https://jai-ambey-jewellers.onrender.com/api/products');
        if (!response.ok) throw new Error('Database se data nahi mil paya');

        const products = await response.json();
        const productContainer = document.querySelector('.product-container');
        
        if (productContainer) {
            productContainer.innerHTML = ''; // Purana static text hatane ke liye

            if (products.length === 0) {
                productContainer.innerHTML = `<p style="text-align:center; width:100%;">Abhi koi jewellery item live nahi hai!</p>`;
                return;
            }

            products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                productCard.style = "border: 1px solid #ddd; padding: 15px; border-radius: 8px; text-align: center; background: var(--card-bg, #fff); box-shadow: 0 4px 6px rgba(0,0,0,0.05);";

                const productData = btoa(JSON.stringify(product));

                productCard.innerHTML = `
                    <img src="${product.image}" alt="${product.name}" style="width:100%; height:200px; object-fit:cover; border-radius:8px;">
                    <h3 style="margin: 10px 0 5px 0; font-size:1.2rem;">${product.name}</h3>
                    <p style="color: #b59410; font-weight: bold; font-size: 1.1rem; margin: 5px 0;">₹${Number(product.price).toLocaleString('en-IN')}</p>
                    <span style="font-size: 0.85rem; color: gray; text-transform: uppercase; display:block; margin-bottom:10px;">${product.category || 'Jewellery'}</span>
                    
                    <button class="add-to-cart-btn" data-product="${productData}" style="background: #b59410; color: white; border: none; padding: 8px 15px; border-radius: 5px; cursor: pointer; font-weight: bold; width: 100%;">
                        Add to Cart 🛒
                    </button>
                `;
                productContainer.appendChild(productCard);
            });

            setupCartButtons();
        }
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

function setupCartButtons() {
    const buttons = document.querySelectorAll('.add-to-cart-btn');
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            const encodedData = e.target.getAttribute('data-product');
            const product = JSON.parse(atob(encodedData));
            cart.push(product);
            alert(`🎉 ${product.name} ko aapki Cart me jodh diya gaya hai!`);
            console.log("Current Cart:", cart);
        });
    });
}

// Jaise hi page khule, database se products lekar aao
window.addEventListener('DOMContentLoaded', fetchProducts);

