from FactoryZoo.IAnimalClass import IAnimal

class WhiteBear(IAnimal):  
    def __init__(self):
        self.name = "White bear"

    
    def say_something(self):
        return f"The {self.name} is roaring in the snow"