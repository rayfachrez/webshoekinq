document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      { id: 1, name: "Adidas Yeezy Boost", img: "1.jpg", price: 550000 },
      { id: 2, name: "Air Jordan 1 Mid", img: "2.jpg", price: 400000 },
      { id: 3, name: "Adidas Forum Low", img: "3.jpg", price: 500000 },
      { id: 4, name: "Puma Suede Classic", img: "4.jpg", price: 450000 },
      { id: 5, name: "New Balance Bembury", img: "5.jpg", price: 700000 },
      { id: 6, name: "Nike SB Dunk Low", img: "6.jpg", price: 450000 },
      { id: 7, name: "New Balance Teddy Santis ", img: "7.jpg", price: 450000 },
      { id: 8, name: "Claudie Pierlot", img: "8.jpg", price: 500000 },
      // { id: 9, name: "Adidas Naranja", img: "9.jpg", price: 600000 },
    ],
  }));

  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      // cek apakah ada barang yang sama di cart
      const cartItem = this.items.find((item) => item.id === newItem.id);

      // jika belum ada / cart masih kosong
      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        // jika barang sudah ada, cek apakah barang beda atau sama dengan yang ada di cart
        this.items = this.items.map((item) => {
          // jika barang berbeda
          if (item.id !== newItem.id) {
            return item;
          } else {
            // jika barang sudah ada, tambah quantity dan totalnya
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.price;
            return item;
          }
        });
      }
    },
    remove(id) {
      // ammbil item yang mau diremove berdasarkan id nya
      const cartItem = this.items.find((item) => item.id === id);

      // jika item lebih dari 2
      if (cartItem.quantity > 1) {
        // telusuri 1 1
        this.items = this.items.map((item) => {
          // jika bukan barang yan diklik
          if (item.id !== id) {
            return item;
          } else {
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price;
            return item;
          }
        });
      } else if (cartItem.quantity === 1) {
        // jka barangnya sisa 1
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem.price;
      }
    },
  });
});

// Form Validation
const checkoutButton = document.querySelector(".checkout-button");
checkoutButton.disabled = true;

const form = document.querySelector("#checkoutForm");

form.addEventListener("keyup", function () {
  for (let i = 0; i < form.elements.length; i++) {
    if (form.elements[i].value.length !== 0) {
      checkoutButton.classList.remove("disabled");
      checkoutButton.classList.add("disabled");
    } else {
      return false;
    }
  }
  checkoutButton.disabled = false;
  checkoutButton.classList.remove("disabled");
});

// kirim data ketika tombol checkout diklik
checkoutButton.addEventListener("click", function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  const data = new URLSearchParams(formData);
  const objData = Object.fromEntries(data);
  const message = formatMessage(objData);
  console.log(objData);
  window.open("https://wa.me/6285716086244"); // + encodeURIComponent(message));
});

// format pesan Whatsapp
// const formatMessage = (obj) => {
//   return `Data Customer
//   Nama: ${obj.nama}
//   Email: ${obj.Email}
//   No HP: ${obj.phone}
// Data Pesanan
//   ${JSON.parse(obj.item).map(
//     (item) => `${item.name} (${item.quantity} x ${rupian(item.total)}) \n`
//   )}
// TOTAL: ${rupiah(obj.total)}
// Terima Kasih.`;
// };

// Konversi ke Rupiah
const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};
