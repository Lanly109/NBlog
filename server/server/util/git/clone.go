package git

import (
	"fmt"
	"os"

	git "github.com/go-git/go-git/v5"
	. "github.com/go-git/go-git/v5/_examples"
	"github.com/go-git/go-git/v5/plumbing/transport/http"
)

func GitClone(url string, directory string, username string, token string) (err error) {
	Info("git clone %s %s", url, directory)

	r, err := git.PlainClone(directory, false, &git.CloneOptions{
		Auth: &http.BasicAuth{
			Username: username, // yes, this can be anything except an empty string
			Password: token,
		},
		URL:      url,
		Progress: os.Stdout,
	})
	CheckIfError(err)

	ref, err := r.Head()
	CheckIfError(err)
	if err != nil {
		return err
	}
	commit, err := r.CommitObject(ref.Hash())
	CheckIfError(err)

	fmt.Println(commit)

	return err
}
