#
# My Fancy Node.js project
#

PROJECT = "TEST ENVOY"


all: install test server

test: ;@echo "Testing ${PROJECT}....."; \
	echo ""

server : ;@echo "Starting ${PROJECT}....."; \
	docker-compose up --build --force-recreate -d --scale private-hero=3; \
	yarn start

install: ;@echo "Installing ${PROJECT}....."; \
	yarn install

update: ;@echo "Updating ${PROJECT}....."; \
	git pull --rebase; \
	npm install

cert: ;@echo "Generating certs for ${PROJECT}....."; \
	cd certs; \
	./createRootCA.sh; \
	./createSelfSignedCertificate.sh

clean : ;
	docker-compose build --no-cache \


.PHONY: test server install clean update
