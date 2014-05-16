Testing Javascript with KarmaJS
=========

Usage
-------------

### Instalation

Instalacja zasobów `node_modules`

	npm install

Instalacja bibliotek `bower_components`

	bower install

Questions
-------------

### Pytania ze spotkania 9.04

1. Jak otestować funckję która wykonuje operację na DOM.
odp: Zaimportować odpowiednią templatkę z kodem HTML za pomocą RequireJS do modułu testującego.

2. Wykonanie testów pod PhantomJS w środowisku Karma.js z uwzględnieniem konkretnych parametrów (np. wysokość i szerokość okna),

3. Jak testować DOM zgodnie ze strukturą w plikach HTML nie generując kodu (np. bloków HTML) dynamicznie.
odp: Podobnie jak w pytaniu 1.


### Pytania ze spotkania 17.04

1. Jak pobierać i używać biblioteki które nie są napisane w sposób modułowy (AMD),
2. Po przepisaniu np. istoreScripts.js na moduły, jak nie wywołać konfliktu po stronie wywołania i użytkownia kodu.