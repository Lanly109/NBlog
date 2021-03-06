package git

import (
	"fmt"

	"github.com/go-git/go-git/v5"
	. "github.com/go-git/go-git/v5/_examples"
	"github.com/go-git/go-git/v5/plumbing/transport/http"
)

func GitPush(path string, username string, token string) (err error) {

	r, err := git.PlainOpen(path)
	// CheckIfError(err)
	if err != nil {
		return err
	}

	Info("git push")
	fmt.Println(username)
	fmt.Println(token)
	fmt.Println(path)
	err = r.Push(&git.PushOptions{
		Auth: &http.BasicAuth{
			Username: username,
			Password: token,
		},
	})
	// CheckIfError(err)
	return err
}
