# usage: python3 - <thread.hoon   (run on the urbit host; prints the thread's result)
import sys, importlib.machinery, importlib.util
l = importlib.machinery.SourceFileLoader('uc', '/home/urbit/bin/urbit-code')
s = importlib.util.spec_from_loader('uc', l); uc = importlib.util.module_from_spec(s); l.exec_module(uc)
print(uc.run_thread(open(sys.argv[1]).read()))
