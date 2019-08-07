import sys
import itertools
import re

def strip_frontmatter(lines):
    return lines[lines.index('---\n', 1) + 1:]

def fixline(chords, text):
    # Pad the text line to support chords coming after the text.
    # string multiplication equals '' for negative numbers
    text += ' ' * (len(chords) - len(text))

    # all groups of non-whitespace are taken as a chord
    chordrx = re.compile(r'([\S]+)')
    chords = re.finditer(chordrx, chords)

    # Reversing the list so that previous insertions do not affect the 
    # position of later matches. If we did not reverse, we would have to keep
    # track of the number of chars inserted in the text line.
    for chord in reversed(list(chords)):
        start = chord.start()
        text =  f'{text[:start]}[{chord.group()}]{text[start:]}'
    return text.strip()

def convert(f):
    lines = [line[:len(line) - 1] for line in strip_frontmatter(f.readlines())]
    res = [fixline(chords, text) for chords, text in zip(lines[::2], lines[1::2])]
    return res
    

if __name__ == "__main__":
    with open(sys.argv[1]) as f:
        res = convert(f)
        print('\n'.join(res))