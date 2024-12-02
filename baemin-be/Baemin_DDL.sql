create database baemin_db;
use baemin_db;

-- Create ENUM Types first
CREATE TYPE user_role AS ENUM ('BUYER', 'SELLER', 'ADMIN');
CREATE TYPE shop_category AS ENUM ('Restaurant', 'Bistro', 'Coffee', 'Dessert', 'Shop Online');
CREATE TYPE shop_label AS ENUM ('Food', 'Drink', 'Vege', 'Dessert', 'Noodles');
CREATE TYPE shop_location AS ENUM ('Ho Chi Minh', 'Ha Noi', 'Da Nang');
CREATE TYPE food_type AS ENUM ('combo', 'sale', 'rice chicken', 'bubble tea', 'none');
CREATE TYPE payment_status AS ENUM ('Unpaid', 'Paid');
CREATE TYPE transaction_status AS ENUM ('not started', 'in progress', 'complete');

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create Users Table
CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),  -- Use UUID as primary key and generate random UUID
    email VARCHAR(255) NOT NULL UNIQUE,
    phone_number VARCHAR(15) NOT NULL UNIQUE,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role user_role NOT NULL, 
    is_active BOOLEAN NOT NULL DEFAULT TRUE
);

-- Create Poster Table
CREATE TABLE poster (
    poster_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),  -- Use UUID
    poster_thumbnail VARCHAR(255),
    status BOOLEAN NOT NULL DEFAULT TRUE
);

-- Create Shop Table
CREATE TABLE shop (
    shop_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),  -- Use UUID
    shop_name VARCHAR(255) NOT NULL,
    shop_address VARCHAR(255),
    shop_thumbnail VARCHAR(255),
    category shop_category NOT NULL,  
    label shop_label NOT NULL,  
    location shop_location NOT NULL,  
    rating DOUBLE PRECISION,  
    open_time TIME,  
    close_time TIME,  
    price_start INT,
    price_end INT,
    is_open BOOLEAN NOT NULL DEFAULT TRUE,
    owner_id UUID
);

-- Create Food Table
CREATE TABLE food (
    food_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),  -- Use UUID
    food_name VARCHAR(255) NOT NULL,
    description TEXT,
    price INT NOT NULL,
    type food_type NOT NULL,
    food_thumbnail VARCHAR(255),  
    quantity INT NOT NULL,
    shop_id UUID,
    FOREIGN KEY (shop_id) REFERENCES shop(shop_id) ON DELETE CASCADE
);

-- Create CartItem Table
CREATE TABLE cartItem (
    cart_item_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),  -- Use UUID
    account_id UUID,
    food_id UUID,
    quantity INT NOT NULL,
    FOREIGN KEY (account_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Create Payment Table
CREATE TABLE payment (
    payment_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),  -- Use UUID
    delivery_address VARCHAR(255),
    message TEXT,
    total_cost INT NOT NULL,
    account_id UUID,
    status payment_status NOT NULL
);

-- Create Transaction Table
CREATE TABLE transaction (
    transaction_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),  -- Use UUID
    food_id UUID,
    food_name VARCHAR(255) NOT NULL,
    per_price INT NOT NULL,
    type food_type NOT NULL,
    food_thumbnail VARCHAR(255),  
    quantity INT NOT NULL,
    status transaction_status NOT NULL,
    shop_id UUID, --for navigate from cart
    payment_id UUID,
    FOREIGN KEY (payment_id) REFERENCES payment(payment_id) ON DELETE CASCADE
);
