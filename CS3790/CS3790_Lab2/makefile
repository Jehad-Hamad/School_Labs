CC=g++
CC_FLAGS= -std=c++11 -Wall -Wextra -pedantic 
all: worker.cpp
	$(CC) $(CC_FLAGS) $^ -o worker.out

run: 
	./worker.out 

check: worker.cpp
	cppcheck $^