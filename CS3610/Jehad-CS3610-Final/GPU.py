from IDevice import IDevice

## Concrete Implementor
class GPU(IDevice):
    def myInfo(self) -> str:
        info: str = "I AM A GPU\nThis is my info\n   16GB 256-Bit GDDR7 \n   Core Clock 2617 MHz \n   1 x HDMI 2.1b 3 x DisplayPort 2.1b \n   10752 Cores CUDA Cores \n   PCI Express 5.0 x16 \n"
        return info