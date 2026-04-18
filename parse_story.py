import re
from bs4 import BeautifulSoup

with open('module0Flow.html', 'r', encoding='utf-8') as f:
    soup = BeautifulSoup(f, 'html.parser')

steps = soup.find_all('div', class_='step')
for i, step in enumerate(steps):
    print(f"\n--- STEP {i} ---")
    for elem in step.find_all(['div', 'p', 'h3']):
        # only print if it has direct text or interesting classes
        classes = elem.get('class', [])
        if any(c in classes for c in ['ts-eyebrow', 'ts-headline', 'ts-sub', 'ts-question', 'sim-title', 'sim-desc', 'vp-quote', 'punchline', 'recap-desc']):
            print(f"[{','.join(classes)}] {elem.get_text(strip=True)}")
        elif elem.name == 'p':
            print(f"[p] {elem.get_text(strip=True)}")

