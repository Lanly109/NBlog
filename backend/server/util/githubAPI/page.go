package githubAPI

import (
	"context"

	"github.com/google/go-github/v45/github"
)

func (c *githubClient) CreatePage(branch string, path string) error {
	page := &github.Pages{
		Source: &github.PagesSource{
			Branch: &branch,
			Path:   &path,
		},
	}
	ctx := context.Background()
	_, _, err := c.client.Repositories.EnablePages(ctx, c.userName, c.repoName, page)
	return err
}
