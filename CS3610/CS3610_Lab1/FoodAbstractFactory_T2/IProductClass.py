from abc import ABC, abstractmethod

class Iproduct(ABC):
    @abstractmethod
    def get_Price() -> int:
        pass

    @abstractmethod
    def get_Description() -> str:
        pass