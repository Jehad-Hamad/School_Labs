#include "server.h"

int main() {
    mkfifo(fifo_c2s, 0666);
    mkfifo(fifo_s2c, 0666);

    while (1) {
        vector<string> messages = ReceiveMessage(fifo_c2s);
        if ((messages.size() != 3) || (messages[0] != "USER")) {
            string message = "-INVALID ACCOUNT. \n +GOODBYE \n";
            SendMessage(fifo_s2c, message);
        } else {
            bool found = dbLookUp(messages[1], messages[2]);
            if (found) {
                string message = "+ACCOUNT VALID";
                SendMessage(fifo_s2c, message);
            } else {
                string message = "-INVALID ACCOUNT. \n +GOODBYE \n";
                SendMessage(fifo_s2c, message);
            }
        }
    }

    unlink(fifo_c2s);
    unlink(fifo_s2c);
}

bool dbLookUp(string userName, string hashedPassword) {
    ifstream inputFile;

    inputFile.open("passwords.txt");
    if (!inputFile.is_open()) {
        std::cerr << "Error opening the file!" << std::endl;
        return 0;
    }

    string line;
    bool stillLooking = true;
    bool authorized = false;
    while (stillLooking) {
        if (getline(inputFile, line)) {
            vector<string> parsedString = parse(line);
            if (parsedString[0] == userName && parsedString[1] == hashedPassword) {
                stillLooking = false;
                authorized = true;
            }
        } else {
            stillLooking = false;
        }
    }
    return authorized;
}

vector<string> parse(string line) {
    vector<string> parsed;
    string word = "";
    char delimiter = ' ';

    for (char c : line) {
        if (c != delimiter)
            word += c;
        else if (!word.empty()) {
            parsed.push_back(word);
            word = "";
        }
    }
    if (!word.empty()) {
        parsed.push_back(word);
    }
    return parsed;
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