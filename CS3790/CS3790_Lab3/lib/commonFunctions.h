#ifndef COMMONFUNCTIONS_H
#define COMMONFUNCTIONS_H

#include <unistd.h>
#include <stdio.h>
#include <string.h>
#include <string>
#include <cstdio>
#include <vector>
#include <iostream>
#include <sstream>
#include <fcntl.h>
#include <sys/stat.h>
#include <sys/types.h>
#include <fstream>

using namespace std;

string hasher(string);
vector<string> ReceiveMessage(const char* fifo);
void SendMessage(const char* fifo, string msg);

#endif
