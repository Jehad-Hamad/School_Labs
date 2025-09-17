# GCD Program Documentation

## What This Program Does

The GCD (Greatest Common Divisor) program finds the largest positive integer that divides both input numbers without leaving a remainder. It uses the Euclidean algorithm, which repeatedly subtracts the smaller number from the larger one until both numbers become equal.

## How It Works

### Algorithm Steps:
1. **Input Phase**: Read two numbers A and B
2. **Comparison Phase**: Compare A and B
3. **Subtraction Phase**: 
   - If A > B: Replace A with (A - B)
   - If A < B: Replace B with (B - A)
   - If A = B: We found the GCD!
4. **Repeat**: Go back to step 2 until A equals B

### Detailed Program Flow:

```
Lines 1-2:   Read input values A and B
Lines 3-6:   Load A, subtract B, check if result is 0 (equal) or negative (A < B)
Lines 7-8:   If A > B: Store (A-B) back in A, loop back
Lines 9-12:  If A < B: Store (B-A) back in B, loop back
Lines 13-14: When A = B, output the result and halt
```

## How to Use the Program

1. **Run the program**
2. **Enter the first number** 
3. **Enter the second number** 
4. **The program will automatically calculate and display the GCD**

## Sample Input/Output

### Example 1:
```
Input first number: 48
Input second number: 18

Execution:
48 - 18 = 30  (A becomes 30)
30 - 18 = 12  (A becomes 12)
18 - 12 = 6   (B becomes 6)
12 - 6 = 6    (A becomes 6)
6 = 6         (Equal! GCD found)

Output: 6
```

### Example 2:
```
Input first number: 15
Input second number: 25

Execution:
25 - 15 = 10  (B becomes 10)
15 - 10 = 5   (A becomes 5)
10 - 5 = 5    (B becomes 5)
5 = 5         (Equal! GCD found)

Output: 5
```



## Expected Output Format

The program will output a single number representing the GCD of the two input values.
