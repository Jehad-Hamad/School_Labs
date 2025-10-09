#include <stdio.h>
#include <sys/types.h>
#include <sys/wait.h>
#include <unistd.h>
#include <iostream>
#include <vector>
#include <string>
using namespace std;

int main(int argc, char* argv[]) {
    // Get worker amount and the range
    int n = stoi(argv[1]);
    int range = stoi(argv[2]);

    int added = (range / n) - 1;  // added amount each time
    int startRange = 1;           // startRange at 1
    vector<string> setOfRanges;   // vector to store ranges

    for (int i = 1; i <= n; i++) {
        int endRange = startRange + added;  // get endRange

        if (i == n) endRange = range;  // my last worker will always range as thier endRange
        setOfRanges.push_back(to_string(startRange));
        setOfRanges.push_back(to_string(endRange));

        startRange = endRange + 1;  // set startRange to my endRange + 1
    }

    for (int i = 0; i < n; i++) {
        int pid = fork();
        int status;
        if (pid == 0) {
            execl("./worker.out", argv[0], setOfRanges[2 * i].c_str(),
                  setOfRanges[2 * i + 1].c_str(), (char*)NULL);
            perror("execl failed");  // only runs if execl fails
        } else {
            wait(&status);
            printf("child %d done with code \n", i);
        }
    }

    return 0;
}
