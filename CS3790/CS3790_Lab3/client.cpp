#include "client.h"

int main() {
    cout << "Enter username and hash of password please" << endl;
    cout << "Must be in the format of USER <username> <hashed_password>" << endl << endl;

    string logIn;
    getline(cin, logIn);

    SendMessage(fifo_c2s, logIn);

    vector<string> messages = ReceiveMessage(fifo_s2c);
    writeMessage(messages);
}

vector<string> ReceiveMessage(const char* fifo) {
    int fd = open(fifo, O_RDONLY);
    char buf[80];
    int n = read(fd, buf, 80);
    close(fd);

    vector<string> result;
    if (n <= 0) return result;

    buf[n] = '\0';
    stringstream ss(buf);
    string token;
    while (ss >> token) result.push_back(token);
    return result;
}

void SendMessage(const char* fifo, string msg) {
    int fd = open(fifo, O_WRONLY);
    write(fd, msg.c_str(), msg.size() + 1);
    close(fd);
}

void writeMessage(vector<string> messages) {
    string builtResponce;
    for (string message : messages) {
        if (message[0] != '-' && message[0] != '+') {
            builtResponce += " " + message;
        } else {
            builtResponce += "\n" + message;
        }
    }
    cout << builtResponce << endl;
}