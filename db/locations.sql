CREATE TABLE address (
  id SERIAL PRIMARY KEY,
  socketIP TEXT,
  connectionIP TEXT,
  proxyIP text,
  visit TIMESTAMP
)
