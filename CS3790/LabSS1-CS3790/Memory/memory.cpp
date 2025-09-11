
#include "memory.h"

#include <fstream>
#include <iomanip>
#include <iostream>
using namespace std;

Memory::Memory() {
    // Initialize a 1D vector with size 10000 filled with zeros
    memory = vector<int>(10000, 0);

    // Initialize registers to zero
    accumulator        = 0;
    InstructionCounter = 0;
    IndexRegister      = 0;
    operationCode      = 0;
    operand            = 0;
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
                if ((value > -999999) && (value < 999999)) {
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
void Memory::parseInstruction(int instruction) {
    operationCode = instruction / 10000; // Extract operation code (first two digits)
    operand       = instruction % 10000; // Extract operand (last four digits)
}

// function to execute the current instruction
void Memory::executeInstruction() {
    // Fetch the instruction from memory
    int instruction = memory[InstructionCounter];
    parseInstruction(instruction);
    InstructionCounter++; // Increment instruction counter
    // Execute the instruction based on the operation code
    switch (operationCode) {
    case 10:
        READ(operand);
        break;
    case 11:
        WRITE(operand);
        break;
    case 20:
        LOAD(operand);
        break;
    case 21:
        LOADIM(operand);
        break;
    case 22:
        LOADX(operand);
        break;
    case 23:
        LOADIDX(IndexRegister);
        break;
    case 25:
        STORE(operand);
        break;
    case 26:
        STOREIDX(IndexRegister);
        break;
    case 30:
        ADD(operand);
        break;
    case 31:
        ADDX(IndexRegister);
        break;
    case 32:
        SUBTRACT(operand);
        break;
    case 33:
        SUBTRACTX(IndexRegister);
        break;
    case 34:
        DIVIDE(operand);
        break;
    case 35:
        DIVIDEX(IndexRegister);
        break;
    case 36:
        MULTIPLY(operand);
        break;
    case 37:
        MULTIPLYX(IndexRegister);
        break;
    case 38:
        INC();
        break;
    case 39:
        DEC();
        break;
    case 40:
        BRANCH(operand);
        break;
    case 41:
        BRANCHNEG(IndexRegister, operand);
        break;
    case 42:
        BRANCHZERO(IndexRegister, operand);
        break;
    case 43:
        SWAP();
        break;
    case 45:
        HALT(operand);
        break;
    default:
        cout << "Error: Invalid operation code " << operationCode << endl;
        break;
    }
}

void Memory::READ(int operand) {
    int input;
    cout << " ? ";
    cin >> input;
    cout << endl;
    memory[operand] = input;
}

void Memory::WRITE(int operand) {
    cout << memory[operand] << endl;
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

void Memory::LOADIDX(int IndexRegister) {
    accumulator = memory[IndexRegister];
}

void Memory::STORE(int operand) {
    memory[operand] = accumulator;
}

void Memory::STOREIDX(int IndexRegister) {
    memory[IndexRegister] = accumulator;
}

void Memory::ADD(int operand) {
    accumulator += memory[operand];
}

void Memory::ADDX(int IndexRegister) {
    accumulator += memory[IndexRegister];
}

void Memory::SUBTRACT(int operand) {
    accumulator -= memory[operand];
}

void Memory::SUBTRACTX(int IndexRegister) {
    accumulator -= memory[IndexRegister];
}

void Memory::DIVIDE(int operand) {
    if (memory[operand] != 0) {
        accumulator /= memory[operand];
    } else {
        cout << "Error: Division by zero" << endl;
        // Handle division by zero error appropriately
    }
}

void Memory::DIVIDEX(int IndexRegister) {
    if (memory[IndexRegister] != 0) {
        accumulator /= memory[IndexRegister];
    } else {
        cout << "Error: Division by zero" << endl;
        // Handle division by zero error appropriately
    }
}

void Memory::MULTIPLY(int operand) {
    accumulator *= memory[operand];
}

void Memory::MULTIPLYX(int IndexRegister) {
    accumulator *= memory[IndexRegister];
}

void Memory::INC() {
    accumulator++;
}

void Memory::DEC() {
    accumulator--;
}

void Memory::BRANCH(int operand) {
    InstructionCounter = operand;
}

void Memory::BRANCHNEG(int accumulator, int operand) {
    if (accumulator < 0) {
        InstructionCounter = operand;
    }
}

void Memory::BRANCHZERO(int accumulator, int operand) {
    if (accumulator == 0) {
        InstructionCounter = operand;
    }
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
