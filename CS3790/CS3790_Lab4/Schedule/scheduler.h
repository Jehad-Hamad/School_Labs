#ifndef SCHEDULER_H
#define SCHEDULER_H

#include <vector>
using namespace std;

// Stuct that stores my pid and symbol which will act as the job
struct Job {
    int pid;
    char symbol;
};

// Extern current index which will keep track of what job you will stop and start
extern int currentIndex;

// Extern jobs vector that will keep track of jobs
extern vector<Job> jobs;

// Functions
void addJob(int pid, char c);
void nextJob();

#endif