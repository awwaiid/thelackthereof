#!/bin/bash

set +x

npm run generate && unison -batch -ui text pegasus
