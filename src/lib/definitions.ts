// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
    displayName?: string;
    email?: string;
  };
  
  export type Customer = {
    id: string;
    name: string;
    email: string;
    image_url: string;
  };
  
  export type Invoice = {
    id: string;
    customer_id: string;
    amount: number;
    date: string;
    status: 'pending' | 'paid';
  };
  
  export type Revenue = {
    month: string;
    revenue: number;
  };
  

  export type LatestArticle = {
    id: string;
    name: string;
    title: string;
    email: string;
    year: string;
    status: string;
  };
  // The database returns a number for amount, but we later format it to a string with the formatCurrency function
  export type LatestArticleRaw = Omit<LatestArticle, 'amount'> & {
    amount: number;
  };
  
  export type ArticleTable = {
      id: string;
      customer_id: string;
      name: string;
      email: string;
      image_url: string;
      date: string;
      title: string;
      status: 'pending' | 'published';
  };
  
  export type CustomersTableType = {
    id: string;
    name: string;
    email: string;
    image_url: string;
    total_invoices: number;
    total_pending: number;
    total_paid: number;
  };
  
  export type FormattedCustomersTable = {
    id: string;
    name: string;
    email: string;
    image_url: string;
    total_invoices: number;
    total_pending: string;
    total_paid: string;
  };
  
  export type CustomerField = {
    id: string;
    name: string;
  };
  
  export type ArticleForm = {
      id: string;
      customer_id: string;
      title: string;
      content: string;
      year: number;
      status: 'pending' | 'active';
  };
  