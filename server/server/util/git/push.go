package git

import (
	"os"

	"github.com/go-git/go-git/v5"
	. "github.com/go-git/go-git/v5/_examples"
	"github.com/go-git/go-git/v5/plumbing/transport/http"
)

func GitPush(path string, username string, password string) err {

	r, err := git.PlainOpen(path)
	CheckIfError(err)

	Info("git push")
	err = r.Push(&git.PushOptions{
		Auth: &http.BasicAuth{
			Username: username, 
			Password: password,
		},
	})
	CheckIfError(err)
	return err
}
