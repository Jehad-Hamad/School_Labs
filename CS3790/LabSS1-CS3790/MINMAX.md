# MINMAX Program Documentation

## What This Program Does

The MINMAX program finds the smallest (minimum) and largest (maximum) values in an array of numbers. It reads a series of numbers from the user, stores them in memory, and then scans through all the values to determine the minimum and maximum elements.

## How It Works

### Algorithm Steps:
1. **Array Size Input**: Read the size of the array
2. **Validation**: Check if size is valid (positive number)
3. **Array Input**: Read each element and store in memory starting at address 60
4. **Initialize**: Set first element as both min and max
5. **Scan Array**: Compare each remaining element with current min/max
6. **Update**: Replace min/max if a smaller/larger value is found
7. **Output**: Display the final minimum and maximum values

### Detailed Program Flow:

```
Lines 1-4:   Read array size, validate it's positive
Lines 5-21:  Input loop - read each array element and store at addresses 60+
Lines 22-26: Setup for scanning - initialize pointers and end address
Lines 27-31: Initialize min and max with first array element
Lines 32-51: Main scanning loop - compare each element with current min/max
Lines 52-54: Output results and halt
```

### Memory Layout:
- **Address 60+**: Array elements stored sequentially
- **Address 9995**: Current array pointer during scanning
- **Address 9996**: Current minimum value
- **Address 9997**: Current maximum value  
- **Address 9998**: Array size
- **Address 9999**: Various counters and end address

## Sample Input/Output

### Example 1:
```
Input:
Array size: 5
Elements: 10, 3, 15, 7, 12

Execution:
- Store: [10, 3, 15, 7, 12] at addresses 60-64
- Initialize: min = 10, max = 10
- Check 3: min = 3 (new minimum), max = 10
- Check 15: min = 3, max = 15 (new maximum) 
- Check 7: min = 3, max = 15 (no change)
- Check 12: min = 3, max = 15 (no change)

Output:
3  (minimum)
15 (maximum)
```

### Example 2:
```
Input:
Array size: 4
Elements: -5, 8, -12, 3

Execution:
- Store: [-5, 8, -12, 3] at addresses 60-63
- Initialize: min = -5, max = -5
- Check 8: min = -5, max = 8 (new maximum)
- Check -12: min = -12 (new minimum), max = 8
- Check 3: min = -12, max = 8 (no change)

Output:
-12 (minimum)
8   (maximum)
```

## Expected Output Format

The program outputs two numbers:
1. **First number**: The minimum (smallest) value in the array
2. **Second number**: The maximum (largest) value in the array

## Edge Cases

- **Array size 0 or negative**: Program will halt early and show the invalid input in memory location 9998
- **Single element**: Both min and max will be the same value

