#!/bin/bash

PATH_DIR=`pwd`

cd ${PATH_DIR}/Ticketkeeper/
node app > /dev/null 2>&1 &
cd ${PATH_DIR}/ng11Ticketkeeper/
ng serve --port 8081 --host 0.0.0.0 > /dev/null 2>&1 &
