package git

import (
	"fmt"
	"os"
	"time"

	"github.com/go-git/go-git/v5"
	. "github.com/go-git/go-git/v5/_examples"
	"github.com/go-git/go-git/v5/plumbing/object"
)

func GitAddCommit(directory string) (err error) {
	// CheckArgs("<directory>")
	// directory := os.Args[1]

	r, err := git.PlainOpen(directory)
	// CheckIfError(err)
	if err != nil {
		return err
	}

	w, err := r.Worktree()
	// CheckIfError(err)
	if err != nil {
		return err
	}

	Info("git add all")
	err = w.AddWithOptions(&git.AddOptions{
		All: true,
	})

	// CheckIfError(err)
	if err != nil {
		return err
	}

	Info("git status --porcelain")
	status, err := w.Status()
	// CheckIfError(err)
	if err != nil {
		return err
	}

	fmt.Println(status)

	Info("git commit -m \"all commit\"")
	commit, err := w.Commit("all commit", &git.CommitOptions{
		All: true,
		Author: &object.Signature{
			Name:  os.Getenv("USERNAME"),
			Email: os.Getenv("MAIL"),
			When:  time.Now(),
		},
	})

	// CheckIfError(err)
	if err != nil {
		return err
	}

	Info("git show -s")
	obj, err := r.CommitObject(commit)
	// CheckIfError(err)

	fmt.Println(obj)
	return err
}
