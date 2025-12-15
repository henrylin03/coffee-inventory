#! /usr/bin/env node

require("dotenv").config();
const { Client } = require("pg");

const DATABASE_NAME = "coffee_inventory";

const CREATE_TABLES_QUERY = `
CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(280)
);


CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(100) NOT NULL,
    size_grams SMALLINT NOT NULL,
    roastery VARCHAR ( 100 ) NOT NULL,
    description VARCHAR ( 280 ),
    price_cents SMALLINT NOT NULL,
    stock_quantity NUMERIC NOT NULL,
    category_id INTEGER REFERENCES categories(id)
);
`;

const POPULATE_TABLES_QUERY = `
INSERT INTO categories (name, description)
VALUES
    ('Coffee beans', 'Whole coffee beans sourced from renowned coffee-growing regions around the world. Designed for customers who value freshness and prefer grinding their coffee just before brewing for maximum flavour and aroma.'),
    ('Ground coffee', 'Freshly roasted coffee beans that have been professionally ground for convenience. Ideal for drip machines, pour-over brewers, and French presses without sacrificing taste or quality.'),
    ('Coffee capsules', 'Single-serve coffee capsules compatible with popular pod machines. Each capsule is sealed to preserve freshness and delivers consistent flavour with minimal effort.');

INSERT INTO items (name, size_grams, roastery, description, price_cents, stock_quantity, category_id)
VALUES
    ('Ethiopian Yirgacheffe', 500, 'The Coffee Company', 'Known around the world as one of the best coffees, prized by connoisseurs for its winey cupping characteristics. This is a great treat in a plunger or through a filter.', 2300, 235, 1),
    ('Ethiopian Yirgacheffe', 1000, 'The Coffee Company', 'Known around the world as one of the best coffees, prized by connoisseurs for its winey cupping characteristics. This is a great treat in a plunger or through a filter.', 4600, 461, 1),
    ('Sacred Grounds Breeze Blend', 200, 'Sacred Grounds', 'Sacred Grounds Breezy Blend Ground Coffee specialty coffee. It is a dark roast ground coffee, freshly roasted. Dark chocolate, roasted almond. Do ya thing!', 1700, 172, 2),
    ('Campos Decaf Ground Coffee', 250, 'Campos', 'Making great coffee at home has never been easier! Our Campos Decaf coffee, ground in a resealable 250g bag is ready for you to brew at home. Decaf coffee is for coffee lovers. For people who enjoy the flavour and experience of coffee without the caffeine. We have always taken great pride in our decaf for exactly this reason.', 2200, 221, 2),
    ('Campos Superior Aluminium Coffee Capsules 10 pack', 55, 'Campos', 'If you have ordered a cup of Campos coffee in our famous green cup, then you've tasted our Campos Superior Blend. Campos Superior is our signature, quintessential specialty coffee cafe blend. It's what we've proudly served in our cafes since day in Newtown, 2002.', 800, 81, 3),
    ('Vittoria Nespresso Compatible Coffee Capsules 10 pack', 52, 'Vittoria', 'Vittoria Italian blend is a medium roast of 100% Arabica coffee beans from Central and South America with a balanced body and taste. Italian blend is a milder cup compared to darker roasts like Vittoria Espresso.', 475, 48, 3),
    ('Some uncategorised coffee', 250, 'Roastery X', 'Lorem ipsum blah blah', 2500, 15);
`;

async function main() {
	let databaseUrl = process.argv[2];
	if (typeof databaseUrl === "undefined" || databaseUrl === "") {
		console.warn(
			"Database URL not provided. Defaulting to development database.",
		);
		databaseUrl = `postgresql://${process.env.USER_NAME}:${process.env.PASSWORD}@localhost:5432/${DATABASE_NAME}`;
	}

	console.log("seeding...");
	const client = new Client({
		connectionString: databaseUrl,
	});

	await client.connect();
	await client.query(CREATE_TABLES_QUERY);
	await client.query(POPULATE_TABLES_QUERY);
	await client.end();
	console.log("done");
}

main();
