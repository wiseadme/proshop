#!/bin/bash

sudo adduser proshop
echo proshop | passwd proshop --stdin

sudo usermod -aG sudo proshop
su - proshop
