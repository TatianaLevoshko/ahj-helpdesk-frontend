// ticket.js — логика фронтенда с вызовами API
import './style.css';
import { getAllTickets, getTicketById, createTicket, editTicket, deleteTicket } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
// DOM-элементы
  const addBtn = document.getElementById('add_btn');
  const addModal = document.getElementById('add_modal');
  const addForm = document.getElementById('add_form');
  const cancelBtn = document.getElementById('cancel_btn');
  const ticketList = document.getElementById('ticket_list');
  const confirmModal = document.getElementById('confirm_modal');
  const confirmDeleteBtn = document.getElementById('confirm_delete_btn');
  const cancelDeleteBtn = document.getElementById('cancel_delete_btn');

  let ticketIdToDelete = null;
  let editingTicketId = null;

  // Рендер списка тикетов с сервера
  async function renderTickets() {
    ticketList.innerHTML = '';
    const tickets = await getAllTickets();
    tickets.forEach((ticket) => {
      const li = document.createElement('li');
      li.className = 'ticket';
      li.dataset.id = ticket.id;

      li.innerHTML = `
      <div class="ticket-content">
        <div class="ticket-top">
          <input type="checkbox" class="ticket__checkbox" ${ticket.status ? 'checked' : ''}>
          <div class="ticket-header">
            <strong>${ticket.name}</strong>
            <span class="ticket-date">${new Date(ticket.created).toLocaleString()}</span>
          </div>
        </div>
        <p class="ticket-desc" style="display: none;"></p>
      </div>
      <div class="actions">
        <button class="btn edit_btn" data-id="${ticket.id}">✎</button>
        <button class="btn delete_btn" data-id="${ticket.id}">✖</button>
      </div>
    `;

      // Показать подробное описание (запрос к серверу)
      li.querySelector('.ticket-content').addEventListener('click', async (event) => {
        if (
          event.target.closest('.edit_btn')
          || event.target.closest('.delete_btn')
          || event.target.closest('input[type="checkbox"]')
        ) {
          return;
        }

        const descEl = li.querySelector('.ticket-desc');
        if (!descEl.textContent) {
          const full = await getTicketById(ticket.id);
          descEl.textContent = full.description;
        }
        descEl.style.display = descEl.style.display === 'none' ? 'block' : 'none';
      });

      // Смена статуса
      li.querySelector('.ticket__checkbox').addEventListener('change', async (e) => {
        await editTicket(ticket.id, { name: ticket.name, description: '', status: e.target.checked });
        renderTickets();
      });

      // Кнопка редактирования
      li.querySelector('.edit_btn').addEventListener('click', async (e) => {
        e.stopPropagation();
        const full = await getTicketById(ticket.id);
        editingTicketId = ticket.id;
        addForm.name.value = full.name;
        addForm.description.value = full.description;
        addModal.classList.add('show');
      });

      // Кнопка удаления
      li.querySelector('.delete_btn').addEventListener('click', (e) => {
        e.stopPropagation();
        ticketIdToDelete = ticket.id;
        confirmModal.classList.add('show');
      });

      ticketList.appendChild(li);
    });
  }

  // Открыть модалку создания
  addBtn.addEventListener('click', () => {
    editingTicketId = null;
    addForm.reset();
    addModal.classList.add('show');
  });
  cancelBtn.addEventListener('click', () => addModal.classList.remove('show'));

  // Сохранение нового или редактированного тикета
  addForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = addForm.name.value;
    const description = addForm.description.value;
    if (editingTicketId) {
      await editTicket(editingTicketId, { name, description, status: false });
    }
    else {
      await createTicket({ name, description, status: false });
    }
    addModal.classList.remove('show');
    renderTickets();
  });

  // Подтвердить удаление
  confirmDeleteBtn.addEventListener('click', async () => {
    await deleteTicket(ticketIdToDelete);
    confirmModal.classList.remove('show');
    renderTickets();
  });
  cancelDeleteBtn.addEventListener('click', () => confirmModal.classList.remove('show'));

  // Первый рендер
  renderTickets();
});
