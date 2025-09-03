#!/bin/bash
source ~/.zshrc

export PATH=/opt/homebrew/bin:$PATH

# Start backend
cd /Documents/Escuela/Proyectos/Applications/server #Modify
npm run dev &
BACK_PID=$!

# Start frontend
cd Documents/Escuela/Proyectos/Applications/client #Modify
npm run dev &
FRONT_PID=$!

# Wait until frontend is ready
echo "Waiting for frontend to start..."
while ! nc -z localhost 5173; do   
  sleep 0.5
done

open -a "Safari" http://localhost:5173 #Launch local on browser until closed

sleep 1800  # Have process open x seconds (30 minutes)

# Terminate
kill -TERM $BACK_PID
kill -TERM $FRONT_PID
