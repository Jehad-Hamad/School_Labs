from abc import ABC, abstractmethod


class IAnimal(ABC):    
    '''The Animal Interface '''

    @staticmethod
    @abstractmethod
    
    def say_something()-> str: #A static interface method
        pass