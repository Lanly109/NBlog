package githubAPI

import "github.com/google/go-github/v45/github"

type githubClient struct {
    userName string
    repoName string
    init bool
    client *github.Client
    publicKey *github.PublicKey
}

func GetNewGithubClient() githubClient{
    var c githubClient
    c.init = false
    return c
}
