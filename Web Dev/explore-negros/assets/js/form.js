/* ============================================================
   EXPLORE NEGROS — form.js
   Visit Request Form (form.html)
   ============================================================ */

document.addEventListener('DOMContentLoaded', initForm);

async function initForm() {
  /* ── Populate destination <select> ─────────────────────── */
  const destSelect = document.getElementById('destination-select');
  const destParam  = getParam('destination');

  if (destSelect) {
    let destinations;
    try {
      destinations = await window.DB.select('destinations', 'status=eq.active&order=name.asc');
    } catch (e) {
      console.warn('Could not load destinations for select, using fallback:', e);
      destinations = window.EN_DESTINATIONS;
    }

    destinations.forEach(d => {
      const opt = document.createElement('option');
      opt.value       = d.name;
      opt.textContent = d.name;
      if (destParam && d.name === destParam) opt.selected = true;
      destSelect.appendChild(opt);
    });
  }

  /* ── Set min date to today ──────────────────────────────── */
  const dateInput = document.getElementById('visit_date');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
  }

  /* ── Pre-fill visitors count if passed in URL ───────────── */
  const visitorsInput = document.getElementById('num_visitors');
  const visitorsParam = getParam('num_visitors');
  if (visitorsInput && visitorsParam) {
    const parsed = parseInt(visitorsParam, 10);
    if (!isNaN(parsed) && parsed >= 1) visitorsInput.value = parsed;
  }

  /* ── Form submission ───────────────────────────────────── */
  const form      = document.getElementById('visit-form');
  const alertOk   = document.getElementById('alert-success');
  const alertErr  = document.getElementById('alert-error');
  const errMsg    = document.getElementById('alert-error-msg');
  const submitBtn = document.getElementById('submit-btn');

  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();
    alertOk.classList.remove('visible');
    alertErr.classList.remove('visible');

    const payload = {
      full_name:    form.elements['full_name'].value.trim(),
      email:        form.elements['email'].value.trim(),
      destination:  destSelect ? destSelect.value : '',
      visit_date:   form.elements['visit_date'].value,
      num_visitors: parseInt(form.elements['num_visitors'].value, 10) || 1,
      message:      form.elements['message'].value.trim(),
      status:       'pending'
    };

    if (!payload.full_name || !payload.email || !payload.destination || !payload.visit_date) {
      if (errMsg) errMsg.textContent = 'Please fill in all required fields before submitting.';
      alertErr.classList.add('visible');
      alertErr.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      return;
    }

    submitBtn.disabled   = true;
    submitBtn.innerHTML  = '<span style="opacity:.7">Submitting…</span>';

    try {
      await window.DB.insert('visit_requests', payload);

      form.reset();
      alertOk.classList.add('visible');
      alertOk.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

      if (destParam && destSelect) {
        Array.from(destSelect.options).forEach(o => {
          o.selected = o.value === destParam;
        });
      }
    } catch (err) {
      console.error('Submission error:', err);
      if (errMsg) errMsg.textContent = 'Something went wrong. Please try again or contact us directly.';
      alertErr.classList.add('visible');
    } finally {
      submitBtn.disabled  = false;
      submitBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Submit Visit Request`;
    }
  });
}
