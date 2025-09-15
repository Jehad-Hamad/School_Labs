#ifndef STARTUP_H
#define STARTUP_H

#include "../Simpletron/simpletronV2.h"

#include <cctype>
#include <iostream>
#include <string>
using namespace std;

char startMessage();
void loadProgram(Simpletron *memory, char answer);
void executeProgram(Simpletron *memory);

#endif