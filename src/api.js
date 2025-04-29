const BASE_URL
  = process.env.NODE_ENV === 'production'
    ? 'https://ahj-helpdesk-backend-efdx.onrender.com/tickets'
    : 'http://localhost:3000/tickets';

/**
 * Получить список тикетов (без description)
 * GET /tickets?method=allTickets
 */
export async function getAllTickets() {
  const res = await fetch(`${BASE_URL}?method=allTickets`);
  if (!res.ok) throw new Error(`Error fetching tickets: ${res.status}`);
  return res.json();
}

/**
 * Получить полное описание одного тикета по ID
 * GET /tickets?method=ticketById&id=<id>
 */
export async function getTicketById(id) {
  const res = await fetch(`${BASE_URL}?method=ticketById&id=${id}`);
  if (!res.ok) throw new Error(`Ticket not found: ${id}`);
  return res.json();
}

/**
 * Создать новый тикет
 * POST /tickets?method=createTicket
 * Тело запроса: { name, description, status }
 */
export async function createTicket({ name, description, status }) {
  const res = await fetch(`${BASE_URL}?method=createTicket`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, description, status }),
  });
  if (!res.ok) throw new Error(`Error creating ticket: ${res.status}`);
  return res.json();
}

/**
 * Редактировать тикет по ID
 * POST /tickets?method=editTicket&id=<id>
 * Тело запроса: { name, description, status }
 */
export async function editTicket(id, { name, description, status }) {
  const res = await fetch(`${BASE_URL}?method=editTicket&id=${id}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, description, status }),
  });
  if (!res.ok) throw new Error(`Error editing ticket: ${res.status}`);
  return res.json();
}

/**
 * Удалить тикет по ID
 * POST /tickets?method=deleteTicket&id=<id>
 */
export async function deleteTicket(id) {
  const res = await fetch(`${BASE_URL}?method=deleteTicket&id=${id}`, {
    method: 'POST',
  });
  if (!res.ok) throw new Error(`Error deleting ticket: ${res.status}`);
  return res.json();
}
