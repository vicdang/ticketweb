#!/bin/bash
DB="ticket_keeper"
TABLE="tickets"
MODE=$1
FILE=$2
time=`date +%s`

if [ ${MODE} -eq 1 ];
   then
   mysql --defaults-extra-file=db.conf ${DB} < ${FILE} 
else
   mysqldump --defaults-extra-file=db.conf ${DB} > ${time}_${DB}.sql
fi
