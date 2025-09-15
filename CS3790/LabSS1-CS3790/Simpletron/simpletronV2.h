#ifndef MEMORY_H
#define MEMORY_H

#include <fstream>
#include <iomanip>
#include <iostream>
#include <string>
#include <vector>
using namespace std;

class Simpletron {

  private:
    // Constants for magic numbers
    static const int MEMORY_SIZE         = 10000;
    static const int PAGE_SIZE           = 100;
    static const int INSTRUCTION_DIVISOR = 10000;
    static const int OPERAND_MODULO      = 10000;
    static const int MIN_VALUE           = -999999;
    static const int MAX_VALUE           = 999999;
    static const int MEMORY_COLUMNS      = 10;
    static const int MEMORY_ROWS         = 10;

  public:
    int         accumulator;         // Accumulator register
    int         InstructionCounter;  // Instruction counter register
    int         IndexRegister;       // Index register
    int         InstructionRegister; // Instruction register
    int         operationCode;       // Operation code of the current instruction
    int         operand;             // Operand of the current instruction
    bool        halted;              // bool to stop execution
    vector<int> memory;              // 1D vector to represent memory

    // Public interface methods
    Simpletron();                           // Constructor
    void loadProgram(string fileName = ""); // Function to load program from file
    void execute();                         // Function to execute the current instruction

  private:
    void parseInstruction(int InstructionRegister); // Function to parse instruction into operation code and operand

    // SML Instruction implementations (private - called only by execute)
    void READ(int operand);  // 10: Read a word from the keyboard into a specific location in memory
    void WRITE(int operand); // 11: Write a word from a specific location in memory to the screen

    void LOAD(int operand);   // 20: Load a word from the memory location specified by the operand into the accumulator
    void LOADIM(int operand); // 21: Load the operand into the accumulator
    void LOADX(int operand);  // 22: Load word from the memory location specified by the operand into the index register
    void LOADIDX();           // 23: Load word from the memory location specified by index register into accumulator
    void STORE(int operand);  // 25: Store a word from the accumulator into the memory location specified by the operand
    void STOREIDX();          // 26: Store a word from the accumulator into a memory location specified by index register

    void ADD(int operand);      // 30: Add the word in memory whose address is the operand to the accumulator (ACC += MEM)
    void ADDX();                // 31: Add a word in memory whose address is stored in index register to the accumulator
    void SUBTRACT(int operand); // 32: Subtract a word whose address stored in the operand from the accumulator (ACC -= MEM)
    void SUBTRACTX();           // 33: Subtract a word whose address is stored in the index register from the accumulator
    void DIVIDE(int operand);   // 34: Divide the accumulator by a word whose address stored in the operand (ACC /= MEM)
    void DIVIDEX();             // 35: Divide the accumulator by a word whose address is stored in the index register
    void MULTIPLY(int operand); // 36: Multiply the accumulator by a word from a specific location in memory (ACC *= MEM)
    void MULTIPLYX();           // 37: Multiply the accumulator by a word whose address is stored in the index register
    void INC();                 // 38: Increase index register by 1
    void DEC();                 // 39: Decrease index register by 1

    // 40: Branch to a specific location in memory, location address is in operand (handled in execute switch)
    // 41: Branch to a specific location in memory if accumulator is negative (handled in execute switch)
    // 42: Branch to a specific location in memory if the accumulator is zero (handled in execute switch)
    void SWAP();            // 43: Swap contents of index register and accumulator
    void HALT(int operand); // 45: Halt program, dump register values and a range of pages

    // Helper methods for HALT functionality
    void printRegisters();
    void printMemoryPage(int pageNumber);
    void printMemoryPageHeader(int pageNumber);
    void printMemoryColumnHeaders();
    void printMemoryRow(int row, int pageNumber);
};

#endif