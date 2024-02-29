import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";
import {
  CustomerField,
  CustomersTableType,
  ArticleForm,
  ArticleTable,
  LatestArticleRaw,
  User,
  Revenue,
} from "./definitions";
import { formatCurrency } from "./utils";

export async function fetchLatestArticles() {
  noStore();
  try {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const data = await sql<LatestArticleRaw>`
      SELECT articles.title, articles.status, articles.year, customers.name, customers.email, articles.id
      FROM articles
      JOIN customers ON articles.customer_id = customers.id
      ORDER BY articles.date DESC
      LIMIT 5`;

    const latestArticles = data.rows.map((article) => ({
      ...article,
    }));
    return latestArticles;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch the latest invoices.");
  }
}

export async function fetchCardData() {
  noStore();
  try {
    const articleCountPromise = sql`SELECT 
      COUNT(CASE WHEN status = 'active' THEN 1 END) AS "active",
      COUNT(CASE WHEN status = 'pending' THEN 1 END) AS "pending",
      COUNT(*) AS "total"
      FROM articles`;

    const donationsCountPromise = sql`SELECT 
      SUM(mount) AS "total"
      FROM donations`;

    const data = await Promise.all([
      articleCountPromise,
      donationsCountPromise,
    ]);

    const numberOfPendingArticles = Number(data[0].rows[0].pending ?? "0");
    const numberOfPublishedArticles = Number(data[0].rows[0].active ?? "0");
    const totalDonation = Number(data[1].rows[0].total ?? "0");

    return {
      numberOfPendingArticles,
      numberOfPublishedArticles,
      totalDonation,
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch card data.");
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredArticles(
  query: string,
  currentPage: number
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const articles = await sql<ArticleTable>`
      SELECT
        articles.id,
        articles.title,
        articles.date,
        articles.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM articles
      JOIN customers ON articles.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        articles.title::text ILIKE ${`%${query}%`} OR
        articles.date::text ILIKE ${`%${query}%`} OR
        articles.status ILIKE ${`%${query}%`}
      ORDER BY articles.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return articles.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch articles.");
  }
}

export async function fetchArticlesPages(query: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM articles
    JOIN customers ON articles.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      articles.title::text ILIKE ${`%${query}%`} OR
      articles.date::text ILIKE ${`%${query}%`} OR
      articles.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of articles.");
  }
}

export async function fetchArticleById(id: string) {
  noStore();
  try {
    const data = await sql<ArticleForm>`
      SELECT
        articles.id,
        articles.customer_id,
        articles.title,
        articles.content,
        articles.year,
        articles.status
      FROM articles
      WHERE articles.id = ${id};
    `;

    const article = data.rows.map((article) => ({
      ...article,
    }));

    return article[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch article.");
  }
}

export async function fetchCustomers() {
  noStore();
  try {
    const data = await sql<CustomerField>`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `;

    const customers = data.rows;
    return customers;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch all customers.");
  }
}

export async function fetchFilteredCustomers(query: string) {
  noStore();
  try {
    const data = await sql<CustomersTableType>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC
	  `;

    const customers = data.rows.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch customer table.");
  }
}

export async function getUser(email: string) {
  noStore();
  try {
    const user = await sql`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export async function getAuthenticationPaypal() {
  try {
    const response = await fetch(
      "https://api-m.sandbox.paypal.com/v1/oauth2/token",
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${btoa(
            `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
          )}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "grant_type=client_credentials",
      }
    );

    if (!response.ok) {
      throw new Error("Error en la solicitud");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
}
