#!/bin/sh
BASEDIR=$(dirname $0);
echo "Script location: ${BASEDIR}";

cd ${BASEDIR};
scp -r ./build/ root@121.42.58.92:/opt/apache-tomcat-8.0.24/webapps/pttms/static/;

echo "=============================";
echo "press \"enter\" to exit";

read junk