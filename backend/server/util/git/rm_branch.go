package git

import (
	"github.com/go-git/go-git/v5"
	. "github.com/go-git/go-git/v5/_examples"
)

func GitRMBranch(path string) (err error) {
	r, err := git.PlainOpen(path)
	// CheckIfError(err)
	if err != nil {
		return err
	}

	Info("git branch -D main")
	err = r.Storer.RemoveReference("refs/heads/main")
	return err
}
