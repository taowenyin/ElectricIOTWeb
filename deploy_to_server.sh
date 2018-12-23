#!/bin/sh
export SERVER_USERNAME="ubuntu"
export SERVER_PASSWORD="Root12365$"
export SERVER_IP="172.81.239.174"
export SERVER_CMD1="cd /var/www/html/dist/ElectricIOTWeb/"
export SERVER_CMD2="cp -r * /var/www/html/"
export SERVER_CMD3="sudo service tomcat restart"
export SERVER_CMD4="exit"

(
    sleep 10;
    echo $SERVER_USERNAME;
    sleep 10;
    echo $SERVER_PASSWORD;
    sleep 10;
    echo $SERVER_CMD1;
    sleep 10;
    echo $SERVER_CMD2;
    sleep 50;
    echo $SERVER_CMD3;
    sleep 20;
    echo $SERVER_CMD4;
)|telnet $SERVER_IP
