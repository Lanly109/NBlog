package githubAPI

import (
	"context"

	"github.com/google/go-github/v45/github"
)

func (c *githubClient) CreateRepo() error {
	repo := &github.Repository{
		Name:    github.String(c.repoName),
		Private: github.Bool(false),
	}
	ctx := context.Background()
	// _, _, err := c.client.Repositories.Create(ctx, "", repo)
	c.client.Repositories.Create(ctx, "", repo)
	return nil
}
