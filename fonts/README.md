`BalooBhaijaan2.woff`: Baloo Bhaijaan 2 by Ek Type (SIL Open Font License 1.1, `BalooBhaijaan2-OFL.txt`),
from https://github.com/google/fonts/tree/main/ofl/baloobhaijaan2. It is the site's UI font: round and friendly
for children, with full Persian support. It is subset to Arabic script, Latin and punctuation (variable weight
400–800, ~83 KB):

    pyftsubset "BalooBhaijaan2[wght].ttf" --unicodes="U+0020-007E,U+00A0-00FF,U+0600-06FF,U+0750-077F,U+FB50-FDFF,U+FE70-FEFF,U+200C-200F,U+2010-2027,U+2030-203A,U+2066-2069,U+25CC" --layout-features='*' --flavor=woff --output-file=BalooBhaijaan2.woff

Letter-learning text (`--font-letters` in css/style.css) stays in a Naskh face, the shape children see in school books.
Never link fonts from an outside CDN: it adds a third-party request and may be blocked in Iran.
