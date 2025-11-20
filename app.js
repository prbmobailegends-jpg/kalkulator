// app.js - OOP style calculator logic + UI controls

class Calculator {
  constructor(displayElement) {
    this.displayElement = displayElement;
    this.clear();
  }

  clear() {
    this.current = '0';
    this.previous = null;
    this.operator = null;
    this.updateDisplay();
  }

  backspace() {
    if (this.current.length <= 1) {
      this.current = '0';
    } else {
      this.current = this.current.slice(0, -1);
    }
    this.updateDisplay();
  }

  appendNumber(num) {
    if (num === '.' && this.current.includes('.')) return;
    if (this.current === '0' && num !== '.') {
      this.current = num;
    } else {
      this.current = this.current + num;
    }
    this.updateDisplay();
  }

  chooseOperator(op) {
    // handle percent special case
    if (op === '%') {
      this.current = (parseFloat(this.current) / 100).toString();
      this.updateDisplay();
      return;
    }

    if (this.operator !== null) {
      this.compute();
    }
    this.operator = op;
    this.previous = this.current;
    this.current = '0';
  }

  compute() {
    if (this.operator === null || this.previous === null) return;
    const prev = parseFloat(this.previous);
    const curr = parseFloat(this.current);
    let result = 0;
    switch (this.operator) {
      case '+': result = prev + curr; break;
      case '-': result = prev - curr; break;
      case '*': result = prev * curr; break;
      case '/': result = curr === 0 ? NaN : prev / curr; break;
      default: result = curr;
    }
    // limit digits to avoid super long floats
    this.current = Number.isFinite(result) ? parseFloat(result.toFixed(10)).toString() : 'Error';
    this.operator = null;
    this.previous = null;
    this.updateDisplay();
  }

  updateDisplay() {
    this.displayElement.textContent = this.current;
  }
}

// UI wiring
document.addEventListener('DOMContentLoaded', () => {
  const display = document.getElementById('display');
  const calc = new Calculator(display);

  // click handlers
  document.querySelectorAll('.keys .btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const action = btn.dataset.action;
      const value = btn.dataset.value;

      if (action === 'clear') { calc.clear(); return; }
      if (action === 'back') { calc.backspace(); return; }
      if (action === 'equals') { calc.compute(); return; }

      if (btn.classList.contains('btn-op')) {
        calc.chooseOperator(value);
      } else {
        // number or dot or percent (handled as btn with value)
        calc.appendNumber(value);
      }
    });
  });

  // keyboard support
  window.addEventListener('keydown', (e) => {
    const k = e.key;
    if ((k >= '0' && k <= '9') || k === '.') {
      calc.appendNumber(k);
    } else if (k === 'Enter' || k === '=') {
      e.preventDefault();
      calc.compute();
    } else if (k === 'Backspace') {
      calc.backspace();
    } else if (k === 'Escape') {
      calc.clear();
    } else if (['+','-','*','/'].includes(k)) {
      calc.chooseOperator(k);
    } else if (k === '%') {
      calc.chooseOperator('%');
    }
  });

  // Report form handling (communicative)
  const reportForm = document.getElementById('reportForm');
  const reportStatus = document.getElementById('reportStatus');

  reportForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    reportStatus.textContent = 'Mengirim laporan...';
    const formData = new FormData(reportForm);
    const payload = Object.fromEntries(formData.entries());

    // Simulasi pengiriman: di aplikasi nyata kirim ke API backend.
    // Untuk demo kita lakukan 'mailto' fallback + local confirmation.
    try {
      // validate short
      if (!payload.message || payload.message.trim().length < 5) {
        reportStatus.textContent = 'Mohon isi deskripsi minimal 5 karakter.';
        return;
      }

      // Try POST to placeholder endpoint (user can replace URL)
      // For demo, we just wait a bit and show success.
      await new Promise(res => setTimeout(res, 600)); // simulate async

      reportStatus.textContent = 'Terima kasih — laporan telah diterima.';
      reportForm.reset();
    } catch (err) {
      reportStatus.textContent = 'Gagal mengirim laporan. Simpanlah di catatan Anda atau kirim lewat email.';
    }
  });
});