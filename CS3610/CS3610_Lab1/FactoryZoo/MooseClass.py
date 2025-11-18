from FactoryZoo.IAnimalClass import IAnimal

class Moose(IAnimal):  
    def __init__(self):
        self.name = "Moose"
    
    def say_something(self):
        return f"The {self.name} is neighing"