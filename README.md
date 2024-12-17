# PowerPulse Fitness Equipment and Accessories Application

# Description

PowerPulse Fitness is a user-friendly web application designed for seamless shopping of fitness products. Built with React and Redux, it features a visually appealing interface that allows users to browse, filter, and sort products by category and price. It includes functionality for adding items to the cart, managing a wishlist, and completing the checkout process with multiple payment options. The homepage highlights key product categories, featured products, and user benefits, while a responsive product gallery enhances the shopping experience

## Features

1. **User Interface and Navigation**

- **Homepage:**
  - A welcoming homepage with a visually appealing hero section that highlights the brand and featured content.
  - A categories section that displays product categories with images or icons, allowing users to quickly explore products by category. Clicking a category redirects the user to the Products page with the selected category filter applied by default.
  - **Featured Products:** Highlights a selection of top or new products, each with an image, name, price, and a button to view more details. An "Explore More" button will redirect users to the full product listings page.
  - **Benefits Section:** Displays the key benefits of using your products, supported by engaging images and short descriptions.
  - **Image Gallery:** A mosaic-style gallery showcasing real-life images of healthy individuals using the products, creating a visual connection with potential customers.
  - **Header:** Includes a responsive navigation bar with a logo, site name, and links to key sections such as Home, Products, Cart, Wishlist, and more.
  - **Footer::** Contains important links to contact information, social media platforms, terms of service, privacy policy, and other relevant resources.

2. **Product and Cart Management:**

- **Product Listings:**
  - Displays all available products in a grid or list view, each with its image, name, price, and a button to view more details.
  - The design supports multiple images per product, with one featured image as default and others available for viewing on click.
- **Searching and Filtering:**
  - **Search Bar:** Enables users to search for products by name, with real-time search suggestions and results.
  - **Category Filters:** Users can select multiple categories at once. Products matching any of the selected categories will be shown. For example, selecting "Cardio" and "Strength" categories will display products from both categories.
  - **Price Range Filters:** Users can filter products based on their price range. The filter allows custom input for both minimum and maximum prices.
  - **Sorting Options:** Users can sort products by price in both ascending and descending order.
  - **Clear Filters Button:** A quick way to reset all applied filters and return to the default view of all products.

3. **Product Details Page:**

- **Product Information:**
  - Displays all relevant product details including:
    - Product name
    - Price
    - Stock availability
    - Detailed product description
    - Product images with a carousel or clickable thumbnails to view different images.
    - Product category
- **Add to Cart Button:**
  - Users can add the product to their cart directly from the details page.
  - If the product is already in the cart, adding it again increases the quantity, up to the maximum stock quantity available. Once the stock limit is reached, the "Add to Cart" button will be disabled to prevent exceeding stock.
4. **Cart Page:**

- **Cart Items:**
  - A detailed list of products added to the cart. For each product, it displays:
    - Product name, image, and price.
    - Quantity controls to increase or decrease the number of units. The quantity cannot exceed the available stock.
    - A button to remove the product from the cart, with a confirmation prompt before deletion.
- **Pricing Details:**
  - Displays the total price dynamically, adjusting as users change product quantities or remove items.
  - Includes breakdowns for taxes, shipping costs (if any), and a final total price.
- **Proceed to Checkout Button:**
  - Activated only if all items in the cart are in stock. If any item is out of stock, the button will be disabled.
  - Clicking this button redirects the user to the Checkout Page to finalize the order.
5. **Checkout Page:**

- **User Details Form:**
  - Collects user information including name, email, phone number, and delivery address.
  - Includes validation to ensure all fields are filled correctly before proceeding.
- **Payment Methods:**
  - **Cash on Delivery:** Users can select this option and place the order. The system will confirm the order, redirect the user to a success page, and automatically adjust the stock for the purchased items.
  - **Stripe Integration:** For online payments, users can select Stripe and be redirected to the secure Stripe payment gateway. After successful payment, the user is redirected to a success page and product stock is updated accordingly.
6. **Wishlist Management:**

- **User-specific Wishlist:**
  - Logged-in users can add products to their wishlist, and these are saved for each user individually. The wishlist persists across sessions and devices, allowing users to access it anytime.
  - **Real-time Updates:** Users can add or remove products from their wishlist with changes reflected instantly. The wishlist button toggles between "Add to Wishlist" and "Remove from Wishlist" based on the product’s presence in the wishlist.
7. **Admin Product Management:**

- **Product List Table:**
  - Admins have access to a table displaying all products with relevant details such as product name, price, stock quantity, and category. The table also includes action buttons to update or delete each product.
- **Creating a New Product:**
  - Admins can create new products by filling out a form that includes
    - Product name, price, stock quantity, category selection, and description.
    - Image upload functionality through Cloudinary integration or allowing direct URL input for the images.
- **Updating a Product:**
  - Admins can update existing products with prefilled data from the database. After updating, the changes are reflected in real-time on the frontend.
- **Deleting a Product:**
  - Admins can delete a product, with a confirmation prompt to prevent accidental deletion. Once confirmed, the product is removed from both the database and the UI.
8. **Error Handling:**

- **User-Friendly Messages:**
  - All error scenarios, such as invalid form inputs, failed payment attempts, or out-of-stock items, are handled gracefully with descriptive error messages shown to the user.
- **Validation:**
  - Frontend form validations are in place for user details, product additions, and checkout processes, ensuring that required fields are completed before submission.
9. **Responsive Design:**

- **Mobile-Friendly:**
  - The entire frontend is designed to be fully responsive, ensuring an optimized experience on all devices, including desktops, tablets, and mobile phones.
- **Adaptive UI:**
  - Layouts adjust dynamically based on screen size, ensuring intuitive navigation and interaction regardless of the device being used.

    

## Technology Stack

- **Programming Language:** TypeScript
- **Framework & Library:** React.js (with Hooks and Functional Components), Redux Toolkit (RTK)
- **UI Framework & Styling:** Tailwind CSS, raw CSS for specific hover effects
- **API Handling:** Axios, RTK Query for asynchronous API calls
- **Form Handling & Validation:** React Hook Form, Zod for validation schema
- **Routing:** React Router
- **Authentication:** JSON Web Tokens (JWT), with Redux for state persistence
- **Persistence:** Redux Persist for saving authenticated user data and wishlist
- **Image Handling:** Cloudinary (for image management)
- **Deployment:** Deployed on Vercel

## Installation and Setup

1. Clone the repository:

```
https://github.com/tonoy3125/PowerPulseFitness-Equipment-and-Accessories-Frontend
```

2. Install dependencies:

```
cd powerPulsefitness-equipment-and-accessories-frontend
npm install
```

4. Start the server:

```
npm run dev
```

5. Access the application in your browser at `http://localhost:5173 || http://localhost:5174`

## Usage

- Upon accessing the homepage, users are welcomed by a visually striking hero section showcasing the brand and its key offerings. As they scroll down, they’ll find a category section with images or icons that let them quickly explore products. Clicking on a category takes them to the products page with the chosen filter applied.

- Featured products highlight popular items, showing images, names, and prices with a "View More" button. An "Explore More" option leads to the full product list. The benefits section outlines key product advantages, while an image gallery shows real-life use, creating a personal connection.

- Navigation is simple with a responsive header featuring links to Home, Products, Cart, and Wishlist, and a footer with key links like contact info and terms of service.

- On the products page, users can view items in a grid or list format, each showing name, price, and images. They can search using a bar with real-time suggestions and filter by category or price range. Users can input custom price ranges and sort items by price. A "Clear Filters" button resets all selections.

- Clicking a product shows detailed info such as stock, description, and images. Users can add items to the cart or increase quantities if available. The cart page displays selected items, with options to adjust quantities or remove products. Pricing updates automatically, reflecting taxes and shipping. The checkout button stays active only when all items are in stock, redirecting to the final checkout process, where users fill in their details and choose between Cash on Delivery or Stripe for payment.

- Wishlist management allows users to easily add or remove items, with real-time updates. Wishlists persist across sessions, and buttons toggle based on product status.

- Admins manage products via a dashboard, where they can add, edit, or delete items. A table view lists products with options to update or remove them, ensuring smooth product management and user experience.
