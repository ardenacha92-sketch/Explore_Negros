/* ============================================================
   EXPLORE NEGROS — supabase.js
   Direct REST API client — no external library required
   ============================================================ */

const SUPABASE_URL      = 'https://iclyfhbouzrysrvlxbzx.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImljbHlmaGJvdXpyeXNydmx4Ynp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgzNjk3NzEsImV4cCI6MjEwMzk0NTc3MX0.I74MuUEbRaeQBlpRXxaXxb0fJ4YlquUcg3dgouQUitI';

const _HEADERS = {
  'apikey':        SUPABASE_ANON_KEY,
  'Authorization': 'Bearer ' + SUPABASE_ANON_KEY,
  'Content-Type':  'application/json',
  'Accept':        'application/json'
};

/**
 * window.DB — lightweight Supabase REST wrapper using native fetch.
 * No external JS library needed.
 */
window.DB = {

  /**
   * SELECT rows from a table.
   * @param {string} table  e.g. 'destinations'
   * @param {string} qs     PostgREST query string, e.g. 'status=eq.active&order=name.asc'
   */
  async select(table, qs) {
    const url = SUPABASE_URL + '/rest/v1/' + table + (qs ? '?' + qs : '');
    const res  = await fetch(url, { headers: _HEADERS });
    const body = await res.json();
    if (!res.ok) {
      throw new Error((body && (body.message || body.error)) || 'HTTP ' + res.status);
    }
    return body; // array of rows
  },

  /**
   * INSERT a single row into a table.
   * @param {string} table  e.g. 'visit_requests'
   * @param {object} data   Row object to insert
   */
  async insert(table, data) {
    const url = SUPABASE_URL + '/rest/v1/' + table;
    const res  = await fetch(url, {
      method:  'POST',
      headers: Object.assign({}, _HEADERS, { 'Prefer': 'return=minimal' }),
      body:    JSON.stringify(data)
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error((body && (body.message || body.error)) || 'HTTP ' + res.status);
    }
    return true;
  },

  /**
   * UPDATE rows in a table.
   * @param {string} table  e.g. 'visit_requests'
   * @param {string} qs     Query filter, e.g. 'id=eq.' + id
   * @param {object} data   Fields to update
   */
  async update(table, qs, data) {
    const url = SUPABASE_URL + '/rest/v1/' + table + (qs ? '?' + qs : '');
    const res  = await fetch(url, {
      method:  'PATCH',
      headers: Object.assign({}, _HEADERS, { 'Prefer': 'return=minimal' }),
      body:    JSON.stringify(data)
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error((body && (body.message || body.error)) || 'HTTP ' + res.status);
    }
    return true;
  }
};

console.log(
  '%c✅ Explore Negros — Supabase REST ready',
  'color:#16a34a;font-weight:bold;font-size:13px;'
);
