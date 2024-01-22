CREATE TABLE IF NOT EXISTS cart(
     cartNum INT NOT NULL AUTO_INCREMENT,
     id VARCHAR NOT NULL,
     prodNum NUMERIC NOT NULL,
     quantity NUMERIC NOT NULL,
     indate DATETIME NULL DEFAULT now(),
     PRIMARY KEY(cartNum)
     CONSTRAINT  fk_id FOREIGN KEY(id) REFERENCE user(id),
     CONSTRAINT  fk_prodNum FOREIGN KEY(prodNum) REFERENCE product(prodNum),
);
