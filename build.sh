#!/bin/sh
BASEDIR=$(dirname $0);
echo "Script location: ${BASEDIR}";

cd ${BASEDIR};

echo "==============grunt install===============";
npm install;
echo "==============grunt install end===============";

echo "==============build===============";
grunt -v;
echo "==============build end===============";

echo "press \"enter\" to exit";
read junk