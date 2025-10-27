#ifndef CLIENT_H
#define CLIENT_H

#include <cstdio>
#include <string>
#include <vector>
#include <iostream>
#include <sstream>
#include <string.h>
#include <fcntl.h>
#include <sys/stat.h>
#include <sys/types.h>
#include <unistd.h>
#include <fstream>

using namespace std;

const char* fifo_c2s = "fifo_c2s";  // Client sends, Server receives
const char* fifo_s2c = "fifo_s2c";  // Server sends, Client receives

void writeMessage(vector<string> messages);

#endif