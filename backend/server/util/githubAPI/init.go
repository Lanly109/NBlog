package githubAPI

import (
	"context"

	"github.com/google/go-github/v45/github"
	"golang.org/x/oauth2"
)

func (c *githubClient) Init(userName string, repoName string, token string) error{
    c.userName = userName
    c.repoName = repoName
    ctx := context.Background()
	ts := oauth2.StaticTokenSource(
		&oauth2.Token{AccessToken: token},
	)
	tc := oauth2.NewClient(ctx, ts)
	c.client = github.NewClient(tc)


    c.init = true
    return nil
}
