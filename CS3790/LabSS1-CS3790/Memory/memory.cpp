#include "memory.h"

#include <fstream>
#include <iomanip>
#include <iostream>
using namespace std;

Memory::Memory() {
    // Initialize a 1D vector with size 10000 filled with zeros
    memory = vector<int>(10000, 0);

    // Initialize registers to zero
    accumulator         = 0;
    InstructionCounter  = 0;
    IndexRegister       = 0;
    InstructionRegister = 0;
    operationCode       = 0;
    operand             = 0;
    halted              = false; // new flag
}

// function to load program from file or user input
void Memory::loadProgram(string fileName) {
    int address = 0;

    // Load program from file if filename is provided, else load from user input
    if (!fileName.empty()) {
        ifstream file(fileName);
        // Check if file opened successfully
        if (!file.is_open()) {
            cout << "Error: Could not open file " << fileName << endl;
            return;
        }

        int value;
        while (file >> value) {
            memory[address++] = value;
        }
        file.close();

    } else {
        string input;

        while (true) {
            cout << setfill('0') << setw(6) << address << " ? ";
            cin >> input;

            // Check if the user wants to execute the program
            if (input == "GO" || input == "go" || input == "Go") {
                break;
            }

            // Validate input is an integer within bounds
            while (true) {
                int value = stoi(input);
                if (value >= -999999 && value <= 999999) {
                    memory[address++] = value;
                    break;
                } else {
                    cout << endl;
                    cout << "The number you picked is out of bounds please try again";
                    cout << endl;
                    cout << setfill('0') << setw(6) << address << " ? ";
                    cin >> input;
                }
            }
        }
    }
}

// function to parse instruction into operation code and operand
void Memory::parseInstruction(int InstructionRegister) {
    int absIR     = abs(InstructionRegister); // handle negative instructions safely
    operationCode = absIR / 10000;            // Extract opcode (first 2 digits)
    operand       = absIR % 10000;            // Extract operand (last 4 digits)
}

// function to execute the current instruction
void Memory::executeInstruction() {
    // Fetch the instruction
    InstructionRegister = memory[InstructionCounter];
    parseInstruction(InstructionRegister);

    switch (operationCode) {
    case 10: // READ
        READ(operand);
        InstructionCounter++;
        break;

    case 11: // WRITE
        WRITE(operand);
        InstructionCounter++;
        break;

    case 20: // LOAD
        LOAD(operand);
        InstructionCounter++;
        break;

    case 21: // LOADIM
        LOADIM(operand);
        InstructionCounter++;
        break;

    case 22: // LOADX
        LOADX(operand);
        InstructionCounter++;
        break;

    case 23: // LOADIDX
        LOADIDX();
        InstructionCounter++;
        break;

    case 25: // STORE
        STORE(operand);
        InstructionCounter++;
        break;

    case 26: // STOREIDX
        STOREIDX();
        InstructionCounter++;
        break;

    case 30: // ADD
        ADD(operand);
        InstructionCounter++;
        break;

    case 31: // ADDX
        ADDX();
        InstructionCounter++;
        break;

    case 32: // SUBTRACT
        SUBTRACT(operand);
        InstructionCounter++;
        break;

    case 33: // SUBTRACTX
        SUBTRACTX();
        InstructionCounter++;
        break;

    case 34: // DIVIDE
        DIVIDE(operand);
        InstructionCounter++;
        break;

    case 35: // DIVIDEX
        DIVIDEX();
        InstructionCounter++;
        break;

    case 36: // MULTIPLY
        MULTIPLY(operand);
        InstructionCounter++;
        break;

    case 37: // MULTIPLYX
        MULTIPLYX();
        InstructionCounter++;
        break;

    case 38: // INC
        INC();
        InstructionCounter++;
        break;

    case 39: // DEC
        DEC();
        InstructionCounter++;
        break;

    case 40: // BRANCH (always jump, no increment)
        InstructionCounter = operand;
        break;

    case 41: // BRANCHNEG
        if (accumulator < 0) {
            InstructionCounter = operand; // jump
        } else {
            InstructionCounter++; // fall-through
        }
        break;

    case 42: // BRANCHZERO
        if (accumulator == 0) {
            InstructionCounter = operand; // jump
        } else {
            InstructionCounter++; // fall-through
        }
        break;

    case 43: // SWAP
        SWAP();
        InstructionCounter++;
        break;

    case 45: // HALT
        HALT(operand);
        halted = true; // stop execution
        break;

    default:
        cout << "Error: Invalid operation code " << operationCode << endl;
        HALT(0);
        halted = true;
        break;
    }
}

void Memory::READ(int operand) {
    int input;
    cout << " ? ";
    cin >> input;

    while (input < -999999 || input > 999999) {
        cout << "Out of bounds (-999999 to +999999). Try again: ";
        cin >> input;
    }

    memory[operand] = input;
}

void Memory::WRITE(int operand) {
    cout << "Output: " << memory[operand] << endl;
}

void Memory::LOAD(int operand) {
    accumulator = memory[operand];
}

void Memory::LOADIM(int operand) {
    accumulator = operand;
}

void Memory::LOADX(int operand) {
    IndexRegister = memory[operand];
}

void Memory::LOADIDX() {
    accumulator = memory[IndexRegister];
}

void Memory::STORE(int operand) {
    memory[operand] = accumulator;
}

void Memory::STOREIDX() {
    memory[IndexRegister] = accumulator;
}

void Memory::ADD(int operand) {
    accumulator += memory[operand];
}

void Memory::ADDX() {
    accumulator += memory[IndexRegister];
}

void Memory::SUBTRACT(int operand) {
    accumulator -= memory[operand];
}

void Memory::SUBTRACTX() {
    accumulator -= memory[IndexRegister];
}

void Memory::DIVIDE(int operand) {
    if (memory[operand] != 0) {
        accumulator /= memory[operand];
    } else {
        cout << "Error: Division by zero" << endl;
        HALT(0);
        halted = true;
    }
}

void Memory::DIVIDEX() {
    if (memory[IndexRegister] != 0) {
        accumulator /= memory[IndexRegister];
    } else {
        cout << "Error: Division by zero" << endl;
        HALT(0);
        halted = true;
    }
}

void Memory::MULTIPLY(int operand) {
    accumulator *= memory[operand];
}

void Memory::MULTIPLYX() {
    accumulator *= memory[IndexRegister];
}

void Memory::INC() {
    IndexRegister++;
}

void Memory::DEC() {
    IndexRegister--;
}

void Memory::SWAP() {
    int temp      = accumulator;
    accumulator   = IndexRegister;
    IndexRegister = temp;
}

void Memory::HALT(int operand) {

    // Extract start and end page from operand
    int startPage = operand / 100;
    int endPage   = operand % 100;

    // Validate page range
    if (startPage < 0 || endPage > 99 || startPage > endPage) {
        cout << "Error: Invalid page range for HALT" << endl;
        return;
    }
    // Print the memory dump for the specified range of pages
    for (int i = startPage; i <= endPage; i++) {
        // Print page header
        cout << endl;
        cout << "PAGE # " << setfill('0') << setw(2) << i << endl
             << endl;
        cout << "REGISTERS:" << endl
             << endl;

        // Print register values with appropriate formatting
        if (accumulator > 0) {
            cout << "accumulator         " << "+" << setfill('0') << setw(6)
                 << accumulator << endl;
        } else if (accumulator < 0) {
            cout << "accumulator         " << "-" << setfill('0') << setw(6)
                 << -accumulator << endl;
        } else {
            cout << "accumulator          " << setfill('0') << setw(6) << accumulator
                 << endl;
        }
        cout << "InstructionCounter   " << setfill('0') << setw(6) << InstructionCounter
             << endl;
        cout << "IndexRegister        " << setfill('0') << setw(6) << IndexRegister
             << endl;
        cout << "operationCode        " << setfill('0') << "    " << setw(2) << operationCode
             << endl;
        if (operand > 0) {
            cout << "operand              " << "+" << setfill('0') << setw(4)
                 << operand << endl
                 << endl;
        } else if (operand < 0) {
            cout << "operand              " << "-" << setfill('0') << setw(4)
                 << -operand << endl
                 << endl;
        } else {
            cout << "operand              " << setfill('0') << "  " << setw(4) << operand << endl
                 << endl;
        }
        cout << "MEMORY" << endl
             << endl
             << "   ";

        // print column headers
        for (int col = 0; col < 10; ++col) {
            cout << setw(7) << setfill(' ') << col << " ";
        }
        cout << endl;

        // Print memory contents in rows of 10
        for (int row = 0; row < 10; ++row) {
            // Print row header
            cout << setw(2) << row * 10 << " ";
            for (int col = 0; col < 10; ++col) {
                int value = memory[row * 10 + col + i * 100];
                if (value > 0) {
                    cout << "+" << setfill('0') << setw(6) << value << " ";
                } else if (value < 0) {
                    cout << "-" << setfill('0') << setw(6) << -value << " ";
                } else {
                    cout << " " << setfill('0') << setw(6) << value << " ";
                }
            }
            cout << endl;
        }
        cout << endl;
    }
}
