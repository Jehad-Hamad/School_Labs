#ifndef MEMORY_H
#define MEMORY_H

#include <string>
#include <vector>
using namespace std;

class Memory {

  public:
    int         accumulator;        // Accumulator register
    int         InstructionCounter; // Instruction counter register
    int         IndexRegister;      // Index register
    int         operationCode;      // Operation code of the current instruction
    int         operand;            // Operand of the current instruction
    vector<int> memory;             // 1D vector to represent memory

    Memory();                               // Private constructor for singleton pattern
    void loadProgram(string fileName = ""); // Function to load program from file
    void parseInstruction(int instruction); // Function to parse instruction into operation code and operand
    void executeInstruction();              // Function to execute the current instruction

    void READ(int operand);  // 10: Read a word from the keyboard into a specific location in memory
    void WRITE(int operand); // 11: Write a word from a specific location in memory to the screen

    void LOAD(int operand);           // 20: Load a word from the memory location specified by the operand into the accumulator
    void LOADIM(int operand);         // 21: Load the operand into the accumulator
    void LOADX(int operand);          // 22: Load word from the memory location specified by the operand into the index register
    void LOADIDX(int IndexRegister);  // 23: Load word from the memory location specified by index register into accumulator
    void STORE(int operand);          // 25: Store a word from the accumulator into the memory location specified by the operand
    void STOREIDX(int IndexRegister); // 26: Store a word from the accumulator into a memory location specified by index register

    void ADD(int operand);             // 30: Add the word in memory whose address is the operand to the accumulator (ACC += MEM)
    void ADDX(int IndexRegister);      // 31: Add a word in memory whose address is stored in index register to the accumulator
    void SUBTRACT(int operand);        // 32: Subtract a word whose address stored in the operand from the accumulator (ACC -= MEM)
    void SUBTRACTX(int IndexRegister); // 33: Subtract a word whose address is stored in the index register from the accumulator
    void DIVIDE(int operand);          // 34: Divide the accumulator by a word whose address stored in the operand (ACC /= MEM)
    void DIVIDEX(int IndexRegister);   // 35: Divide the accumulator by a word whose address is stored in the index register
    void MULTIPLY(int operand);        // 36: Multiply the accumulator by a word from a specific location in memory (ACC *= MEM)
    void MULTIPLYX(int IndexRegister); // 37: Multiply the accumulator by a word whose address is stored in the index register
    void INC();                        // 38: Increase index register by 1
    void DEC();                        // 39: Decrease index register by 1

    void BRANCH(int operand);                        // 40: Branch to a specific location in memory, location address is in operand
    void BRANCHNEG(int IndexRegister, int operand);  // 41: Branch to a specific location in memory if accumulator is negative
    void BRANCHZERO(int IndexRegister, int operand); // 42: Branch to a specific location in memory if the accumulator is zero
    void SWAP();                                     // 43: Swap contents of index register and accumulator
    void HALT(int operand);                          // 45: Halt program, dump register values and a range of pages
};

#endif