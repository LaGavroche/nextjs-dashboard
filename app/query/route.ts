import postgres from 'postgres';

// Configuration de la connexion à la base de données
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

// Fonction pour exécuter la requête SQL
async function listInvoices() {
  const data = await sql`
    SELECT invoices.amount, customers.name
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE invoices.amount = 666;
  `;

  return data;
}

// Fonction GET pour retourner les données
export async function GET() {
  try {
    // Retourne les données de la requête SQL
    return Response.json(await listInvoices());
  } catch (error) {
    // Gestion des erreurs
    return Response.json({ error }, { status: 500 });
  }
}