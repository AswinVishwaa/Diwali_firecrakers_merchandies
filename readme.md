# Sree Agencies - Diwali Crackers E-Commerce Website

A modern, mobile-first, static e-commerce website for **Sree Agencies**, a seasonal fireworks retailer based in Vadamugam Vellode. This project provides a seamless and elegant user experience for customers to browse a complete price list, build an order, and send it directly to the business via WhatsApp.

The entire site is designed with a festive navy blue and gold Diwali theme, running entirely on the client-side with no backend or database required.

**Live Demo:** http://diwali-firecrakers-merchandies.vercel.app

---

## ✨ Key Features

- **Elegant Homepage:** A captivating landing page with a festive theme and clear call-to-action.
- **Dynamic Product Loading:** The entire product catalog is loaded dynamically from a simple `products.csv` file, making inventory updates incredibly easy.
- **Category Filtering:** Customers can easily filter the extensive product list by category.
- **Interactive Shopping Cart:** A smooth "Add to Cart" experience with a persistent floating cart button and a detailed modal view.
- **Professional Bill Generation:** Customers can generate a clean, high-contrast receipt of their order.
- **One-Click WhatsApp Ordering:** A "Send via WhatsApp" button pre-fills the entire order as a text message, making the ordering process frictionless.
- **Fully Responsive:** Designed with a mobile-first approach for a perfect experience on any device.

---

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript (ES6)
- **Styling:** Bootstrap 5 for the responsive grid and components.
- **Data Parsing:** [PapaParse](https://www.papaparse.com/) for reading and parsing the `products.csv` file.
- **Image Generation:** [html2canvas](https://html2canvas.hertzen.com/) for converting the HTML bill into a downloadable PNG image.

---

## 📁 Project Structure

The project is organized into a clean, easy-to-manage structure:


/
├── index.html          # The main homepage/landing page
├── shop.html           # The product listing and shopping page
├── home.css            # Styles for the homepage
├── style.css           # Styles for the shop page
├── script.js           # All JavaScript logic for the shop
├── products.csv        # The single source of truth for all product data
└── README.md           # This file


---

## 🚀 Getting Started

### Managing the Product List

The most important part of managing this website is the **`products.csv`** file.

- **To Add, Remove, or Edit Products:** Simply open the `products.csv` file in any spreadsheet program (like Excel or Google Sheets) or a text editor.
- **Required Columns:** The file must contain the following columns: `id`, `name`, `category`, `price`, `originalPrice`.
- After saving your changes to `products.csv`, commit and push the file to GitHub. Vercel will automatically redeploy the site with the updated inventory.

### Running Locally

Due to browser security policies (CORS), you cannot run this project by simply opening the `index.html` file. You must use a local server.

1.  **Using VS Code Live Server (Recommended):**
    - Install the "Live Server" extension in Visual Studio Code.
    - Open the project folder and click the "Go Live" button in the bottom-right corner.

2.  **Using Python:**
    - Navigate to the project directory in your terminal.
    - Run the command: `python -m http.server`
    - Open your browser and go to `http://localhost:8000`.

---

## Deployment

This project is optimized for deployment on **Vercel**.

1.  Push the entire project repository to GitHub.
2.  Sign up for a Vercel account and connect it to your GitHub.
3.  Import the GitHub repository into Vercel.
4.  Vercel will automatically detect the settings and deploy. No configuration is needed.

Future pushes to the `main` branch on GitHub will trigger automatic redeployments on Vercel.
