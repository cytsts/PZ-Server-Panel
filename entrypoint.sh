#!/bin/bash

# Update/Install Project Zomboid
/home/steam/steamcmd/steamcmd.sh +force_install_dir /opt/pzserver +login anonymous +app_update 380870 validate +quit

# Start the Rust Panel in the background
cd /opt/pzpanel
./pz-server-panel &

# Start Project Zomboid Server
cd /opt/pzserver
bash start-server.sh -servername servertest
