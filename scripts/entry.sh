#!/usr/bin/env bash

set -e
echo "---Starting Entry Script,ENV=$ENV---"
echo "Current user: $(whoami)"
echo "User ID: $(id)"

# Start supervisord as nuxt user
exec supervisord -c /etc/nginx/supervisord.conf