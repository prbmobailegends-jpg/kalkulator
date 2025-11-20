// Calculator.cs - contoh OOP C# (console)
using System;

public class Calculator {
    public double Add(double a,double b) => a + b;
    public double Sub(double a,double b) => a - b;
    public double Mul(double a,double b) => a * b;
    public double Div(double a,double b) {
        if (b == 0) throw new DivideByZeroException();
        return a / b;
    }
}

class Program {
    static void Main() {
        var calc = new Calculator();
        Console.WriteLine("Calculator CLI C# - format: <angka> <operator> <angka>");
        while(true) {
            Console.Write("> ");
            var line = Console.ReadLine();
            if (string.IsNullOrWhiteSpace(line)) continue;
            if (line.Trim().ToLower() == "exit") break;
            var parts = line.Split(' ');
            if (parts.Length != 3) { Console.WriteLine("Format salah"); continue; }
            double a = double.Parse(parts[0]);
            double b = double.Parse(parts[2]);
            var op = parts[1];
            try {
                double r = op switch {
                    "+" => calc.Add(a,b),
                    "-" => calc.Sub(a,b),
                    "*" => calc.Mul(a,b),
                    "/" => calc.Div(a,b),
                    _ => throw new Exception("Operator tidak dikenali")
                };
                Console.WriteLine(r);
            } catch(Exception ex) {
                Console.WriteLine("Error: " + ex.Message);
            }
        }
    }
}