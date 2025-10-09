#ifndef BOSS_H
#define BOSS_H

#include <stdio.h>
#include <sys/types.h>
#include <sys/wait.h>
#include <unistd.h>
#include <iostream>
#include <vector>
#include <string>
using namespace std;

vector<string> setRanges(int, int);
void startWorkers(int, char*[], vector<string>&);
#endif
