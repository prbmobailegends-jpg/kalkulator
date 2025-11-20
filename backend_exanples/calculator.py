# calculator.py - contoh OOP sederhana (CLI)
class Calculator:
    def __init__(self):
        self.current = 0.0

    def add(self, a, b): return a + b
    def sub(self, a, b): return a - b
    def mul(self, a, b): return a * b
    def div(self, a, b):
        if b == 0:
            raise ZeroDivisionError("Pembagian dengan nol")
        return a / b

def run_cli():
    calc = Calculator()
    print("Calculator CLI (ketik 'exit' untuk keluar)")
    while True:
        try:
            expr = input("Masukkan ekspresi (contoh: 2 + 3): ")
            if expr.strip().lower() == 'exit': break
            # simple parse
            parts = expr.split()
            if len(parts) != 3:
                print("Format: <angka> <operator> <angka>")
                continue
            a = float(parts[0]); op = parts[1]; b = float(parts[2])
            if op == '+': print(calc.add(a,b))
            elif op == '-': print(calc.sub(a,b))
            elif op == '*': print(calc.mul(a,b))
            elif op == '/': print(calc.div(a,b))
            else: print("Operator tidak dikenali")
        except Exception as e:
            print("Error:", e)

if __name__ == '__main__':
    run_cli()