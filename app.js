const PRODUCTS=[
{id:1,name:'Lavanda & Vainilla',desc:'Dolça i relaxant · 180 g',price:16.90},
{id:2,name:'Brisa Marina',desc:'Fresca i neta · 180 g',price:15.90},
{id:3,name:'Galeta de Canyella',desc:'Càlida i especiada · 180 g',price:17.90},
{id:4,name:'Flor de Cotó',desc:'Suau i neta · 180 g',price:16.50},
{id:5,name:'Coco & Sal Marina',desc:'Tropical i fresca · 220 g',price:18.90},
{id:6,name:'Figa & Fusta',desc:'Intensa i acollidora · 220 g',price:19.50}
];
let cart=[];
const productsEl=document.getElementById('products'), cartEl=document.getElementById('cart'), overlay=document.getElementById('overlay'), cartItems=document.getElementById('cartItems'), cartCount=document.getElementById('cartCount'), cartTotal=document.getElementById('cartTotal'), toast=document.getElementById('toast');
const euro=n=>n.toLocaleString('ca-ES',{style:'currency',currency:'EUR'});
function renderProducts(){productsEl.innerHTML=PRODUCTS.map(p=>`<article class="product"><div class="product-img"><div class="mini-candle">FLAMA<br>BLAVA</div></div><div class="product-body"><h3>${p.name}</h3><p>${p.desc}</p><div class="product-row"><span class="price">${euro(p.price)}</span><button class="add" type="button" data-add="${p.id}">Afegir al carretó</button></div></div></article>`).join('');}
function renderCart(){if(!cart.length){cartItems.innerHTML='<div class="empty">El carretó està buit.<br><br>Tria una espelma i afegeix-la aquí 🕯️</div>';}else{cartItems.innerHTML=cart.map(i=>`<div class="cart-item"><div class="cart-thumb">FLAMA<br>BLAVA</div><div><h4>${i.product.name}</h4><small>${euro(i.product.price)}</small><div class="qty"><button type="button" data-minus="${i.product.id}">−</button><b>${i.qty}</b><button type="button" data-plus="${i.product.id}">+</button></div></div><button class="remove" type="button" data-remove="${i.product.id}">Eliminar</button></div>`).join('');}
const count=cart.reduce((s,i)=>s+i.qty,0);const total=cart.reduce((s,i)=>s+i.qty*i.product.price,0);cartCount.textContent=count;cartTotal.textContent=euro(total);}
function openCart(){cartEl.classList.add('open');overlay.classList.remove('hidden');cartEl.setAttribute('aria-hidden','false');}
function closeCart(){cartEl.classList.remove('open');overlay.classList.add('hidden');cartEl.setAttribute('aria-hidden','true');}
function add(id){const product=PRODUCTS.find(p=>p.id===id);const item=cart.find(i=>i.product.id===id);if(item)item.qty++;else cart.push({product,qty:1});renderCart();openCart();showToast(`${product.name} afegida al carretó`);}
function change(id,delta){const item=cart.find(i=>i.product.id===id);if(!item)return;item.qty+=delta;if(item.qty<=0)cart=cart.filter(i=>i.product.id!==id);renderCart();}
function remove(id){cart=cart.filter(i=>i.product.id!==id);renderCart();}
function showToast(msg){toast.textContent=msg;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),1600)}
productsEl.addEventListener('click',e=>{const b=e.target.closest('[data-add]');if(b)add(Number(b.dataset.add));});
cartItems.addEventListener('click',e=>{const p=e.target.closest('[data-plus]');const m=e.target.closest('[data-minus]');const r=e.target.closest('[data-remove]');if(p)change(Number(p.dataset.plus),1);if(m)change(Number(m.dataset.minus),-1);if(r)remove(Number(r.dataset.remove));});
document.getElementById('cartBtn').addEventListener('click',openCart);document.getElementById('closeCart').addEventListener('click',closeCart);overlay.addEventListener('click',closeCart);document.getElementById('checkout').addEventListener('click',()=>showToast('Checkout de demostració — el prepararem més endavant'));
renderProducts();renderCart();
