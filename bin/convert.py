import sys
import itertools
import re

def strip_frontmatter(lines):
    return lines[lines.index('---\n', 1) + 1:]

def fixline(one, two):
    #print(one, '\n', two, '\n')
    if one == '' and two == '':
        return ''
    
    chordrx = re.compile(r'([\S]+)')
    chords = re.finditer(chordrx, one)
    if len(one) > len(two):
        two += ' ' * (len(one) - len(two))
    for chord in reversed(list(chords)):
        start = chord.start()
        formatted = f'[{chord.group()}]'
        two = two[:start] + formatted + two[start:]
    return two.strip()

def convert(f):
    lines = [line[:len(line)-1] for line in strip_frontmatter(f.readlines())]
    
    gen = (x for x in lines)
    
    res = []
    try:
        while True:
            res.append(fixline(next(gen), next(gen)))
    except StopIteration:
        pass
    return res
    

if __name__ == "__main__":
    with open(sys.argv[1]) as f:
        res = convert(f)
        print('\n'.join(res))