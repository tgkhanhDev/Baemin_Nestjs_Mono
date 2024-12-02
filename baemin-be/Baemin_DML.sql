use baemin_db;

-- Users Table
INSERT INTO users (email, phone_number, first_name, last_name, password, role, is_active)
VALUES
('user1@example.com', '1234567890', 'John', 'Doe', 'password1', 'BUYER', TRUE),
('user2@example.com', '0987654321', 'Jane', 'Smith', 'password2', 'SELLER', TRUE),
('admin@example.com', '1122334455', 'Admin', 'User', 'adminpass', 'ADMIN', TRUE);

-- Poster Table
INSERT INTO poster (poster_thumbnail, status)
VALUES
('https://example.com/poster1.jpg', TRUE),
('https://example.com/poster2.jpg', TRUE),
('https://example.com/poster3.jpg', FALSE);

-- Shop Table
INSERT INTO shop (shop_name, shop_address, shop_thumbnail, category, label, location, rating, open_time, close_time, price_start, price_end, is_open, owner_id)
VALUES
('Cafe Good', '123 Main St', 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?q=80&w=1950&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'Coffee', 'Food', 'Ho Chi Minh', 4.5, '08:00', '22:00', 50, 150, TRUE, null),
('Spicy Corner', '456 Oak St', 'https://images.unsplash.com/photo-1493857671505-72967e2e2760?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'Restaurant', 'Food', 'Ha Noi', 4.7, '10:00', '23:00', 100, 300, TRUE, null),
('Dessert Kingdom', '789 Pine St', 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'Dessert', 'Dessert', 'Da Nang', 4.8, '09:00', '20:00', 30, 100, TRUE, null);

-- Food Table
INSERT INTO food (food_name, description, price, type, quantity, shop_id, food_thumbnail)
VALUES
('Latte', 'A rich and creamy coffee drink', 50, 'combo', 100, (SELECT shop_id FROM shop WHERE shop_name = 'Cafe Good' LIMIT 1), 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?q=80&w=1950&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
('Pho', 'Traditional Vietnamese noodle soup', 150, 'sale', 70,  (SELECT shop_id FROM shop WHERE shop_name = 'Spicy Corner' LIMIT 1), 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?q=80&w=1950&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
('Chocolate Cake', 'Delicious and moist chocolate cake', 80, 'none', 110, (SELECT shop_id FROM shop WHERE shop_name = 'Dessert Kingdom' LIMIT 1), 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?q=80&w=1950&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');

-- CartItem Table
INSERT INTO cartItem (account_id, food_id, quantity)
VALUES
((SELECT user_id FROM users WHERE email = 'user1@example.com' LIMIT 1), (SELECT food_id FROM food WHERE food_name = 'Latte' LIMIT 1), 2),
((SELECT user_id FROM users WHERE email = 'user2@example.com' LIMIT 1), (SELECT food_id FROM food WHERE food_name = 'Pho' LIMIT 1), 1),
((SELECT user_id FROM users WHERE email = 'user1@example.com' LIMIT 1), (SELECT food_id FROM food WHERE food_name = 'Chocolate Cake' LIMIT 1), 3);

-- Payment Table
INSERT INTO payment (delivery_address, message, total_cost, account_id , status)
VALUES
('123 Main St, Ho Chi Minh', 'Please deliver quickly', 200, (SELECT user_id FROM users WHERE email = 'user1@example.com' LIMIT 1) ,'Paid'),
('456 Oak St, Ha Noi', 'Add extra spice', 350, (SELECT user_id FROM users WHERE email = 'user2@example.com' LIMIT 1) , 'Unpaid'),
('789 Pine St, Da Nang', 'No delivery needed', 240, (SELECT user_id FROM users WHERE email = 'user2@example.com' LIMIT 1) ,'Paid');

-- Transaction Table
INSERT INTO transaction (food_id, food_name, per_price, type, food_thumbnail, quantity, status, shop_id, payment_id)
VALUES
(
    (SELECT food_id FROM food WHERE food_name = 'Latte' LIMIT 1),
    'Latte', 
    (SELECT price FROM food WHERE food_name = 'Latte' LIMIT 1), 
    (SELECT type FROM food WHERE food_name = 'Latte' LIMIT 1), 
    (SELECT food_thumbnail FROM food WHERE food_name = 'Latte' LIMIT 1), 
    2, 
    'complete', 
    (SELECT shop_id FROM shop WHERE shop_name = 'Cafe Good' LIMIT 1), 
    (SELECT payment_id FROM payment WHERE delivery_address = '123 Main St' LIMIT 1)
),
(
    (SELECT food_id FROM food WHERE food_name = 'Pho' LIMIT 1),
    'Pho', 
    (SELECT price FROM food WHERE food_name = 'Pho' LIMIT 1), 
    (SELECT type FROM food WHERE food_name = 'Pho' LIMIT 1), 
    (SELECT food_thumbnail FROM food WHERE food_name = 'Pho' LIMIT 1), 
    1, 
    'in progress', 
    (SELECT shop_id FROM shop WHERE shop_name = 'Spicy Corner' LIMIT 1), 
    (SELECT payment_id FROM payment WHERE delivery_address = '456 Oak St' LIMIT 1)
),
(
    (SELECT food_id FROM food WHERE food_name = 'Chocolate Cake' LIMIT 1),
    'Chocolate Cake', 
    (SELECT price FROM food WHERE food_name = 'Chocolate Cake' LIMIT 1), 
    (SELECT type FROM food WHERE food_name = 'Chocolate Cake' LIMIT 1), 
    (SELECT food_thumbnail FROM food WHERE food_name = 'Chocolate Cake' LIMIT 1), 
    3, 
    'not started', 
    (SELECT shop_id FROM shop WHERE shop_name = 'Dessert Kingdom' LIMIT 1), 
    (SELECT payment_id FROM payment WHERE delivery_address = '789 Pine St' LIMIT 1)
);
