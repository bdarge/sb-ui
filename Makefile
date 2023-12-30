build:
	docker build -t sb-ui --target prod --platform linux/arm64 . --no-cache
