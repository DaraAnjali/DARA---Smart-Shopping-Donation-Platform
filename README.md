# DARA — Smart Shopping & Donation Platform 🛍️♻️

DARA is a full-stack e-commerce application built with the MERN stack. It offers users the ability to donate clothes through image uploads and receive discounts on purchases after donation approval. The platform promotes eco-friendly shopping by encouraging reuse and sustainability.

🌟 Features
-----------
- Product Browsing & Shopping Cart
- User Authentication (Signup/Login)
- Clothing Donation Upload
- Admin Approval of Donations
- Discount on Approved Donations
- Order Checkout
- Donation History Tracking
- Email Notification Support (optional)

🛠️ Tech Stack
--------------
Frontend:   React.js, Tailwind CSS  
Backend:    Node.js, Express.js  
Database:   MongoDB, Mongoose  
Others:     JWT, Cloudinary, dotenv

🚀 Getting Started (Run Locally)
-------------------------------
1. Clone the Repository:
   git clone https://github.com/DaraAnjali/DARA---Smart-Shopping-Donation-Platform.git
   cd DARA---Smart-Shopping-Donation-Platform

2. Install Dependencies:
   Server:
     cd server
     npm install
   Client:
     cd ../client
     npm install

3. Add Environment Variables:
   In the server/ folder, create a file named `.env` and add:

     PORT=5000
     MONGO_URI=mongodb+srv://daraanjali:yourpassword@cluster0.abcde.mongodb.net/dara_db?retryWrites=true&w=majority
     JWT_SECRET=dara_super_secure_secret_key
     CLOUDINARY_CLOUD_NAME=dara-cloud
     CLOUDINARY_API_KEY=123456789012345
     CLOUDINARY_API_SECRET=abcDEfghIJklMNOpQRstuVWxyz123456


   (Never push your `.env` file to GitHub)

4. Run the App:
   Server:
     cd server
     npm start
   Client:
     cd ../client
     npm start

📁 Folder Structure
-------------------
DARA/
├── client/          # React frontend
├── server/          # Express backend
│   ├── models/      # MongoDB Schemas
│   ├── routes/      # API Routes
│   ├── controllers/ # Business logic
│   ├── uploads/     # Uploaded donation images
├── .gitignore
├── README.md

🙌 Contribution Guidelines
--------------------------
We welcome contributions! Here's how:
1. Fork the repository
2. Create a branch (git checkout -b feature-name)
3. Make your changes
4. Commit and push (git commit -m "Added feature")
5. Create a Pull Request

📄 License
----------
This project is licensed under the MIT License.

💡 Project Purpose
------------------
DARA was built with a goal to:
- Support sustainable fashion
- Promote reuse of clothing
- Make e-commerce platforms more eco-conscious

✨ Developed By
---------------
Dara Anjali  
GitHub: https://github.com/DaraAnjali  


📬 Contact
----------
Have feedback or ideas? Reach out:
Email: daraanjali07@gmail.com

Screenshots
----------

<img width="1866" height="900" alt="Register" src="https://github.com/user-attachments/assets/a9fcfba2-7b5c-45b0-853d-337861e5387b" />
<img width="1864" height="915" alt="Log-in" src="https://github.com/user-attachments/assets/030a02ad-e0f7-4919-922a-16dbafbb8e77" />
<img width="1869" height="907" alt="Home-1" src="https://github.com/user-attachments/assets/e6392fac-9e36-46f4-ad00-691b8ad5cd8c" />
<img width="1864" height="900" alt="Home-2" src="https://github.com/user-attachments/assets/3eb6827b-a00e-469c-9cf5-61e78ddae704" />
<img width="1869" height="905" alt="Home-3" src="https://github.com/user-attachments/assets/917a6738-97af-4045-9da5-0f456bbb66d6" />
<img width="1861" height="900" alt="Home-4" src="https://github.com/user-attachments/assets/1ee9ab14-8dda-41f1-8d05-0ae2bfb90631" />
<img width="1861" height="897" alt="Shop-1" src="https://github.com/user-attachments/assets/c8742dcc-506d-4527-81f6-800e54273460" />
<img width="1871" height="895" alt="Shop-2" src="https://github.com/user-attachments/assets/d3027bed-563c-469e-a032-47003d4f945c" />
<img width="1865" height="912" alt="Donate" src="https://github.com/user-attachments/assets/776f8340-8d10-49f4-af03-f0333491964e" />
<img width="1863" height="907" alt="Cart" src="https://github.com/user-attachments/assets/b6ed1b13-7a53-4dfb-9d11-425c60de8789" />




