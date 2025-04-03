CREATE TABLE customers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  contact_info TEXT
);

CREATE TABLE chat_history (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  customer_id INTEGER,
  message TEXT,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES customers(id)
);

CREATE TABLE products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  customer_id INTEGER,
  product_name TEXT,
  purchase_date DATETIME,
  FOREIGN KEY (customer_id) REFERENCES customers(id)
);

CREATE TABLE tickets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  subject TEXT NOT NULL,
  description TEXT, 
  status TEXT DEFAULT 'Open', 
  priority TEXT DEFAULT 'Medium', 
  channel TEXT, 
  customer_id INTEGER, 
  agent_id INTEGER, 
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  zoho_desk_ticket_id TEXT, 
  FOREIGN KEY (customer_id) REFERENCES customers(id)
  -- FOREIGN KEY (agent_id) REFERENCES agents(id) 
);
