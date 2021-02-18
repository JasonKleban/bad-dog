Bad Dog
========================


sudo vi /etc/rc.local

cd /home/pi/Repos/bad-dog
su pi -c 'npm run start < /dev/null &'

su pi -c 'python ./src > /dev/null 2>&1 &'

# Update

The dog won
