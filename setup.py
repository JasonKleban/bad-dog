# -*- coding: utf-8 -*-

from setuptools import setup, find_packages


with open('README.rst') as f:
    readme = f.read()

with open('LICENSE') as f:
    license = f.read()

setup(
    name='Bad Dog',
    version='0.1.0',
    description='AI for keeping the dog off the couch',
    long_description=readme,
    author='Jason Kleban',
    author_email='jason.kleban@outlook.com',
    url='',
    license=license,
    packages=find_packages(exclude=('tests', 'docs'))
)

