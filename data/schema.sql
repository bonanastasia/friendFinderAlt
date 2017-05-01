CREATE DATABASE friendFinder;
USE friendFinder;

CREATE TABLE friends(
  id INTEGER(11) AUTO_INCREMENT NOT NULL,
  PRIMARY KEY(id),
  name VARCHAR(100),
  photo VARCHAR(1500),
  location VARCHAR(100),
  hobbies VARCHAR(500),
  scores VARCHAR(20);
  
);




INSERT INTO friends (name, photo, location, hobbies, scores)
VALUES ("Giselle", "http://img.usmagazine.com/article-leads-vertical-300/1251302895_gisele_bundchen_290x402.jpg", "New York City, NY", "Modeling -- Kick boxing -- Being with my kids","1,2,4,5,1,2,3,4,4,5");

INSERT INTO friends (name, photo, location, hobbies, scores)
VALUES ("Tom", "http://img.usmagazine.com/article-leads-vertical-300/1251126592_tom_brady_290x402.jpg", "Boston, MA", "Football -- Family -- Anything athletic", "3,2,1,2,4,2,3,5,2,1");

INSERT INTO friends (name, photo, location, hobbies, scores)
VALUES ("Spicer", "https://upload.wikimedia.org/wikipedia/commons/3/3f/Press_secretary_Sean_Spicer.jpg", "Washington DC", "I'm too busy for hobbies", "1,1,1,1,1,1,1,1,1,1");