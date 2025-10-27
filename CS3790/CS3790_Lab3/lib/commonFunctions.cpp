#include "commonFunctions.h"

string hasher(string password) {
    const char* salt = "$6$imsosalty$";
    char* hash = crypt(password.c_str(), salt);
    if (!hash) {
        perror("crypt");
        return "Error";
    }
    string cppString = hash;
    string hashed = cppString.substr(2);
    return hashed;
}

// Function to receive from chosen given
// Return vector of strings
vector<string> ReceiveMessage(const char* fifo) {
    int fd = open(fifo, O_RDONLY);
    char buf[256];
    int n = read(fd, buf, 256);
    close(fd);

    vector<string> result;
    if (n <= 0) return result;

    buf[n] = '\0';
    stringstream ss(buf);
    string token;
    while (ss >> token) result.push_back(token);
    return result;
}

// Function to send message to a chosen pipe
void SendMessage(const char* fifo, string msg) {
    int fd = open(fifo, O_WRONLY);
    write(fd, msg.c_str(), msg.size() + 1);
    close(fd);
}