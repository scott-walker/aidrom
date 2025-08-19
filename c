#!/bin/sh

# if ! [ -L /usr/local/bin/c ]; then
#   echo "Устанавливаю "c" консоль в /usr/local/bin/c"
#   sudo ln -s $(pwd)/c /usr/local/bin/c
#   sudo chmod +x /usr/local/bin/c
#   . ~/.bashrc
# fi

COMMAND=$(echo $@ | sed 's/:/-/')

make $COMMAND
