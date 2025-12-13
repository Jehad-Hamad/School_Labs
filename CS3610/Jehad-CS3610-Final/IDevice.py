from abc import ABC, abstractmethod

#Implementation - Interface
class IDevice(ABC):
    """Abstract class representing the Device implementation."""
    
    @abstractmethod
    def myInfo(self) -> str:
        """Abstract method to display what info you have"""
        pass
