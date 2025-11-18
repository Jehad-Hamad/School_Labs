from FactoryZoo.IAnimalClass import IAnimal

class Penguin(IAnimal):  
    def __init__(self):
        self.name = "Penguin"
    
    def say_something(self):
        return f"The {self.name} is honking"