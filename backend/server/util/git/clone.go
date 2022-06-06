package git

import (
	"fmt"
	"os"

	git "github.com/go-git/go-git/v5"
	. "github.com/go-git/go-git/v5/_examples"
	"github.com/go-git/go-git/v5/config"
	"github.com/go-git/go-git/v5/plumbing/transport/http"
)

const (
	baseurl = "https://github.com/Lanly109/lanly109.github.io.git"
)

func GitClone(url string, directory string, username string, token string) (err error) {
	Info("git clone %s %s", baseurl, directory)

	r, err := git.PlainClone(directory, false, &git.CloneOptions{
		Auth: &http.BasicAuth{
			Username: username, // yes, this can be anything except an empty string
			Password: token,
		},
		URL:           baseurl,
		Progress:      os.Stdout,
		ReferenceName: "refs/heads/hexo",
	})
	// CheckIfError(err)

	if err != nil {
		return err
	}

	ref, err := r.Head()
	// CheckIfError(err)
	if err != nil {
		return err
	}

	commit, err := r.CommitObject(ref.Hash())
	if err != nil {
		return err
	}
	// CheckIfError(err)

	fmt.Println(commit)

	// Delete the remote
	Info("git remote rm origin")

	err = r.DeleteRemote("origin")

	if err != nil {
		return err
	}

	// Add a new remote, with the default fetch refspec
	Info("git remote add example " + url)
	_, err = r.CreateRemote(&config.RemoteConfig{
		Name: "origin",
		URLs: []string{url},
	})

	return err
}
