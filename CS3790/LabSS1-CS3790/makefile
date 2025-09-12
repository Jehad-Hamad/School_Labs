
CC=g++
CC_FLAGS= -std=c++11 -Wall -Wextra -Werror -pedantic 
all: main.cpp Memory/memory.cpp
	$(CC) $(CC_FLAGS) $^ -o a.out

run: 
	./a.out 

check: main.cpp
	cppcheck $^