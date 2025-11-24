# CS3790 Lab 5

**Name:** Jehad M Hamad  
**Assignment:** CS3790 Lab 5

## Description

Implementation of the **Banker's Algorithm** for resource allocation and deadlock avoidance. The program safely allocates resources to processes while ensuring the system remains in a safe state. It validates each resource request and only grants it if the system can maintain a safe sequence where all processes can complete.

## Files

- `main.cpp` - Entry point that accepts filename as command-line argument
- `lib/lib.h` - Function declarations and documentation
- `lib/lib.cpp` - Implementation of Banker's Algorithm functions
- `makefile` - Build configuration
- `file.txt` - Sample input file with process data

## How to Run

1. Compile the program:

   ```
   make
   ```

2. Run the program with an input file:

   ```
   bin/main.out file.txt
   ```

## Input File Format

The input file should be formatted as follows:

**Line 1:** `n m` (number of processes and resources)

**Lines 2 to n+1:** MAX matrix (maximum claim for each process)

**Lines n+2 to 2n+1:** ALLOCATION matrix (currently allocated resources)

**Line 2n+2:** AVAILABLE vector (free resources in the system)

**Example:**

```
3 3
7 5 3
3 2 2
9 0 2
0 1 0
2 0 0
3 0 2
10 5 7
```

This example has 3 processes and 3 resource types with MAX claims, ALLOCATION, and AVAILABLE resources specified.

## Usage

1. The program loads process data from the input file (processes, resources, allocation, max claims)

2. It displays the current system state (MAX matrix, ALLOCATION matrix, NEED matrix, AVAILABLE resources)

3. Select a process to request resources from:

   - Enter a process number (0 to n-1)
   - Enter -1 to exit

4. Enter the resource request:

   - Provide space-separated integers for each resource type

5. The program validates the request:

   - Checks if request exceeds process's need
   - Checks if resources are available
   - Runs safety algorithm to verify the new state is safe

6. Request is granted or denied based on whether the system remains safe