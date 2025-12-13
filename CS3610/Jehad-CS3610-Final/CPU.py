from IDevice import IDevice

## Concrete Implementor
class CPU(IDevice):
    def myInfo(self) -> str:
        info = "I AM A CPU\nThis is my info\n   4-6 cores, \n   modest clock \n   speeds (around 2.5–3.5 GHz) \n"
        return info