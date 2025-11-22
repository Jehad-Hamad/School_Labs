from IAnimalClass import IAnimal

class GrizzlyBear(IAnimal):  
    def __init__(self):
        self.name = "Grizzly bear"

    
    def say_something(self):
        return f"The {self.name} is roaring in the forest"