.PHONY: check run-all install start dev build preview

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

build:
	yarn tsc && yarn vite build

preview:
	yarn vite preview