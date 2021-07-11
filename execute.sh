#!/bin/bash

PATH_DIR=`pwd`

cd ${PATH_DIR}/Ticketkeeper/
node app &
cd ${PATH_DIR}/ng11Ticketkeeper/
ng serve --port 8081 --host 0.0.0.0  &
