ALGORITHIMS_DIR=Algorithims
VECBUILDER_DIR=VecBuilder
CC=g++
CC_FLAGS= -std=c++11 -Wall -Wextra -Werror -pedantic
all: main.cpp $(ALGORITHIMS_DIR)/algorithims.cpp $(VECBUILDER_DIR)/vecBuilder.cpp
	$(CC) $(CC_FLAGS) $^ -o a.out

run: 
	./a.out 

check: main.cpp $(ALGORITHIMS_DIR)/algorithims.cpp $(VECBUILDER_DIR)/vecBuilder.cpp
	cppcheck $^