nblog_PKG := nblog-server
BIN_DIR := ./bin
BIN_NAME := nblog-server
BIN_PATH := "$(BIN_DIR)/$(BIN_NAME)"
BIN_PATH_WIN := "$(BIN_DIR)/$(BIN_NAME).exe"
MAIN_ENTRYPOINT := cmd/nblog-server/main.go

GO_VERSION := $(shell go version | cut -d ' ' -f 3)
GO_LDFLAGS += -X "$(nblog_PKG)/server.Version=$(shell git describe --tags --dirty --always)"
GO_LDFLAGS += -X "$(nblog_PKG)/server.GoVersion=$(GO_VERSION)"
GO_LDFLAGS += -X "$(nblog_PKG)/server.BuildTime=$(shell date -u '+%Y-%m-%d_%H:%M:%S%Z')"
GO_LDFLAGS += -X "$(nblog_PKG)/server.GitCommitHash=$(shell git rev-parse HEAD)"
GO_LDFLAGS += -X "$(nblog_PKG)/server.GitBranch=$(shell git rev-parse --abbrev-ref HEAD)"

build: 
	@echo "Building NBlog Server..."
	@go mod tidy
	@go build -ldflags '$(GO_LDFLAGS)' -o $(BIN_PATH) $(MAIN_ENTRYPOINT)
	@echo "NBlog Server successfully built into $(BIN_PATH)"

run: build
	./bin/nblog-server

build-mac: 
	@echo "Building NBlog Server(Ver.Mac)..."
	@go mod tidy
	@CGO_ENABLED=0 GOOS=darwin GOARCH=amd64 go build -ldflags '$(GO_LDFLAGS)' -o $(BIN_PATH) $(MAIN_ENTRYPOINT)
	@echo "NBlog Server successfully built into $(BIN_PATH)"

build-win: 
	@echo "Building NBlog Server(Ver.Win)..."
	@go mod tidy
	@CGO_ENABLED=0 GOOS=windows GOARCH=amd64 go build -ldflags '$(GO_LDFLAGS)' -o $(BIN_PATH_WIN) $(MAIN_ENTRYPOINT)
	@echo "NBlog Server successfully built into $(BIN_PATH_WIN)"