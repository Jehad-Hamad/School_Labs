#include "simpletronV2.h"

Simpletron::Simpletron() {
    // Initialize a 1D vector with size MEMORY_SIZE filled with zeros
    this->memory = vector<int>(MEMORY_SIZE, 0);

    // Initialize registers to zero
    this->accumulator         = 0;
    this->InstructionCounter  = 0;
    this->IndexRegister       = 0;
    this->InstructionRegister = 0;
    this->operationCode       = 0;
    this->operand             = 0;
    this->halted              = false; // new flag
}

// simple function to get just the instruction part (before semicolon)
string Simpletron::getInstruction(string line) {
    size_t pos = line.find(';');
    if (pos != string::npos) {
        return line.substr(0, pos); // return everything before the semicolon
    }
    return line; // no semicolon found, return the whole line
}

// function to load program from file or user input
void Simpletron::loadProgram(string fileName) {
    int    address = 0;
    string input;
    // Load program from file if filename is provided, else load from user input
    if (!fileName.empty()) {
        ifstream file("Programs/" + fileName);
        // Check if file opened successfully
        if (!file.is_open()) {
            fatalError("Could not open file " + fileName);
            return;
        }
        while (getline(file, input)) {
            string instruction = getInstruction(input);
            if (!instruction.empty()) {
                int value               = stoi(instruction);
                this->memory[address++] = value;
            }
        }
        file.close();

    } else {
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
                if (!checkOverflow(value)) {
                    this->memory[address++] = value;
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
void Simpletron::parseInstruction(int InstructionRegister) {
    if (InstructionRegister < 0) {
        InstructionRegister = -1 * InstructionRegister;                  // Make it positive for parsing
        this->operationCode = InstructionRegister / INSTRUCTION_DIVISOR; // Extract opcode (first 2 digits)
        this->operand       = InstructionRegister % OPERAND_MODULO;      // Extract operand (last 4 digits)
        this->operand       = -1 * this->operand;                        // Restore negative sign to operand
    } else {
        this->operationCode = InstructionRegister / INSTRUCTION_DIVISOR; // Extract opcode (first 2 digits)
        this->operand       = InstructionRegister % OPERAND_MODULO;      // Extract operand (last 4 digits)
    }
}

// function to execute the current instruction
void Simpletron::execute() {
    // Fetch the instruction
    this->InstructionRegister = this->memory[this->InstructionCounter];
    parseInstruction(InstructionRegister);

    switch (this->operationCode) {
    case 10: // READ
        READ(this->operand);
        this->InstructionCounter++;
        break;

    case 11: // WRITE
        WRITE(this->operand);
        this->InstructionCounter++;
        break;

    case 20: // LOAD
        LOAD(this->operand);
        this->InstructionCounter++;
        break;

    case 21: // LOADIM
        LOADIM(this->operand);
        this->InstructionCounter++;
        break;

    case 22: // LOADX
        LOADX(this->operand);
        this->InstructionCounter++;
        break;

    case 23: // LOADIDX
        LOADIDX();
        this->InstructionCounter++;
        break;

    case 25: // STORE
        STORE(this->operand);
        this->InstructionCounter++;
        break;

    case 26: // STOREIDX
        STOREIDX();
        this->InstructionCounter++;
        break;

    case 30: // ADD
        ADD(this->operand);
        this->InstructionCounter++;
        break;

    case 31: // ADDX
        ADDX();
        this->InstructionCounter++;
        break;

    case 32: // SUBTRACT
        SUBTRACT(this->operand);
        this->InstructionCounter++;
        break;

    case 33: // SUBTRACTX
        SUBTRACTX();
        this->InstructionCounter++;
        break;

    case 34: // DIVIDE
        DIVIDE(this->operand);
        this->InstructionCounter++;
        break;

    case 35: // DIVIDEX
        DIVIDEX();
        this->InstructionCounter++;
        break;

    case 36: // MULTIPLY
        MULTIPLY(this->operand);
        this->InstructionCounter++;
        break;

    case 37: // MULTIPLYX
        MULTIPLYX();
        this->InstructionCounter++;
        break;

    case 38: // INC
        INC();
        this->InstructionCounter++;
        break;

    case 39: // DEC
        DEC();
        this->InstructionCounter++;
        break;

    case 40: // BRANCH (always jump, no increment)
        this->InstructionCounter = this->operand;
        break;

    case 41: // BRANCHNEG
        if (this->accumulator < 0) {
            this->InstructionCounter = this->operand; // jump
        } else {
            this->InstructionCounter++; // fall-through
        }
        break;

    case 42: // BRANCHZERO
        if (this->accumulator == 0) {
            this->InstructionCounter = this->operand; // jump
        } else {
            this->InstructionCounter++; // fall-through
        }
        break;

    case 43: // SWAP
        SWAP();
        this->InstructionCounter++;
        break;

    case 45: // HALT
        HALT(this->operand);
        halted = true; // stop execution
        break;

    default:
        fatalError("Invalid operation code " + to_string(this->operationCode));
        break;
    }
}

void Simpletron::READ(int operand) {
    int input;
    cout << " ? ";
    cin >> input;
    if (checkOverflow(input)) {
        fatalError("Input out of bounds: " + to_string(input));
        return;
    }
    this->memory[operand] = input;
}
void Simpletron::WRITE(int operand) {
    cout << endl
         << "Output: " << this->memory[operand] << endl;
}

void Simpletron::LOAD(int operand) {
    this->accumulator = this->memory[operand];
}

void Simpletron::LOADIM(int operand) {
    this->accumulator = operand;
}

void Simpletron::LOADX(int operand) {
    this->IndexRegister = this->memory[operand];
}

void Simpletron::LOADIDX() {
    this->accumulator = this->memory[this->IndexRegister];
}

void Simpletron::STORE(int operand) {
    this->memory[operand] = this->accumulator;
}

void Simpletron::STOREIDX() {
    this->memory[this->IndexRegister] = this->accumulator;
}

void Simpletron::ADD(int operand) {
    this->accumulator += this->memory[operand];
}

void Simpletron::ADDX() {
    this->accumulator += this->memory[this->IndexRegister];
}

void Simpletron::SUBTRACT(int operand) {
    this->accumulator -= this->memory[operand];
}

void Simpletron::SUBTRACTX() {
    this->accumulator -= this->memory[this->IndexRegister];
}

void Simpletron::DIVIDE(int operand) {
    if (this->memory[operand] != 0) {
        this->accumulator /= this->memory[operand];
    } else {
        fatalError("Division by zero");
    }
}

void Simpletron::DIVIDEX() {
    if (this->memory[this->IndexRegister] != 0) {
        this->accumulator /= this->memory[this->IndexRegister];
    } else {
        cout << "Error: Division by zero" << endl;
        HALT(0);
        this->halted = true;
    }
}

void Simpletron::MULTIPLY(int operand) {
    this->accumulator *= this->memory[operand];
}

void Simpletron::MULTIPLYX() {
    this->accumulator *= this->memory[this->IndexRegister];
}

void Simpletron::INC() {
    this->IndexRegister++;
}

void Simpletron::DEC() {
    this->IndexRegister--;
}

void Simpletron::SWAP() {
    int temp            = this->accumulator;
    this->accumulator   = this->IndexRegister;
    this->IndexRegister = temp;
}

void Simpletron::HALT(int operand) {
    // Extract start and end page from operand
    int startPage = operand / PAGE_SIZE;
    int endPage   = operand % PAGE_SIZE;

    // Validate page range
    if (startPage < 0 || endPage > 99 || startPage > endPage) {
        cout << "Error: Invalid page range for HALT" << endl;
        return;
    }

    // Print the memory dump for the specified range of pages
    for (int i = startPage; i <= endPage; i++) {
        printMemoryPage(i);
    }
}

void Simpletron::printMemoryPage(int pageNumber) {
    printMemoryPageHeader(pageNumber);
    printRegisters();
    cout << "MEMORY" << endl
         << endl
         << "   ";
    printMemoryColumnHeaders();
    cout << endl;

    for (int row = 0; row < MEMORY_ROWS; ++row) {
        printMemoryRow(row, pageNumber);
    }
    cout << endl;
}

void Simpletron::printMemoryPageHeader(int pageNumber) {
    cout << endl;
    cout << "PAGE # " << setfill('0') << setw(2) << pageNumber << endl
         << endl;
    cout << "REGISTERS:" << endl
         << endl;
}

void Simpletron::printRegisters() {
    // Print accumulator with appropriate formatting
    if (this->accumulator > 0) {
        cout << "accumulator         " << "+" << setfill('0') << setw(6)
             << this->accumulator << endl;
    } else if (this->accumulator < 0) {
        cout << "accumulator         " << "-" << setfill('0') << setw(6)
             << -this->accumulator << endl;
    } else {
        cout << "accumulator          " << setfill('0') << setw(6) << this->accumulator
             << endl;
    }

    // Print other registers
    cout << "InstructionCounter   " << setfill('0') << setw(6) << this->InstructionCounter
         << endl;
    cout << "IndexRegister        " << setfill('0') << setw(6) << this->IndexRegister
         << endl;
    cout << "operationCode        " << setfill('0') << "    " << setw(2) << this->operationCode
         << endl;

    // Print operand with appropriate formatting
    if (this->operand > 0) {
        cout << "operand               " << "+" << setfill('0') << setw(4)
             << this->operand << endl
             << endl;
    } else if (this->operand < 0) {
        cout << "operand               " << "-" << setfill('0') << setw(4)
             << -this->operand << endl
             << endl;
    } else {
        cout << "operand              " << setfill('0') << "  " << setw(4) << this->operand << endl
             << endl;
    }
}

void Simpletron::printMemoryColumnHeaders() {
    for (int col = 0; col < MEMORY_COLUMNS; ++col) {
        cout << setw(7) << setfill(' ') << col << " ";
    }
}

void Simpletron::printMemoryRow(int row, int pageNumber) {
    // Print row header
    cout << setw(2) << row * MEMORY_COLUMNS << " ";

    // Print memory values in this row
    for (int col = 0; col < MEMORY_COLUMNS; ++col) {
        int value = this->memory[row * MEMORY_COLUMNS + col + pageNumber * PAGE_SIZE];
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

void Simpletron::fatalError(string errorMessage) {
    cout << endl
         << "*** FATAL ERROR ***" << endl;
    cout << "Error: " << errorMessage << endl;
    cout << "*** CORE DUMP ***" << endl;
    dumpCore();
    cout << "*** PROGRAM HALTED ***" << endl;
    this->halted = true;
}

bool Simpletron::checkOverflow(long result) {
    return (result < MIN_VALUE || result > MAX_VALUE);
}
bool Simpletron::checkMemoryBounds(int address) {
    return (address >= 0 && address < MEMORY_SIZE);
}
bool Simpletron::checkIndexRegisterOverflow(int result) {
    return (result < 0 || result > MEMORY_SIZE);
}
void Simpletron::dumpCore() {
    // Dump all memory pages (0) for complete core dump
    printMemoryPage(0);
}