import express from 'express';
import bodyParser from 'body-parser';
import { Database } from 'sqlite3';

const app = express();
const db = new Database(':memory:');

app.use(bodyParser.json());

// Customers API
app.get('/api/customers', (req, res) => {
  db.all('SELECT * FROM customers', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.get('/api/customers/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM customers WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(row);
  });
});

// Chat API
app.get('/api/customers/:id/chat', (req, res) => {
  const { id } = req.params;
  db.all('SELECT * FROM chat_history WHERE customer_id = ?', [id], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.post('/api/chat/message', (req, res) => {
  const { customer_id, message } = req.body;
  db.run('INSERT INTO chat_history (customer_id, message) VALUES (?, ?)', [customer_id, message], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID });
  });
});

// Products API
app.get('/api/products/:customerId', (req, res) => {
  const { customerId } = req.params;
  db.all('SELECT * FROM products WHERE customer_id = ?', [customerId], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Tickets API
app.get('/api/tickets', (req, res) => {
  db.all('SELECT * FROM tickets ORDER BY created_at DESC', [], (err, rows) => { 
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.get('/api/tickets/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM tickets WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: 'Ticket not found' });
      return;
    }
    res.json(row);
  });
});

app.post('/api/tickets', (req, res) => {
  const { subject, description, status, priority, channel, customer_id, agent_id } = req.body;

  if (!subject || !customer_id) {
    return res.status(400).json({ error: 'Missing required fields: subject and customer_id' });
  }

  const query = `INSERT INTO tickets 
                   (subject, description, status, priority, channel, customer_id, agent_id)
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;
  
  const params = [
    subject,
    description || null, 
    status || 'Open',     
    priority || 'Medium', 
    channel || null,
    customer_id,
    agent_id || null   
  ];

  db.run(query, params, function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({ id: this.lastID, message: 'Ticket created successfully' });
  });
});

app.put('/api/tickets/:id', (req, res) => {
  const { id } = req.params;
  const { subject, description, status, priority, channel, agent_id, zoho_desk_ticket_id } = req.body;

  if (!subject && !description && !status && !priority && !channel && agent_id === undefined && !zoho_desk_ticket_id) {
    return res.status(400).json({ error: 'No fields provided for update' });
  }

  const fieldsToUpdate: { key: string; value: any }[] = [];
  if (subject) fieldsToUpdate.push({ key: 'subject', value: subject });
  if (description !== undefined) fieldsToUpdate.push({ key: 'description', value: description });
  if (status) fieldsToUpdate.push({ key: 'status', value: status });
  if (priority) fieldsToUpdate.push({ key: 'priority', value: priority });
  if (channel) fieldsToUpdate.push({ key: 'channel', value: channel });
  if (agent_id !== undefined) fieldsToUpdate.push({ key: 'agent_id', value: agent_id });
  if (zoho_desk_ticket_id) fieldsToUpdate.push({ key: 'zoho_desk_ticket_id', value: zoho_desk_ticket_id });

  fieldsToUpdate.push({ key: 'updated_at', value: new Date().toISOString() });

  const setClauses = fieldsToUpdate.map(f => `${f.key} = ?`).join(', ');
  const params = fieldsToUpdate.map(f => f.value);
  params.push(id); 

  const query = `UPDATE tickets SET ${setClauses} WHERE id = ?`;

  db.run(query, params, function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: 'Ticket not found or no changes made' });
      return;
    }
    res.json({ message: `Ticket ${id} updated successfully` });
  });
});

// Identity Verification (Stub)
app.post('/api/verify-identity', (req, res) => {
  const { accountNumber, email, pin } = req.body;
  if (accountNumber && email && pin) {
    res.json({ verified: true });
  } else {
    res.status(400).json({ verified: false, error: 'Invalid verification details' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
