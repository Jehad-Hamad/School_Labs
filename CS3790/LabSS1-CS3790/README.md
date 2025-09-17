Name: Jehad M Hamad
Assignment: CS3790 Assignment 1

# Simpletron V2 Simulator

## Overview

We are implmenting simpletron instuction architecture in a virtual machine.

## Building the Executable

### Prerequisites
- C++ compiler with C++11 support (g++ recommended)


### Build Commands

To compile the program:
```bash
make
```

To compile and run:
```bash
make run
```

To check code with cppcheck:
```bash
make check
```

The executable will be created as `a.out` in the project root directory.

## Running the Program

Execute the simulator:
```bash
./a.out
```

Upon startup, you'll see:
```
*** Welcome to Simpletron V2! ***
***
Do you have a file that contains your SML program (Y/N) ?
```

### Option 1: Load from File (Y)
- Enter 'Y' when prompted
- Provide the filename (files should be in the `Programs/` directory)
- Example: `divMult.sml`

### Option 2: Manual Entry (N)
- Enter 'N' when prompted
- Enter instructions one at a time at the prompts
- Type "GO" or "go" when finished to execute

## Input File Format

SML program files should be placed in the `Programs/` directory and follow this format:

### Basic Structure
```
INSTRUCTION; COMMENT
INSTRUCTION; COMMENT
...
HALT_INSTRUCTION; COMMENT
```

### Example Program (`divMult.sml`):
```
100020; READ A
100021; READ B
200020; LOAD A
340021; DIVIDE A/B
250022; STORE RESULT
110022; WRITE RESULT
200022; LOAD RESULT
360021; MULTIPLY RESULT * B
250023; STORE NEW RESULT
110023; WRITE NEW RESULT
450000; HALT
```

### File Format Rules:
1. **One instruction per line**
2. **6-digit instruction format**: `OOAAAA`
   - `OO`: 2-digit operation code
   - `AAAA`: 4-digit memory address/operand
3. **Comments** (optional): Everything after semicolon (`;`) is ignored
4. **Blank lines** are ignored
5. **Must end with HALT instruction** (`45XXXX`)



## Program Execution Example

Given the `divMult.sml` program:

1. **Runtime Input**: Program will prompt for two numbers (A and B)
2. **Execution**: 
   - Reads A and B
   - Calculates A/B and stores result
   - Outputs the division result
   - Multiplies result by B (should equal A if no remainder)
   - Outputs the final result
3. **Memory Dump**: Shows final state of registers and memory

### Expected Output:
```
*** Welcome to Simpletron V2! ***
***
Do you have a file that contains your SML program (Y/N) ? Y

FileName: divMult.sml

 ? 10
 ? 3
Output: 3
Output: 9

PAGE # 00

REGISTERS:
...
```


## Sample Programs

The `Programs/` directory contains example SML programs:
- `gcd.sml`: Greatest common divisor
- `minmax.sml`: Find minimum and maximum values

