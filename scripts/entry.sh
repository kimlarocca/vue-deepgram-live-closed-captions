#!/usr/bin/env bash

set -e
echo "---Starting Entry Script,ENV=$ENV---"
supervisord -c /etc/nginx/supervisord.conf