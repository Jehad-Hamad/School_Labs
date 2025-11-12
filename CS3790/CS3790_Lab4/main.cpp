#include <iostream>
#include <sys/types.h>
#include <sys/wait.h>
#include <unistd.h>
#include <signal.h>
#include <stdlib.h>

#include "Schedule/scheduler.h"

using namespace std;

struct sigaction newhandler, oldhandler;
sigset_t sig;

/**
 * Next function that stops the last job and start the new job
 * Call next job in the middle since you pause the old job (current index)
 * Than increase current index (next job) than start that one
 */
void next(int code) {
    if (jobs.empty()) return;
    kill(jobs[currentIndex].pid, SIGSTOP);
    nextJob();
    kill(jobs[currentIndex].pid, SIGCONT);
}

/**
 * @brief "Loads" jobs form two ranges
 * @param start Starting char
 * @param end Ending char
 */
void loadJobs(char start, char end) {
    for (char c = start; c <= end; ++c) {
        int pid = fork();
        if (pid < 0) {
            cerr << "Fork failed for " << c << endl;
        } else if (pid == 0) {
            raise(SIGSTOP);  // stop child immediately
            char args[2] = {c, '\0'};
            if (execl("./bin/period.out", "./period", args, NULL) == -1) {
                perror("execl failed");
                exit(1);
            }
        } else {
            addJob(pid, c);
        }
    }
}

int main() {
    // Ask user for two ranges
    char start, end;
    cout << "Give a starting char like A: ";
    cin >> start;
    cout << "Give an ending  char like E: ";
    cin >> end;

    // Load the jobs
    loadJobs(start, end);

    // If no jobs. Quit
    if (jobs.empty()) {
        cerr << "No jobs loaded. Exiting." << endl;
        return 1;
    }

    // Start the first ever Job
    currentIndex = 0;
    kill(jobs[currentIndex].pid, SIGCONT);

    sigemptyset(&sig);
    newhandler.sa_handler = next;
    newhandler.sa_mask = sig;
    newhandler.sa_flags = 0;

    if (sigaction(SIGALRM, &newhandler, &oldhandler) == -1) {
        printf("1 - can't install signal handler \n");
        exit(-1);
    }
    while (1) {
        alarm(1);
        pause();
    }
    return 0;
}