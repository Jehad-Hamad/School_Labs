# CS3790 Assignment 2

**Name:** Jehad M Hamad  
**Assignment:** CS3790 Assignment 2

## Description

This program implements a multi-process prime number finder using the Sieve of Eratosthenes algorithm. The boss process divides a range of numbers among multiple worker processes, each finding prime numbers in their assigned range.

## Files

- `boss.cpp` - Main boss process that coordinates workers
- `worker.cpp` - Worker process that finds primes in assigned range
- `boss.h` - Header file for boss functions
- `worker.h` - Header file for worker functions
- `makefile` - Build configuration

## How to Run

1. Compile the program:

   ```bash
   make
   ```

2. Run the boss process (recommended):

   ```bash
   ./boss.out <number_of_workers> <range>
   ```

   Example:

   ```bash
   ./boss.out 4 100
   ```

3. Run the worker process directly:

   ```bash
   ./worker.out <start_range> <end_range> [optional_arg]
   ```

   Examples:

   ```bash
   # 3 arguments - saves to file
   ./worker.out 1 50

   # 4 arguments - prints to console
   ./worker.out 1 50 console
   ```

## Output

- **3 arguments**: Prime numbers are saved to files in the `Results/` directory
  - Each worker creates a file named `{start}to{end}.txt` containing the primes in its range
- **4 arguments**: Prime numbers are printed to the console
- The boss process reports when each worker completes its task
