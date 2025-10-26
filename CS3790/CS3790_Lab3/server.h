#ifndef SERVER_H
#define SERVER_H

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

vector<string> parse(string);
bool dbLookUp(string, string);

vector<string> ReceiveMessage(const char* fifo);
void SendMessage(const char* fifo, string msg);

#endif