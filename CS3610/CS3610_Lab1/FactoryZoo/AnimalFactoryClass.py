from FactoryZoo.IAnimalClass import IAnimal
from FactoryZoo.ElephantClass import Elephant
from FactoryZoo.LionClass import Lion
from FactoryZoo.MooseClass import Moose
from FactoryZoo.PenguinClass import Penguin
from FactoryZoo.WhiteBearClass import WhiteBear
from FactoryZoo.GrizzlyBearClass import GrizzlyBear


class AnimalFactory:
    @staticmethod
    def createAnimal(objType: str) ->IAnimal: #A static method to get a concrete product
        try:
            if objType.lower()=='lion':
                return Lion()
            elif objType.lower()=='elephant':
                return Elephant()
            elif objType.lower()=='moose':
                return Moose()
            elif objType.lower()=='penguin':
                return Penguin()
            elif objType.lower()=='whitebear':
                return WhiteBear()
            elif objType.lower()=='grizzlybear':
                return GrizzlyBear()
            else:
                raise Exception(f"I can't make this animal {objType}")
        except Exception as _e:
            print(_e)
        return None
    