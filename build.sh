#!/bin/sh
BASEDIR=$(dirname $0);
echo "Script location: ${BASEDIR}";

cd ${BASEDIR};

echo "==============bower install===============";
bower install;
echo "==============bower install end===============";

echo "==============grunt install===============";
npm install;
echo "==============grunt install end===============";

echo "==============build===============";
grunt -v;
echo "==============build end===============";

echo "press \"enter\" to exit";
read junk