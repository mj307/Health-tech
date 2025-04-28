// src/api.js

export const API_BASE = '/api';

export async function getChats() {
  const res = await fetch(`${API_BASE}/chat`, { credentials: 'include' });
  return res.json();
}

export async function getChatById(id) {
  const res = await fetch(`${API_BASE}/chat/${id}`, { credentials: 'include' });
  return res.json();
}

export async function addMessage(chatId, text) {
  const res = await fetch(`${API_BASE}/chat/message`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chatId, text })
  });
  return res.json();
}

// POST /api/chat — create a new chat thread
export async function createChat(participants) {
  const res = await fetch(`${API_BASE}/chat`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ participants })
  });
  return res.json();
}
