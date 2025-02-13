.PHONY: check run-all install start dev build build-lib build-app preview

.DEFAULT_GOAL := run-all

check:
	scripts/check.sh

run-all:
	make check
	make install
	make start

install:
	yarn

start:
	yarn vite

dev:
	make start

build-lib:
	yarn build:lib

build-app:
	yarn build:app

build:
	yarn build

preview:
	yarn vite preview