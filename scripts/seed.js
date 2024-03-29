const { db } = require('@vercel/postgres');
const bcrypt = require('bcrypt');


async function seedDonations(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const createTable = await client.sql`
    DROP TABLE donations;
    CREATE TABLE IF NOT EXISTS donations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email VARCHAR(255),
    mount DECIMAL NOT NULL,
    status INT NOT NULL,
    flowOrder VARCHAR(255) NOT NULL UNIQUE,
    date DATE NOT NULL
  );`;

    console.log(`Created "donations" table`);

    return {
      createTable,
    };
  } catch (error) {
    console.error('Error seeding donations:', error);
    throw error;
  }
}

async function seedArticles(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const createTable = await client.sql`
    DROP TABLE articles; 
    CREATE TABLE IF NOT EXISTS articles (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    customer_id UUID NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    status VARCHAR(255) NOT NULL,
    year INT,
    date DATE NOT NULL
  );`;

    return {
      createTable
    };
  } catch (error) {
    console.error('Error seeding articles:', error);
    throw error;
  }
}

async function seedCustomers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "customers" table if it doesn't exist
    const createTable = await client.sql`
      DROP TABLE customers; 
      CREATE TABLE IF NOT EXISTS customers (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        image_url VARCHAR(255) NOT NULL
      );
    `;

    console.log(`Created "customers" table`);

    return {
      createTable,
    };
  } catch (error) {
    console.error('Error seeding customers:', error);
    throw error;
  }
}


async function main() {
  const client = await db.connect();

  await seedDonations(client);
  await seedCustomers(client);
  await seedArticles(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
