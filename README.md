Buffer в nodejs имеет максимальный размер 4ГиБ, но buf.indexOf работает только с буферами в 2 ГиБ. Для работы indexOf с большими буферами разработана эта функция.